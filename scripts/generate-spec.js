#!/usr/bin/env node
/**
 * generate-spec.js — Phase 10 scaffolder.
 *
 * Walks src/components/{atoms,molecules,organisms}/<Name>/<Name>.tsx and
 * for each one without an existing .spec.md, emits a scaffolded
 * <Name>.spec.md with the Props table inferred from the TypeScript
 * interface. Marks every other section with TODO comments for Claude (or
 * the developer) to fill in.
 *
 * Also writes spec-report.md at the repo root summarizing what was
 * scaffolded vs. skipped.
 *
 * Usage:
 *   node scripts/generate-spec.js          # scaffold missing specs
 *   node scripts/generate-spec.js --force  # overwrite existing specs (DANGER)
 *
 * Prop extraction is regex-based on the TS interface — robust to common
 * shapes:
 *   export interface ButtonProps { ... }
 *   export type ButtonProps = { ... }
 *   interface ButtonProps extends X { ... }
 *
 * If the .tsx doesn't define a Props interface (rare), the spec scaffold
 * still emits all sections with TODOs and a Props table containing only
 * `children`. Claude finishes it by hand.
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_ROOT = 'src/components';
const REPORT_PATH = 'spec-report.md';

function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');

  const components = findAllComponents();
  const report = { scaffolded: [], skipped: [], failed: [] };

  for (const comp of components) {
    const specPath = path.join(comp.dir, `${comp.name}.spec.md`);
    if (fs.existsSync(specPath) && !force) {
      report.skipped.push({ name: comp.name, reason: 'spec exists' });
      continue;
    }
    try {
      const tsxSource = fs.readFileSync(comp.tsxPath, 'utf8');
      const props = extractProps(comp.name, tsxSource);
      const spec = renderScaffold(comp.name, props);
      fs.writeFileSync(specPath, spec);
      report.scaffolded.push({ name: comp.name, propCount: props.length });
    } catch (err) {
      report.failed.push({ name: comp.name, error: err.message });
    }
  }

  writeReport(report);
  console.log(
    `[generate-spec] scaffolded=${report.scaffolded.length} ` +
    `skipped=${report.skipped.length} failed=${report.failed.length}`
  );
  console.log(`[generate-spec] report: ${REPORT_PATH}`);

  if (report.failed.length > 0) process.exit(1);
}

function findAllComponents() {
  const out = [];
  for (const layer of ['atoms', 'molecules', 'organisms']) {
    const layerDir = path.join(COMPONENTS_ROOT, layer);
    if (!fs.existsSync(layerDir)) continue;
    for (const name of fs.readdirSync(layerDir)) {
      const dir = path.join(layerDir, name);
      const tsxPath = path.join(dir, `${name}.tsx`);
      if (fs.existsSync(tsxPath)) out.push({ name, dir, tsxPath, layer });
    }
  }
  return out;
}

function extractProps(componentName, source) {
  // Find: `(?:export )?(?:interface|type) <Name>Props ... { <body> }`
  const interfaceRe = new RegExp(
    `(?:export\\s+)?interface\\s+${componentName}Props(?:\\s+extends\\s+[^{]+)?\\s*\\{([\\s\\S]*?)\\n\\}`,
    'm',
  );
  const typeRe = new RegExp(
    `(?:export\\s+)?type\\s+${componentName}Props\\s*=\\s*\\{([\\s\\S]*?)\\n\\}`,
    'm',
  );
  const m = source.match(interfaceRe) || source.match(typeRe);
  if (!m) return [];
  const body = m[1];
  return parseInterfaceBody(body, source);
}

function parseInterfaceBody(body, fullSource) {
  const props = [];
  const lines = body.split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')) continue;
    // name(?): type;
    const m = line.match(/^([\w$]+)(\?)?\s*:\s*(.+?);?\s*$/);
    if (!m) continue;
    const [, name, optional, type] = m;
    if (name.startsWith('_')) continue; // skip internal-only props
    props.push({
      name,
      type: normalizeType(type),
      required: !optional,
      default: extractDefault(name, fullSource),
    });
  }
  // Reorder per spec convention: children first, required, optional, handlers last.
  const handlers = props.filter(p => /^on[A-Z]/.test(p.name));
  const nonHandlers = props.filter(p => !/^on[A-Z]/.test(p.name));
  const children = nonHandlers.filter(p => p.name === 'children');
  const required = nonHandlers.filter(p => p.required && p.name !== 'children');
  const optional = nonHandlers.filter(p => !p.required && p.name !== 'children');
  return [...children, ...required, ...optional, ...handlers];
}

function normalizeType(type) {
  return type.replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
}

function extractDefault(propName, source) {
  // Look for destructure default: { propName = 'value', ... }
  const re = new RegExp(`${propName}\\s*=\\s*([^,}\\n]+)`);
  const m = source.match(re);
  if (!m) return null;
  return m[1].trim();
}

function renderScaffold(name, props) {
  const propsTable = renderPropsTable(props);
  return `# ${name}

## Description

<!-- TODO: 1-2 sentence statement of what this component is for. -->

## Props

${propsTable}

## Variants

<!-- TODO: One subsection per variant prop (string-union props). Document every option.
Example:
### variant
- \`primary\` — Brand-colored. Use for the page's primary action.
- \`secondary\` — Neutral. Use for secondary actions.
-->

## States

| State    | Description           | Visual change                  |
|----------|-----------------------|--------------------------------|
| default  | Resting               | Base styling                   |
<!-- TODO: add hover / focus / active rows as applicable, and one row per boolean prop that represents a UI state (disabled, loading, error, ...). -->

## Usage Examples

\`\`\`tsx
<!-- TODO: 2-4 examples drawn from real instance data captured in Phase 5. -->
<${name} />
\`\`\`

## Accessibility

- [ ] <!-- TODO: focusable / keyboard activation -->
- [ ] <!-- TODO: aria-* attributes the component sets -->
- [ ] <!-- TODO: focus indicator (visible focus ring) -->
- [ ] <!-- TODO: contrast guarantees -->
`;
}

function renderPropsTable(props) {
  if (props.length === 0) {
    return [
      '| Prop     | Type      | Required | Default | Description |',
      '|----------|-----------|----------|---------|-------------|',
      '| children | ReactNode | ✓        | -       | <!-- TODO --> |',
    ].join('\n');
  }
  const rows = [
    '| Prop | Type | Required | Default | Description |',
    '|------|------|----------|---------|-------------|',
  ];
  for (const p of props) {
    rows.push(
      `| ${p.name} | ${p.type} | ${p.required ? '✓' : '-'} | ${p.default || '-'} | <!-- TODO --> |`
    );
  }
  return rows.join('\n');
}

function writeReport(report) {
  const lines = [
    `# Spec Report (Phase 10)`,
    ``,
    `Generated by \`generate-spec.js\`. Each scaffolded \`.spec.md\` has TODO`,
    `placeholders that need to be filled in by reading the corresponding`,
    `\`.tsx\` and \`.stories.tsx\`. See \`references/spec-generation.md\` for`,
    `the playbook.`,
    ``,
    `## Scaffolded (${report.scaffolded.length})`,
    ``,
    ...report.scaffolded.map(r => `- ${r.name} — ${r.propCount} props inferred`),
    ``,
    `## Skipped (${report.skipped.length}) — already had a spec`,
    ``,
    ...report.skipped.map(r => `- ${r.name} (${r.reason})`),
    ``,
  ];
  if (report.failed.length > 0) {
    lines.push(`## Failed (${report.failed.length})`, ``);
    lines.push(...report.failed.map(r => `- ${r.name}: ${r.error}`));
    lines.push(``);
  }
  fs.writeFileSync(REPORT_PATH, lines.join('\n'));
}

if (require.main === module) main();

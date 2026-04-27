#!/usr/bin/env node
/**
 * spec-new.js — Scaffold a fresh <Component>.spec.md for a NEW component
 * the team adds post-bootstrap.
 *
 * Usage:
 *   node scripts/spec-new.js Card                  # default: atoms layer
 *   node scripts/spec-new.js Modal --layer organisms
 *
 * Writes src/components/<layer>/<Name>/<Name>.spec.md from the empty
 * template. Refuses to overwrite an existing spec.
 *
 * After filling in the spec, run:
 *   npm run regen:from-spec <Name>
 * to scaffold the corresponding .tsx and .stories.tsx with the
 * @spec-managed regions populated. Implement the JSX yourself in the
 * developer-owned regions (everything outside the sentinels).
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_ROOT = 'src/components';

function main() {
  const args = process.argv.slice(2);
  const name = args.find(a => !a.startsWith('--'));
  const layerIdx = args.indexOf('--layer');
  const layer = layerIdx !== -1 ? args[layerIdx + 1] : 'atoms';

  if (!name) {
    console.error('Usage: spec-new.js <ComponentName> [--layer atoms|molecules|organisms]');
    process.exit(2);
  }
  if (!['atoms', 'molecules', 'organisms'].includes(layer)) {
    console.error(`Invalid layer "${layer}". Must be atoms, molecules, or organisms.`);
    process.exit(2);
  }

  const dir = path.join(COMPONENTS_ROOT, layer, name);
  const specPath = path.join(dir, `${name}.spec.md`);

  if (fs.existsSync(specPath)) {
    console.error(`[spec-new] ${specPath} already exists. Refusing to overwrite.`);
    process.exit(1);
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(specPath, renderEmptyTemplate(name));
  console.log(`[spec-new] created ${specPath}`);
  console.log(`[spec-new] next: edit the spec, then run 'npm run regen:from-spec ${name}'`);
}

function renderEmptyTemplate(name) {
  return `# ${name}

## Description

<!-- TODO: 1-2 sentence statement of what this component is for. -->

## Props

| Prop     | Type      | Required | Default | Description |
|----------|-----------|----------|---------|-------------|
| children | ReactNode | ✓        | -       | <!-- TODO --> |

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
<${name}>…</${name}>
\`\`\`

## Accessibility

- [ ] <!-- TODO: focusable / keyboard activation -->
- [ ] <!-- TODO: aria-* attributes the component sets -->
- [ ] <!-- TODO: focus indicator -->
- [ ] <!-- TODO: contrast -->
`;
}

if (require.main === module) main();

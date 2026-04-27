#!/usr/bin/env node
/**
 * check-spec-drift.js — Verify every component's spec-managed regions match
 * what regen-from-spec would produce right now.
 *
 * Usage:
 *   node scripts/check-spec-drift.js                 # all components
 *   node scripts/check-spec-drift.js --staged        # only staged components
 *   node scripts/check-spec-drift.js --component Button
 *   node scripts/check-spec-drift.js --fix           # run regen on drifters
 *
 * Exit code:
 *   0 if everything is in sync
 *   1 if any component drifts (or fails to parse)
 *
 * The pre-commit hook runs `--staged`. CI runs no flags (full tree).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { parseSpec } = require('./spec-lib/parser');
const { findBlocks, ensureBlock } = require('./spec-lib/sentinel');
const {
  genPropsInterface,
  genArgTypes,
  genStories,
  genDocsDescription,
} = require('./spec-lib/codegen');
const { findAllComponents, resolveComponent } = require('./regen-from-spec');

const COMPONENTS_ROOT = 'src/components';

function main() {
  const args = process.argv.slice(2);
  const staged = args.includes('--staged');
  const fix = args.includes('--fix');
  const compIdx = args.indexOf('--component');
  const compName = compIdx !== -1 ? args[compIdx + 1] : null;

  let components;
  if (compName) components = [resolveComponent(compName)];
  else if (staged) components = stagedComponents();
  else components = findAllComponents();

  if (components.length === 0) {
    console.log('[spec-drift] no components to check');
    process.exit(0);
  }

  let drift = 0;
  for (const comp of components) {
    try {
      const result = checkComponent(comp);
      if (!result.inSync) {
        drift++;
        reportDrift(comp, result);
        if (fix) {
          require('./regen-from-spec').regen(comp, { dry: false });
        }
      }
    } catch (err) {
      drift++;
      console.error(`[spec-drift] ${comp.name}: ${err.message}`);
    }
  }

  if (drift > 0) {
    console.error(
      `\n[spec-drift] ${drift} component(s) out of sync.\n` +
      `Fix by running: npm run regen:from-spec <Component>  (or --fix to auto-regen)`
    );
    process.exit(1);
  }
  console.log(`[spec-drift] all ${components.length} components in sync`);
}

function stagedComponents() {
  let staged;
  try {
    staged = execSync('git diff --cached --name-only', { encoding: 'utf8' }).split('\n');
  } catch {
    return [];
  }
  const componentNames = new Set();
  for (const file of staged) {
    const m = file.match(/^src\/components\/(?:atoms|molecules|organisms)\/([^/]+)\//);
    if (m) componentNames.add(m[1]);
  }
  const all = findAllComponents();
  return all.filter(c => componentNames.has(c.name));
}

function checkComponent(comp) {
  const spec = parseSpec(comp.specPath);
  const tsxPath = path.join(comp.dir, `${comp.name}.tsx`);
  const storiesPath = path.join(comp.dir, `${comp.name}.stories.tsx`);

  const drift = [];

  if (fs.existsSync(tsxPath)) {
    const source = fs.readFileSync(tsxPath, 'utf8');
    drift.push(...compareBlock(tsxPath, source, 'props', genPropsInterface(spec)));
  }

  if (fs.existsSync(storiesPath)) {
    const source = fs.readFileSync(storiesPath, 'utf8');
    drift.push(...compareBlock(storiesPath, source, 'argTypes', genArgTypes(spec)));
    drift.push(...compareBlock(storiesPath, source, 'stories',  genStories(spec)));
    const docs = genDocsDescription(spec);
    if (docs) drift.push(...compareBlock(storiesPath, source, 'docs', docs));
  }

  return { inSync: drift.length === 0, drift };
}

function compareBlock(filePath, source, blockName, expected) {
  const blocks = findBlocks(source);
  const block = blocks.find(b => b.name === blockName);
  if (!block) {
    return [{
      filePath,
      blockName,
      reason: `missing @spec-managed block "${blockName}" — run regen:from-spec to insert it`,
    }];
  }
  const actual = block.content.split('\n').map(l => l.trim()).join('\n').trim();
  const wanted = expected.split('\n').map(l => l.trim()).join('\n').trim();
  if (actual === wanted) return [];
  return [{ filePath, blockName, expected, actual: block.content, line: block.startLine + 1 }];
}

function reportDrift(comp, result) {
  console.error(`\n[spec-drift] ${comp.name}`);
  for (const d of result.drift) {
    console.error(`  ${d.filePath}: @spec-managed:${d.blockName}${d.line ? ` (line ${d.line})` : ''}`);
    if (d.reason) {
      console.error(`    ${d.reason}`);
    } else {
      console.error('    --- expected ---');
      console.error(d.expected.split('\n').map(l => '    ' + l).join('\n'));
      console.error('    --- actual ---');
      console.error(d.actual.split('\n').map(l => '    ' + l).join('\n'));
    }
  }
}

if (require.main === module) main();
module.exports = { checkComponent, stagedComponents };

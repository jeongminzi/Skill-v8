#!/usr/bin/env node
/**
 * regen-from-spec.js — Regenerate spec-managed regions in <Component>.tsx
 * and <Component>.stories.tsx from <Component>.spec.md.
 *
 * Usage:
 *   node scripts/regen-from-spec.js Button              # one component
 *   node scripts/regen-from-spec.js --all               # every component
 *   node scripts/regen-from-spec.js Button --dry        # show diff, do not write
 *   node scripts/regen-from-spec.js Button --force-dirty # bypass clean-tree check
 *
 * Safety:
 *   - Refuses to write to a file whose directory has uncommitted changes
 *     (unless --force-dirty).
 *   - Atomic write via .tmp + rename.
 *   - Leaves all content outside @spec-managed sentinels untouched.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { parseSpec } = require('./spec-lib/parser');
const { findBlocks, ensureBlock, replaceBlock } = require('./spec-lib/sentinel');
const {
  genPropsInterface,
  genArgTypes,
  genStories,
  genDocsDescription,
} = require('./spec-lib/codegen');

const COMPONENTS_ROOT = 'src/components';

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const forceDirty = args.includes('--force-dirty');
  const all = args.includes('--all');
  const bootstrap = args.includes('--bootstrap');
  const target = args.find(a => !a.startsWith('--'));

  if (!all && !target) {
    console.error('Usage: regen-from-spec.js <Component|--all> [--dry] [--force-dirty] [--bootstrap]');
    console.error('  --bootstrap inserts @spec-managed sentinels for the first time.');
    console.error('  Without it, regen only rewrites existing sentinel blocks.');
    process.exit(2);
  }

  const components = all ? findAllComponents() : [resolveComponent(target)];
  let drift = 0;

  for (const comp of components) {
    if (!forceDirty && !dry && isDirty(comp.dir)) {
      console.error(`[regen] refusing: ${comp.dir} has uncommitted changes (use --force-dirty to override)`);
      process.exit(1);
    }
    try {
      const result = regen(comp, { dry, bootstrap });
      drift += result.changed ? 1 : 0;
    } catch (err) {
      console.error(`[regen] ${comp.name}: ${err.message}`);
      process.exit(1);
    }
  }

  if (dry) {
    console.log(`[regen] dry-run complete. ${drift} file(s) would change.`);
    process.exit(drift > 0 ? 1 : 0);
  }
}

function findAllComponents() {
  const out = [];
  for (const layer of ['atoms', 'molecules', 'organisms']) {
    const layerDir = path.join(COMPONENTS_ROOT, layer);
    if (!fs.existsSync(layerDir)) continue;
    for (const name of fs.readdirSync(layerDir)) {
      const dir = path.join(layerDir, name);
      const specPath = path.join(dir, `${name}.spec.md`);
      if (fs.existsSync(specPath)) {
        out.push({ name, dir, specPath });
      }
    }
  }
  return out;
}

function resolveComponent(name) {
  for (const layer of ['atoms', 'molecules', 'organisms']) {
    const dir = path.join(COMPONENTS_ROOT, layer, name);
    const specPath = path.join(dir, `${name}.spec.md`);
    if (fs.existsSync(specPath)) {
      return { name, dir, specPath };
    }
  }
  throw new Error(`Component "${name}" has no .spec.md under ${COMPONENTS_ROOT}/{atoms,molecules,organisms}/`);
}

function regen(comp, { dry, bootstrap }) {
  const spec = parseSpec(comp.specPath);
  const tsxPath = path.join(comp.dir, `${comp.name}.tsx`);
  const storiesPath = path.join(comp.dir, `${comp.name}.stories.tsx`);

  let changed = false;

  if (fs.existsSync(tsxPath)) {
    const before = fs.readFileSync(tsxPath, 'utf8');
    let after;
    if (hasBlock(before, 'props')) {
      after = replaceBlock(before, 'props', genPropsInterface(spec));
    } else if (bootstrap) {
      after = bootstrapPropsBlock(before, comp.name, genPropsInterface(spec));
    } else {
      throw new Error(
        `${tsxPath} has no @spec-managed:props block. ` +
        `Wrap the existing Props interface with sentinels by hand, ` +
        `or run with --bootstrap to insert them automatically.`
      );
    }
    if (after !== before) {
      changed = true;
      writeOrDiff(tsxPath, before, after, dry);
    }
  } else if (!dry) {
    console.warn(`[regen] ${comp.name}: ${tsxPath} does not exist; skipping props block`);
  }

  if (fs.existsSync(storiesPath)) {
    let source = fs.readFileSync(storiesPath, 'utf8');
    const before = source;

    source = updateOrBootstrap(source, 'argTypes', genArgTypes(spec), /component:\s*\w+/, bootstrap, storiesPath);
    source = updateOrBootstrap(source, 'stories',  genStories(spec),  /export\s+const\s+Default\s*:\s*Story/, bootstrap, storiesPath);
    const docsBlock = genDocsDescription(spec);
    if (docsBlock) {
      source = updateOrBootstrap(source, 'docs', docsBlock, /parameters:\s*{/, bootstrap, storiesPath);
    }

    if (source !== before) {
      changed = true;
      writeOrDiff(storiesPath, before, source, dry);
    }
  } else if (!dry) {
    console.warn(`[regen] ${comp.name}: ${storiesPath} does not exist; skipping argTypes/stories`);
  }

  if (!dry && changed) console.log(`[regen] ${comp.name}: updated`);
  if (!dry && !changed) console.log(`[regen] ${comp.name}: no changes`);
  return { changed };
}

function hasBlock(source, name) {
  return findBlocks(source).some(b => b.name === name);
}

function updateOrBootstrap(source, name, content, anchor, bootstrap, filePath) {
  if (hasBlock(source, name)) return replaceBlock(source, name, content);
  if (!bootstrap) {
    throw new Error(
      `${filePath} has no @spec-managed:${name} block. ` +
      `Add the sentinels manually or rerun with --bootstrap.`
    );
  }
  // Anchor missing? insert at end of file.
  if (!source.match(anchor)) {
    return source + `\n// @spec-managed:start ${name}\n${content}\n// @spec-managed:end\n`;
  }
  return ensureBlock(source, name, content, anchor);
}

/**
 * Bootstrap helper: replace an existing `(export )?interface <Name>Props { ... }`
 * with the sentinel-wrapped, regenerated version. If no such interface exists,
 * insert after the first React import.
 */
function bootstrapPropsBlock(source, componentName, newInterface) {
  const re = new RegExp(
    `((?:export\\s+)?interface\\s+${componentName}Props(?:\\s+extends\\s+[^{]+)?\\s*\\{[\\s\\S]*?\\n\\})`,
    'm',
  );
  const wrapped = `// @spec-managed:start props\n${newInterface}\n// @spec-managed:end`;
  if (re.test(source)) {
    return source.replace(re, wrapped);
  }
  return ensureBlock(source, 'props', newInterface, /^import .* from ['"]react['"]/);
}

function writeOrDiff(filePath, before, after, dry) {
  if (dry) {
    console.log(`\n--- ${filePath} (dry) ---`);
    console.log(unifiedDiff(before, after));
    return;
  }
  const tmp = `${filePath}.regen.tmp`;
  fs.writeFileSync(tmp, after);
  fs.renameSync(tmp, filePath);
}

function unifiedDiff(before, after) {
  // Tiny diff for human readability — line-level, no LCS.
  const aLines = before.split('\n');
  const bLines = after.split('\n');
  const max = Math.max(aLines.length, bLines.length);
  const out = [];
  for (let i = 0; i < max; i++) {
    if (aLines[i] !== bLines[i]) {
      if (aLines[i] !== undefined) out.push(`- ${aLines[i]}`);
      if (bLines[i] !== undefined) out.push(`+ ${bLines[i]}`);
    }
  }
  return out.slice(0, 80).join('\n');
}

function isDirty(dir) {
  try {
    const out = execSync(`git status --porcelain -- ${dir}`, { encoding: 'utf8' });
    return out.trim().length > 0;
  } catch {
    return false; // not a git repo — skip the check
  }
}

if (require.main === module) main();
module.exports = { regen, findAllComponents, resolveComponent };

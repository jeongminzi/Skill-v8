/**
 * spec-lib/parser.js — Parse a <Component>.spec.md into a structured object.
 *
 * Output shape:
 * {
 *   componentName: 'Button',
 *   description:   'Triggers an action…',
 *   props: [
 *     { name, type, required, default, description },
 *     ...
 *   ],
 *   variants: [
 *     { propName: 'variant', options: [{ value, description }, ...] },
 *     ...
 *   ],
 *   states: [
 *     { name, description, visualChange },
 *     ...
 *   ],
 *   usageExamples: '```tsx\n...\n```',  // raw markdown block
 *   accessibility: ['Focusable with Tab', ...],
 * }
 *
 * Throws on malformed spec — never tries to "best effort" parse.
 */

const fs = require('fs');

function parseSpec(specPath) {
  const raw = fs.readFileSync(specPath, 'utf8');
  const lines = raw.split('\n');

  const sections = splitSections(lines);
  const componentName = extractComponentName(sections.header);

  return {
    componentName,
    description:   parseDescription(sections.Description || ''),
    props:         parseProps(sections.Props || ''),
    variants:      parseVariants(sections.Variants || ''),
    states:        parseStates(sections.States || ''),
    usageExamples: parseUsageExamples(sections['Usage Examples'] || ''),
    accessibility: parseAccessibility(sections.Accessibility || ''),
  };
}

function splitSections(lines) {
  const result = { header: '' };
  let current = 'header';
  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      current = m[1].trim();
      result[current] = '';
      continue;
    }
    result[current] += line + '\n';
  }
  return result;
}

function extractComponentName(headerBlock) {
  const m = headerBlock.match(/^#\s+(\w+)/m);
  if (!m) throw new Error('Spec missing top-level `# ComponentName` heading');
  return m[1];
}

function parseDescription(block) {
  return block
    .split('\n')
    .filter(l => l.trim() && !l.trim().startsWith('<!--'))
    .join(' ')
    .trim();
}

function parseProps(block) {
  const rows = [];
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
  let inTable = false;
  for (const line of lines) {
    if (line.startsWith('|---') || line.match(/^\|\s*-+/)) { inTable = true; continue; }
    if (!line.startsWith('|')) { inTable = false; continue; }
    if (!inTable) continue;
    const cells = splitTableRow(line);
    if (cells.length < 5) continue;
    const [name, type, required, dflt, ...descCells] = cells;
    rows.push({
      name,
      type:        type.replace(/\\\|/g, '|'),
      required:    required === '✓' || required === 'X' || required.toLowerCase() === 'yes',
      default:     dflt === '-' ? null : dflt,
      description: descCells.join('|').trim(),
    });
  }
  return rows;
}

function parseVariants(block) {
  const variants = [];
  let current = null;
  for (const line of block.split('\n')) {
    const heading = line.match(/^###\s+(\w+)/);
    if (heading) {
      if (current) variants.push(current);
      current = { propName: heading[1], options: [] };
      continue;
    }
    const opt = line.match(/^-\s+`(.+?)`\s*[—:-]\s*(.+)/);
    if (opt && current) current.options.push({ value: opt[1], description: opt[2].trim() });
  }
  if (current) variants.push(current);
  return variants;
}

function parseStates(block) {
  const states = [];
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
  let inTable = false;
  for (const line of lines) {
    if (line.startsWith('|---') || line.match(/^\|\s*-+/)) { inTable = true; continue; }
    if (!line.startsWith('|')) { inTable = false; continue; }
    if (!inTable) continue;
    const cells = splitTableRow(line);
    if (cells.length < 3) continue;
    const [name, description, visualChange] = cells;
    states.push({ name, description, visualChange });
  }
  return states;
}

function parseUsageExamples(block) {
  const m = block.match(/```tsx\n([\s\S]*?)```/);
  return m ? m[1].trim() : '';
}

/**
 * Split a markdown table row on `|` while honoring `\|` as an escaped pipe.
 * Returns the cells trimmed, with leading/trailing empty cells removed.
 */
function splitTableRow(line) {
  const cells = [];
  let buf = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '\\' && line[i + 1] === '|') { buf += '\\|'; i++; continue; }
    if (ch === '|') { cells.push(buf.trim()); buf = ''; continue; }
    buf += ch;
  }
  cells.push(buf.trim());
  // Strip the leading + trailing empty cells caused by `| ... |` boundaries.
  if (cells[0] === '') cells.shift();
  if (cells[cells.length - 1] === '') cells.pop();
  return cells;
}

function parseAccessibility(block) {
  const items = [];
  for (const line of block.split('\n')) {
    const m = line.match(/^-\s+\[[ x]\]\s+(.+)/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

module.exports = { parseSpec };

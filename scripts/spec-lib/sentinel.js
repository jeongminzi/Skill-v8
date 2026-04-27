/**
 * spec-lib/sentinel.js — Find and replace @spec-managed sentinel blocks.
 *
 * Sentinel grammar (line-based, comment-leader agnostic):
 *   // @spec-managed:start <name>
 *   ...content...
 *   // @spec-managed:end
 *
 * Multiple named blocks per file are allowed. Each name appears once.
 *
 * Operations:
 *   findBlocks(source)         → [{ name, startLine, endLine, indent, content }]
 *   replaceBlock(source, name, newContent) → source with block <name> rewritten
 *   ensureBlock(source, name, newContent, anchor) → insert if missing, replace otherwise
 *
 * Outside-sentinel content is preserved byte-for-byte.
 */

const START_RE = /^(\s*)\/\/\s*@spec-managed:start\s+([\w-]+)\s*$/;
const END_RE   = /^(\s*)\/\/\s*@spec-managed:end\s*$/;

function findBlocks(source) {
  const lines = source.split('\n');
  const blocks = [];
  let open = null;
  for (let i = 0; i < lines.length; i++) {
    const startM = lines[i].match(START_RE);
    if (startM) {
      if (open) {
        throw new Error(
          `Nested @spec-managed:start at line ${i + 1} (previous unclosed at line ${open.startLine + 1})`
        );
      }
      open = { name: startM[2], indent: startM[1], startLine: i, contentLines: [] };
      continue;
    }
    const endM = lines[i].match(END_RE);
    if (endM) {
      if (!open) {
        throw new Error(`@spec-managed:end at line ${i + 1} without matching :start`);
      }
      blocks.push({ ...open, endLine: i, content: open.contentLines.join('\n') });
      open = null;
      continue;
    }
    if (open) open.contentLines.push(lines[i]);
  }
  if (open) {
    throw new Error(`Unclosed @spec-managed:start "${open.name}" at line ${open.startLine + 1}`);
  }
  return blocks;
}

function replaceBlock(source, name, newContent) {
  const blocks = findBlocks(source);
  const target = blocks.find(b => b.name === name);
  if (!target) {
    throw new Error(`No @spec-managed block named "${name}" in source`);
  }
  const lines = source.split('\n');
  const before = lines.slice(0, target.startLine + 1);  // include start sentinel
  const after  = lines.slice(target.endLine);            // include end sentinel
  const indented = newContent
    .split('\n')
    .map(l => (l ? target.indent + l : l))
    .join('\n');
  return [...before, indented, ...after].join('\n');
}

/**
 * If block <name> exists, replace it. Otherwise insert it after `anchorRegex`.
 * `anchorRegex` is a regex matched against each line; the new block is inserted
 * immediately after the first matching line.
 */
function ensureBlock(source, name, newContent, anchorRegex) {
  const blocks = findBlocks(source);
  if (blocks.find(b => b.name === name)) {
    return replaceBlock(source, name, newContent);
  }
  const lines = source.split('\n');
  const idx = lines.findIndex(l => anchorRegex.test(l));
  if (idx === -1) {
    throw new Error(
      `Cannot insert @spec-managed:${name} — anchor ${anchorRegex} not found in source`
    );
  }
  // Detect indent from the anchor line.
  const indentMatch = lines[idx].match(/^(\s*)/);
  const indent = indentMatch ? indentMatch[1] : '';
  const block = [
    `${indent}// @spec-managed:start ${name}`,
    ...newContent.split('\n').map(l => (l ? indent + l : l)),
    `${indent}// @spec-managed:end`,
  ].join('\n');
  return [...lines.slice(0, idx + 1), block, ...lines.slice(idx + 1)].join('\n');
}

module.exports = { findBlocks, replaceBlock, ensureBlock };

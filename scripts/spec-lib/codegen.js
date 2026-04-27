/**
 * spec-lib/codegen.js — Generate code blocks from a parsed spec.
 *
 * Three generators, one per @spec-managed region:
 *   genPropsInterface(spec)  → string for // @spec-managed:start props
 *   genArgTypes(spec)        → string for // @spec-managed:start argTypes
 *   genStories(spec)         → string for // @spec-managed:start stories
 *   genDocsDescription(spec) → string for // @spec-managed:start docs (optional)
 *
 * Output is plain string; the sentinel module handles indentation.
 */

function genPropsInterface(spec) {
  const lines = [`export interface ${spec.componentName}Props {`];
  for (const p of spec.props) {
    const optional = p.required ? '' : '?';
    const type = mapTypeToTS(p.type);
    lines.push(`  ${p.name}${optional}: ${type};`);
  }
  lines.push('}');
  return lines.join('\n');
}

function genArgTypes(spec) {
  const lines = ['argTypes: {'];
  for (const p of spec.props) {
    lines.push(`  ${p.name}: ${argTypeFor(p)},`);
  }
  lines.push('},');
  return lines.join('\n');
}

function genStories(spec) {
  const lines = [];

  // One story per Variant option.
  for (const variant of spec.variants) {
    for (const opt of variant.options) {
      const storyName = pascalCase(opt.value);
      lines.push(
        `export const ${storyName}: Story = { args: { ...Default.args, ${variant.propName}: ${literalFor(opt.value)} } };`
      );
    }
  }

  // One story per State that maps to a boolean prop.
  const propByName = new Map(spec.props.map(p => [p.name, p]));
  for (const state of spec.states) {
    if (['default', 'hover', 'focus', 'active'].includes(state.name)) continue;
    const prop = propByName.get(state.name);
    if (!prop || mapTypeToTS(prop.type) !== 'boolean') continue;
    const storyName = pascalCase(state.name);
    lines.push(
      `export const ${storyName}: Story = { args: { ...Default.args, ${state.name}: true } };`
    );
  }

  return lines.join('\n');
}

function genDocsDescription(spec) {
  if (!spec.usageExamples) return '';
  const escaped = spec.usageExamples.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  return [
    'docs: {',
    '  description: {',
    '    component: `',
    '```tsx',
    escaped,
    '```',
    '    `,',
    '  },',
    '},',
  ].join('\n');
}

// --- helpers ---

function mapTypeToTS(rawType) {
  // The Props table type is already valid TS — just normalize.
  return rawType
    .replace(/\\\|/g, '|')
    .replace(/\s+/g, ' ')
    .trim();
}

function argTypeFor(p) {
  const type = mapTypeToTS(p.type);
  if (/^\(.*\)\s*=>/.test(type)) {
    // Function — Storybook action.
    return `{ action: '${actionNameFor(p.name)}' }`;
  }
  if (type === 'boolean') return `{ control: 'boolean' }`;
  if (type === 'number')  return `{ control: 'number' }`;
  if (type === 'string')  return `{ control: 'text' }`;
  if (type === 'Date')    return `{ control: 'date' }`;
  if (type === 'ReactNode' || type === 'React.ReactNode') {
    return `{ control: 'text' }`;
  }
  // Union of string literals?
  const unionMembers = parseStringUnion(type);
  if (unionMembers) {
    const control = unionMembers.length <= 3 ? 'radio' : 'select';
    const opts = unionMembers.map(m => `'${m}'`).join(', ');
    return `{ control: '${control}', options: [${opts}] }`;
  }
  return `{ control: 'object' }`;
}

function parseStringUnion(type) {
  // Match types like: 'a' | 'b' | 'c'
  const parts = type.split('|').map(s => s.trim());
  const members = [];
  for (const part of parts) {
    const m = part.match(/^['"](.+?)['"]$/);
    if (!m) return null;
    members.push(m[1]);
  }
  return members.length >= 2 ? members : null;
}

function actionNameFor(propName) {
  // onClick → 'clicked', onChange → 'changed', onSubmit → 'submitted'
  const m = propName.match(/^on([A-Z]\w+)$/);
  if (!m) return propName;
  const verb = m[1].toLowerCase();
  if (verb.endsWith('e')) return verb + 'd';
  return verb + 'ed';
}

function pascalCase(s) {
  return s
    .split(/[-_\s]/)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join('')
    .replace(/^(\d)/, '_$1'); // can't start with a digit
}

function literalFor(value) {
  // Variant options are usually string literals.
  if (/^[a-zA-Z]/.test(value)) return `'${value}'`;
  return value;
}

module.exports = { genPropsInterface, genArgTypes, genStories, genDocsDescription };

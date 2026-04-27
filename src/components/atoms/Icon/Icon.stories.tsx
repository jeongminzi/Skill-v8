import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon, ICON_NAMES } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  // @spec-managed:start argTypes
  argTypes: {
    name: { control: 'text' },
    size: { control: 'object' },
    strokeWidth: { control: 'number' },
    filled: { control: 'boolean' },
    className: { control: 'text' },
  },
  // @spec-managed:end
  args: { name: 'heart', size: 24, strokeWidth: 1.75, filled: false },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

export const Size16: Story = { args: { ...Default.args, size: 16 } };
export const Size32: Story = { args: { ...Default.args, size: 32 } };
export const Emphasis: Story = { args: { ...Default.args, strokeWidth: 2.25 } };

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-3 text-center text-[11px] text-[var(--color-text-muted)]">
      {ICON_NAMES.map((n) => (
        <div key={n} className="flex flex-col items-center gap-1.5 rounded-md border border-[var(--color-border-subtle)] p-3">
          <Icon name={n} />
          <span className="truncate w-full">{n}</span>
        </div>
      ))}
    </div>
  ),
};

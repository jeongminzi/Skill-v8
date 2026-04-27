import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  // @spec-managed:start argTypes
  argTypes: {
    name: { control: 'text' },
    size: { control: 'object' },
    filled: { control: 'boolean' },
    className: { control: 'text' },
  },
  // @spec-managed:end
  args: { name: 'favorite', size: 24, filled: false },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-3 text-center text-xs text-[var(--color-text-muted)]">
      {[
        'home', 'search', 'event', 'person', 'notifications', 'arrow_back',
        'close', 'star', 'favorite', 'edit', 'delete', 'check_circle',
        'add', 'tune', 'storefront', 'photo_camera', 'chat', 'settings',
      ].map((n) => (
        <div key={n} className="flex flex-col items-center gap-1 rounded-md border border-[var(--color-border-subtle)] p-3">
          <Icon name={n} />
          <span>{n}</span>
        </div>
      ))}
    </div>
  ),
};

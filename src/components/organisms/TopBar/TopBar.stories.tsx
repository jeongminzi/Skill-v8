import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Organisms/TopBar',
  component: TopBar,
  // @spec-managed:start argTypes
  argTypes: {
    title: { control: 'text' },
    align: { control: 'radio', options: ['left', 'center'] },
    onBack: { action: 'backed' },
    notifications: { control: 'object' },
    trailing: { control: 'text' },
  },
  // @spec-managed:end
  decorators: [(S) => <div style={{ width: 390, background: 'var(--color-bg-surface)', borderRadius: 28, overflow: 'hidden' }}><S /></div>],
};
export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = { args: { title: '포토팟', notifications: { count: 3 } } };

// @spec-managed:start stories

// @spec-managed:end

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  // @spec-managed:start argTypes
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    weight: { control: 'radio', options: ['subtle', 'default', 'strong'] },
    inset: { control: 'boolean' },
    className: { control: 'text' },
  },
  // @spec-managed:end
  args: { orientation: 'horizontal', weight: 'subtle' },
  decorators: [(S) => <div style={{ width: 320 }}><S /></div>],
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

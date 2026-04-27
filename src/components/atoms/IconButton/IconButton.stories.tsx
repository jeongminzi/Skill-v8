import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  // @spec-managed:start argTypes
  argTypes: {
    icon: { control: 'text' },
    ariaLabel: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['plain', 'soft', 'solid'] },
    tone: { control: 'radio', options: ['neutral', 'brand', 'danger'] },
    disabled: { control: 'boolean' },
    badgeDot: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  // @spec-managed:end
  args: { icon: 'notifications', ariaLabel: '알림', size: 'md', variant: 'plain', tone: 'neutral' },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  // @spec-managed:start argTypes
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    block: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    type: { control: 'radio', options: ['button', 'submit', 'reset'] },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  // @spec-managed:end
  args: { children: '예약하기', variant: 'primary', size: 'md' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: { leadingIcon: 'storefront', trailingIcon: 'forward', children: '예약 가능 시간 보기' },
};

export const Block: Story = {
  args: { block: true, children: '결제하기 ₩120,000' },
  render: (args) => (
    <div style={{ width: 320 }}><Button {...args} /></div>
  ),
};

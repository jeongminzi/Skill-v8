import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  // @spec-managed:start argTypes
  argTypes: {
    initialValue: { control: 'text' },
    placeholder: { control: 'text' },
    showSubmit: { control: 'boolean' },
    onSubmit: { action: 'submited' },
    onChange: { action: 'changed' },
  },
  // @spec-managed:end
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Atoms/StarRating',
  component: StarRating,
  // @spec-managed:start argTypes
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    size: { control: 'object' },
    readOnly: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  // @spec-managed:end
  args: { value: 4, max: 5, size: 24, readOnly: false },
};
export default meta;

type Story = StoryObj<typeof StarRating>;

const Interactive = (args: Parameters<typeof StarRating>[0]) => {
  const [v, setV] = useState(args.value);
  return <StarRating {...args} value={v} onChange={setV} />;
};

export const Default: Story = { render: (a) => <Interactive {...a} /> };

// @spec-managed:start stories

// @spec-managed:end

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { FilterChipRow } from './FilterChipRow';

const meta: Meta<typeof FilterChipRow> = {
  title: 'Molecules/FilterChipRow',
  component: FilterChipRow,
  // @spec-managed:start argTypes
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
  // @spec-managed:end
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
};
export default meta;

type Story = StoryObj<typeof FilterChipRow>;

const Wrapper = (args: Parameters<typeof FilterChipRow>[0]) => {
  const [v, setV] = useState(args.value);
  return <FilterChipRow {...args} value={v} onChange={setV} />;
};

export const Default: Story = {
  args: {
    options: [
      { value: 'upcoming', label: '예정', count: 3 },
      { value: 'done',     label: '완료', count: 12 },
      { value: 'cancel',   label: '취소' },
    ],
    value: 'upcoming',
  },
  render: (a) => <Wrapper {...a} />,
};

// @spec-managed:start stories

// @spec-managed:end

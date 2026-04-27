import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { BottomTabBar } from './BottomTabBar';

const meta: Meta<typeof BottomTabBar> = {
  title: 'Molecules/BottomTabBar',
  component: BottomTabBar,
  // @spec-managed:start argTypes
  argTypes: {
    items: { control: 'object' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
  // @spec-managed:end
  decorators: [(S) => <div style={{ position: 'relative', width: 360, height: 96, background: 'var(--color-bg-app)' }}><S /></div>],
};
export default meta;

type Story = StoryObj<typeof BottomTabBar>;

const Wrapper = (args: Parameters<typeof BottomTabBar>[0]) => {
  const [v, setV] = useState(args.value);
  return <BottomTabBar {...args} value={v} onChange={setV} />;
};

export const Default: Story = {
  args: {
    items: [
      { value: 'home', label: '홈', icon: 'home' },
      { value: 'browse', label: '탐색', icon: 'travel_explore' },
      { value: 'booking', label: '예약', icon: 'event', badgeCount: 2 },
      { value: 'my', label: 'MY', icon: 'person' },
    ],
    value: 'home',
  },
  render: (a) => <Wrapper {...a} />,
};

// @spec-managed:start stories

// @spec-managed:end

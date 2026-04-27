import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AdCard } from './AdCard';

const meta: Meta<typeof AdCard> = {
  title: 'Molecules/AdCard',
  component: AdCard,
  // @spec-managed:start argTypes
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    gradient: { control: 'select', options: ['rose', 'peach', 'mint', 'sky'] },
    onClick: { action: 'clicked' },
  },
  // @spec-managed:end
  args: { title: '신규 입점 스튜디오 첫 예약 30% 할인', subtitle: '4월 30일까지', gradient: 'rose' },
  decorators: [(S) => <div style={{ width: 340 }}><S /></div>],
};
export default meta;

type Story = StoryObj<typeof AdCard>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

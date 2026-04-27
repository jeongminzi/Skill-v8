import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  // @spec-managed:start argTypes
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info', 'hot', 'best', 'ad'] },
    size: { control: 'radio', options: ['sm', 'md'] },
    shape: { control: 'radio', options: ['pill', 'square'] },
    outline: { control: 'boolean' },
    children: { control: 'text' },
  },
  // @spec-managed:end
  args: { children: 'NEW', tone: 'brand', size: 'sm', shape: 'pill' },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

export const Gallery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="hot" shape="square">HOT</Badge>
      <Badge tone="best" shape="square">BEST</Badge>
      <Badge tone="ad" shape="square">AD</Badge>
      <Badge tone="success">예약 완료</Badge>
      <Badge tone="warning">정산 대기</Badge>
      <Badge tone="danger">취소됨</Badge>
      <Badge tone="info">정책 검토</Badge>
      <Badge tone="brand" outline>키워드</Badge>
      <Badge tone="neutral">신규</Badge>
    </div>
  ),
};

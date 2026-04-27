import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryCircle } from './CategoryCircle';

const meta: Meta<typeof CategoryCircle> = {
  title: 'Atoms/CategoryCircle',
  component: CategoryCircle,
  // @spec-managed:start argTypes
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    active: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
  },
  // @spec-managed:end
  args: { label: '인물', icon: 'person', active: false, size: 'md' },
};
export default meta;

type Story = StoryObj<typeof CategoryCircle>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      {[
        { label: '인물', icon: 'person', active: true },
        { label: '제품', icon: 'inventory_2' },
        { label: '브랜드', icon: 'storefront' },
        { label: '음식', icon: 'restaurant' },
        { label: '뷰티', icon: 'face' },
        { label: '패션', icon: 'checkroom' },
        { label: '반려', icon: 'pets' },
        { label: '웨딩', icon: 'favorite' },
      ].map((c) => (
        <CategoryCircle key={c.label} {...c} />
      ))}
    </div>
  ),
};

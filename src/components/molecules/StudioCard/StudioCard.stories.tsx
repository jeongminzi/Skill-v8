import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StudioCard } from './StudioCard';

const meta: Meta<typeof StudioCard> = {
  title: 'Molecules/StudioCard',
  component: StudioCard,
  // @spec-managed:start argTypes
  argTypes: {
    name: { control: 'text' },
    area: { control: 'text' },
    image: { control: 'text' },
    rating: { control: 'number' },
    reviewCount: { control: 'number' },
    pricePerHour: { control: 'number' },
    hot: { control: 'boolean' },
    ad: { control: 'boolean' },
    tags: { control: 'object' },
    layout: { control: 'radio', options: ['grid', 'carousel'] },
    onClick: { action: 'clicked' },
  },
  // @spec-managed:end
  args: {
    name: '스튜디오 라이트하우스',
    area: '서울 강남구',
    rating: 4.8,
    reviewCount: 142,
    pricePerHour: 45000,
    tags: ['인물', '제품', '자연광'],
    hot: false,
    ad: false,
    layout: 'carousel',
  },
};
export default meta;

type Story = StoryObj<typeof StudioCard>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

export const HorizontalRow: Story = {
  render: (args) => (
    <div className="no-scrollbar flex gap-3 overflow-x-auto" style={{ width: 360 }}>
      <StudioCard {...args} hot />
      <StudioCard {...args} name="포토팩토리 성수" area="서울 성동구" rating={4.6} reviewCount={98} pricePerHour={38000} />
      <StudioCard {...args} ad name="미러볼 스튜디오" area="서울 마포구" rating={4.9} reviewCount={210} pricePerHour={52000} />
    </div>
  ),
};

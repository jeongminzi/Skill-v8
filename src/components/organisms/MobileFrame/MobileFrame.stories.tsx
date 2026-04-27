import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { MobileFrame } from './MobileFrame';
import { TopBar } from '../TopBar/TopBar';
import { BottomTabBar } from '../../molecules/BottomTabBar/BottomTabBar';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';
import { CategoryCircle } from '../../atoms/CategoryCircle/CategoryCircle';
import { StudioCard } from '../../molecules/StudioCard/StudioCard';
import { AdCard } from '../../molecules/AdCard/AdCard';

const meta: Meta<typeof MobileFrame> = {
  title: 'Organisms/MobileFrame',
  component: MobileFrame,
  // @spec-managed:start argTypes
  argTypes: {
    width: { control: 'object' },
    height: { control: 'number' },
    background: { control: 'text' },
    header: { control: 'text' },
    footer: { control: 'text' },
    children: { control: 'text' },
  },
  // @spec-managed:end
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof MobileFrame>;

export const Empty: Story = {
  args: { width: 390, height: 780, children: <div className="p-6 text-sm text-[var(--color-text-muted)]">내용 영역</div> },
};

// @spec-managed:start stories

// @spec-managed:end

export const ConsumerHome: Story = {
  render: () => {
    const [tab, setTab] = useState('home');
    return (
      <MobileFrame
        width={390}
        height={780}
        header={<TopBar title="포토팟" notifications={{ count: 3 }} />}
        footer={
          <BottomTabBar
            value={tab}
            onChange={setTab}
            items={[
              { value: 'home', label: '홈', icon: 'home' },
              { value: 'browse', label: '탐색', icon: 'travel_explore' },
              { value: 'booking', label: '예약', icon: 'event', badgeCount: 2 },
              { value: 'my', label: 'MY', icon: 'person' },
            ]}
          />
        }
      >
        <div className="space-y-5 px-4 py-3">
          <SearchBar />
          <div className="space-y-2">
            <AdCard title="신규 입점 첫 예약 30% 할인" subtitle="4월 30일까지" gradient="rose" />
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold text-[var(--color-text-strong)]">카테고리</h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: '인물', icon: 'person', active: true },
                { label: '제품', icon: 'inventory_2' },
                { label: '브랜드', icon: 'storefront' },
                { label: '음식', icon: 'restaurant' },
              ].map((c) => (
                <CategoryCircle key={c.label} {...c} onClick={() => {}} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold text-[var(--color-text-strong)]">인기 스튜디오</h2>
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
              <StudioCard hot name="라이트하우스" area="강남구" rating={4.8} reviewCount={142} pricePerHour={45000} />
              <StudioCard name="포토팩토리 성수" area="성동구" rating={4.6} reviewCount={98} pricePerHour={38000} />
              <StudioCard ad name="미러볼" area="마포구" rating={4.9} reviewCount={210} pricePerHour={52000} />
            </div>
          </div>
        </div>
      </MobileFrame>
    );
  },
};

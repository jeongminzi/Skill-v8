import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ListItem } from './ListItem';
import { Badge } from '../../atoms/Badge/Badge';
import { Icon } from '../../atoms/Icon/Icon';

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  // @spec-managed:start argTypes
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    meta: { control: 'text' },
    leading: { control: 'text' },
    trailing: { control: 'text' },
    showChevron: { control: 'boolean' },
    divider: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  // @spec-managed:end
  args: { title: '4월 28일 14:00 예약', subtitle: '스튜디오 라이트하우스', meta: '확정', showChevron: true },
  decorators: [(S) => <div style={{ width: 360, background: 'var(--color-bg-surface)', borderRadius: 12 }}><S /></div>],
};
export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {};

// @spec-managed:start stories

// @spec-managed:end

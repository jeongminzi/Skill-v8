import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Atoms/TextField',
  component: TextField,
  // @spec-managed:start argTypes
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    shape: { control: 'radio', options: ['rounded', 'pill'] },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    onTrailingClick: { action: 'trailingclicked' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'search', 'tel', 'email', 'password', 'number'] },
    ariaLabel: { control: 'text' },
  },
  // @spec-managed:end
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof TextField>;

const Wrapper = (args: Parameters<typeof TextField>[0]) => {
  const [v, setV] = useState(args.value ?? '');
  return <TextField {...args} value={v} onChange={setV} />;
};

export const Default: Story = {
  args: { placeholder: '스튜디오 이름을 검색하세요' },
  render: (args) => <Wrapper {...args} />,
};

// @spec-managed:start stories

// @spec-managed:end

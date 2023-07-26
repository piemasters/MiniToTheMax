import type { Meta, StoryObj } from '@storybook/react';

import { Badges } from './Badges';

const meta: Meta<typeof Badges> = {
  component: Badges,
};

export default meta;
type Story = StoryObj<typeof Badges>;

export const Primary: Story = {
  render: () => <Badges />,
};

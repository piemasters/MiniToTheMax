import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeNames } from '../Badges';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    type: {
      name: 'type',
      description: 'The badge type to display',
      defaultValue: BadgeNames.showcase,
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    type: BadgeNames.showcase,
  },
};

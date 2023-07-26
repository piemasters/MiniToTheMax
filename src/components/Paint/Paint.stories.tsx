import type { Meta, StoryObj } from '@storybook/react';

import { Paint } from './Paint';
import { baseRetributorArmour } from '../../data/paints/base';

const meta: Meta<typeof Paint> = {
  component: Paint,
  argTypes: {
    paint: {
      paint: 'paint',
      description: 'The paint color and other properties',
      defaultValue: baseRetributorArmour,
      control: { type: 'object' },
    },
    size: {
      name: 'size',
      description: 'The size of the paint in px',
      defaultValue: 60,
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Paint>;

export const Primary: Story = {
  args: {
    paint: baseRetributorArmour,
    size: 60,
  },
};

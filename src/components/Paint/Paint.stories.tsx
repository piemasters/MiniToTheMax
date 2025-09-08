import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Paint } from './Paint';
import { gameColorSkin } from '../../data/paints/vallejo/game';
import { baseRetributorArmour } from '../../data/paints/citadel/base';

const meta: Meta<typeof Paint> = {
  component: Paint,
  argTypes: {
    paint: {
      paint: 'paint',
      description: 'The paint color and other properties',
      defaultValue: gameColorSkin,
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Paint>;

export const Citadel: Story = {
  args: {
    paint: baseRetributorArmour,
  },
};

export const Vallejo: Story = {
  args: {
    paint: gameColorSkin,
  },
};

export const All: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Paint paint={baseRetributorArmour} />
        <Paint paint={gameColorSkin} />
      </div>
    );
  },
};

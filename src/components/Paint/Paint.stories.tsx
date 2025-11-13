import type { Meta, StoryObj } from '@storybook/react-vite';
import { gameColorPolishedGold } from '../../data/paints/vallejo/game';
import { baseRetributorArmour } from '../../data/paints/citadel/base';
import { Paint } from './Paint';

const meta: Meta<typeof Paint> = {
  component: Paint,
  argTypes: {
    paint: {
      paint: 'paint',
      description: 'The paint color and other properties',
      defaultValue: gameColorPolishedGold,
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
    paint: gameColorPolishedGold,
  },
};

export const All: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Paint paint={baseRetributorArmour} />
        <Paint paint={gameColorPolishedGold} />
      </div>
    );
  },
};

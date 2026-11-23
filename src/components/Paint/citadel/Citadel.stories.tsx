import type { Meta, StoryObj } from '@storybook/react-vite';

import { Paint } from '../Paint';
import {
  CitadelPaintCategories,
  CitadelTechnicalPaintImageNames,
  PaintAvailabilities,
  PaintColors,
  PaintDetailsCitadel,
  PaintTypes,
} from '../../../types';

const meta: Meta<PaintDetailsCitadel> = {
  render: (args) => <Paint paint={args} />,
  argTypes: {
    name: {
      description: 'The name of the paint color',
    },
    type: {
      description: 'The type of the paint',
      control: 'check',
      options: [...PaintTypes],
    },
    color: {
      description: 'The color of the paint',
      control: 'radio',
      options: [...PaintColors],
    },
    hex: {
      description: 'The hex code of the paint color',
      control: 'color',
    },
    gradient: {
      description: 'The gradient of the paint color',
      control: 'object',
    },
    availability: {
      description: 'The availability status of the paint',
      control: 'radio',
      options: [...PaintAvailabilities],
    },
    company: {
      description: 'The company that produces the paint',
      control: 'radio',
      options: ['Citadel'],
    },
    category: {
      description: 'The category of the paint',
      control: 'radio',
      options: [...CitadelPaintCategories],
    },
    stroke: {
      description: 'Outline colour, for paints that would vanish on white',
      control: 'color',
    },
    gloss: {
      description: 'Whether the paint has a gloss effect',
      control: 'boolean',
    },
    img: {
      description: 'The image name of the paint',
      control: 'radio',
      options: [undefined, ...CitadelTechnicalPaintImageNames],
    },
  },
};

export const Default: Story = {
  args: {
    name: 'Averland Sunset',
    category: 'Citadel Base',
    type: ['core'],
    color: 'yellow',
    hex: '#FBB81C',
    gradient: [
      { offset: 0, color: 'rgb(252, 235, 211)' },
      { offset: 50, color: 'rgb(191, 117, 63)' },
      { offset: 100, color: 'rgb(61, 7, 0)' },
    ],
    stroke: '#000000',
    availability: 'available',
    company: 'Citadel',
    gloss: false,
    img: undefined,
  },
};

export default meta;
type Story = StoryObj<PaintDetailsCitadel>;

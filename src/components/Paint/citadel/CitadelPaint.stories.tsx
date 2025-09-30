import type { Meta, StoryObj } from '@storybook/react-vite';

import { CitadelPaint } from './CitadelPaint';
import { PaintDetailsCitadel, PaintType } from '../../../types';

const meta: Meta<PaintDetailsCitadel> = {
  component: CitadelPaint,
  argTypes: {
    name: {
      description: 'The name of the paint color',
    },
    type: {
      description: 'The type of the paint',
      control: 'check',
      options: [
        'air',
        'core',
        'dry',
        'fluorescent',
        'ink',
        'metallic',
        'one-coat',
        'spray',
        'technical',
      ] as PaintType[],
    },
    color: {
      description: 'The color of the paint',
      control: 'radio',
      options: [
        'black',
        'blue',
        'bone',
        'brass',
        'bronze',
        'brown',
        'clear',
        'copper',
        'flesh',
        'gold',
        'green',
        'grey',
        'orange',
        'pink',
        'purple',
        'red',
        'silver',
        'turquoise',
        'white',
        'yellow',
      ],
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
      options: ['available', 'discontinued'],
    },
    company: {
      description: 'The company that produces the paint',
      control: 'radio',
      options: ['Citadel'],
    },
    category: {
      description: 'The category of the paint',
      control: 'radio',
      options: [
        'Citadel Air',
        'Citadel Base',
        'Citadel Contrast',
        'Citadel Dry',
        'Citadel Layer',
        'Citadel Shade',
        'Citadel Spray',
        'Citadel Technical',
      ],
    },
    stroke: {
      description: 'The hex code of the paint color',
      control: 'color',
    },
    gloss: {
      description: 'Whether the paint has a gloss effect',
      control: 'boolean',
    },
    img: {
      description: 'The image name of the paint',
      control: 'radio',
      options: [
        undefined,
        'AgrellanBadland',
        'AgrellanEarth',
        'ArmageddonDunes',
        'ArmageddonDust',
        'Astrogranite',
        'AstrograniteDebris',
        'MartianIroncrust',
        'MartianIronearth',
        'MordantEarth',
        'StirlandBattlemire',
        'StirlandMud',
        'ValhallanBlizzard',
      ],
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

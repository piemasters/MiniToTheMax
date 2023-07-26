import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

import { PageLink } from './PageLink';

const meta: Meta<typeof PageLink> = {
  component: PageLink,
  argTypes: {
    type: {
      name: 'type',
      description: 'The animation type',
      defaultValue: 'paintDrip',
      options: ['paintDrip', 'fade', 'swipe', 'cover'],
      control: {
        type: 'select',
      },
    },
    to: {
      name: 'to',
      description: 'The internal link address',
      defaultValue: '/',
      control: { type: 'text' },
    },
    duration: {
      name: 'duration',
      description: 'Length of the animation in seconds',
      defaultValue: 1,
      control: { type: 'number' },
    },
    bg: {
      name: 'bg',
      description: 'The background color, used by the cover animation',
      defaultValue: '#eb1d23',
      control: { type: 'color' },
    },
    hex: {
      name: 'hex',
      description:
        'The background color, used by the paintDrip & swipe animations',
      defaultValue: '#eb1d23',
      control: { type: 'color' },
    },
    entryOffset: {
      name: 'entryOffset',
      description: 'Animation entry delay in milliseconds',
      defaultValue: 100,
      control: { type: 'number' },
    },
    top: {
      name: 'top',
      description: 'Whether the entering or exiting page should be on top',
      defaultValue: 'exit',
      options: ['entry', 'exit'],
      control: { type: 'select' },
    },
    direction: {
      name: 'direction',
      description: 'Directional of transitions',
      defaultValue: 'up',
      options: ['left', 'right', 'up', 'down'],
      control: { type: 'select' },
    },
    children: {
      name: 'children',
      description: 'The html wrapped inside the link',
      defaultValue: 'Test',
      control: { type: 'text' },
    },
    linkStyle: {
      name: 'linkStyle',
      description: 'The styling to apply to the link and its contents',
      defaultValue: css`
        color: #000000;
      `,
      control: { type: 'object' },
    },
    linkActiveStyle: {
      name: 'linkActiveStyle',
      description:
        'The styling to apply to the link and its contents when active',
      defaultValue: css`
        color: #000000;
      `,
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageLink>;

export const Primary: Story = {
  args: {
    type: 'paintDrip',
    to: '/',
    duration: 1,
    bg: '#eb1d23',
    hex: '#eb1d23',
    entryOffset: 100,
    top: 'exit',
    direction: 'up',
    children: 'Test',
    linkStyle: css`
      color: #000000;
    `,
    linkActiveStyle: css`
      color: #000000;
    `,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
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
    linkActiveStyle: {
      name: 'linkActiveStyle',
      description:
        'The styling to apply to the link and its contents when active',
      // defaultValue: css`
      //   color: #000000;
      // `,
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
    direction: 'up',
    children: 'Test',
    linkActiveStyle: 'text-red-500!',
  },
};

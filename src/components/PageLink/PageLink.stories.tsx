import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLink } from './PageLink';

const meta: Meta<typeof PageLink> = {
  component: PageLink,
  argTypes: {
    to: {
      name: 'to',
      description: 'The internal link address',
      defaultValue: '/',
      control: { type: 'text' },
    },
    children: {
      name: 'children',
      description: 'The html wrapped inside the link',
      defaultValue: 'Test',
      control: { type: 'text' },
    },
    currentPath: {
      name: 'currentPath',
      description: 'The address of the page being shown',
      control: { type: 'text' },
    },
    linkActiveStyle: {
      name: 'linkActiveStyle',
      description: 'Classes added when the link leads to the current page',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageLink>;

export const Primary: Story = {
  args: {
    to: '/',
    children: 'Test',
    currentPath: '/',
    linkActiveStyle: 'text-red-500!',
  },
};

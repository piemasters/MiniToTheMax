import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  argTypes: {
    title: {
      name: 'title',
      description: 'Website title',
      defaultValue: 'MiniToTheMax',
      control: { type: 'text' },
    },
    logo: {
      name: 'logo',
      description: 'Path to the logo image',
      defaultValue: '',
      control: { type: 'text' },
    },
    pages: {
      name: 'pages',
      description: 'The hyperlinks to display',
      defaultValue: [],
      control: { type: 'array' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: {
    title: 'MiniToTheMax',
    logo: '/images/logo.webp',
    pages: [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: 'Showcase', url: '/showcase' },
      { name: 'Backlog', url: '/backlog' },
    ],
  },
};

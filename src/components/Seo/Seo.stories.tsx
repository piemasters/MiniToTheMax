import type { Meta, StoryObj } from '@storybook/react-vite';
import { Seo } from './Seo';

const meta: Meta<typeof Seo> = {
  component: Seo,
  argTypes: {
    title: {
      name: 'title',
      description: 'Title of the page',
      defaultValue: 'SEO Title',
      control: { type: 'text' },
    },
    description: {
      name: 'description',
      description: 'A brief summary of the page',
      defaultValue: 'SEO description',
      control: { type: 'text' },
    },
    image: {
      name: 'image',
      description: 'Path to thumbnail used when link is shared',
      defaultValue: 'images/logo.webp',
      control: { type: 'text' },
    },
    article: {
      name: 'article',
      description: 'Whether the page type is a blog post',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    siteUrl: {
      name: 'pathname',
      description: 'The unique slug of the page after the base URL',
      defaultValue: '',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Seo>;

export const Primary: Story = {
  args: {
    title: 'SEO Title',
    description: 'Description of the SEO',
    image: 'images/logo.webp',
    article: true,
    siteUrl: 'https://minitothemax.app',
  },
};

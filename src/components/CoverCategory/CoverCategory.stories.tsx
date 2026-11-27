import type { Meta, StoryObj } from '@storybook/react-vite';
import { CoverCategory } from './CoverCategory';

const meta: Meta<typeof CoverCategory> = {
  component: CoverCategory,
  argTypes: {
    img: {
      name: 'img',
      description: 'The cover image of the category',
      control: { type: 'object' },
    },
    slug: {
      name: 'slug',
      description: 'The url to the category',
      defaultValue: '/showcase/board-games',
      control: { type: 'text' },
    },
    title: {
      name: 'title',
      description: 'The title of the category',
      defaultValue: 'Board Games',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoverCategory>;

export const Primary: Story = {
  args: {
    img: {
      src: '/images/example-cover.jpg',
      srcSet:
        '/images/example-cover.jpg 450w, /images/example-cover.jpg 900w, /images/example-cover.jpg 1800w',
      sizes: '(min-width: 750px) 750px, 100vw',
      width: 750,
      height: 375,
    },
    slug: `/showcase/board-games`,
    title: `Board Games`,
  },
};

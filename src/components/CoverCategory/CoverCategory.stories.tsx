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
      layout: 'constrained', // "fullWidth" | "fixed";
      backgroundColor: '#585858',
      width: 1800,
      height: 900,
      images: {
        fallback: {
          src: '/images/example-cover.jpg',
          srcSet:
            '/images/example-cover.jpg 450w,\n/images/example-cover.jpg 900w,\n/images/example-cover.jpg 1800w',
          sizes: '(min-width: 1800px) 1800px, 100vw',
        },
        sources: [
          {
            srcSet:
              '/images/example-cover.jpg 450w,\n/images/example-cover.jpg 900w,\n/images/example-cover.jpg 1800w',
            type: 'image/jpg',
            sizes: '(min-width: 1800px) 1800px, 100vw',
          },
        ],
      },
    },
    slug: `/showcase/board-games`,
    title: `Board Games`,
  },
};

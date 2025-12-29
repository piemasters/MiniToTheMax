import type { Meta, StoryObj } from '@storybook/react-vite';
import { CoverImage } from './CoverImage';

const meta: Meta<typeof CoverImage> = {
  component: CoverImage,
  argTypes: {
    image: {
      name: 'image',
      description: 'Cover image',
      control: { type: 'object' },
    },
    title: {
      name: 'title',
      description: 'The title of the post',
      defaultValue: 'This is the post title',
      control: { type: 'text' },
    },
    tall: {
      name: 'tall',
      description: 'Increase the offset of the title for taller images',
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CoverImage>;

export const Primary: Story = {
  args: {
    image: {
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
    title: `This is the post title`,
    tall: false,
  },
};

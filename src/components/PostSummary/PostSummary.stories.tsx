import type { Meta, StoryObj } from '@storybook/react-vite';
import { PostSummary } from './PostSummary';

const meta: Meta<typeof PostSummary> = {
  component: PostSummary,
  argTypes: {
    date: {
      name: 'date',
      description: 'Date the post was published',
      defaultValue: '11/01/2019',
      control: { type: 'date' },
    },
    img: {
      name: 'img',
      description: 'Cover image',
      control: { type: 'object' },
    },
    slug: {
      name: 'slug',
      description: 'The trailing URL of the post',
      defaultValue: 'post-slug',
      control: { type: 'text' },
    },
    title: {
      name: 'title',
      description: 'The title of the post',
      defaultValue: 'Post Title',
      control: { type: 'text' },
    },
    excerpt: {
      name: 'excerpt',
      description: 'The first few lines of the post',
      defaultValue: 'Post Title',
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
type Story = StoryObj<typeof PostSummary>;

export const Primary: Story = {
  args: {
    date: '11/01/2019',
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
    slug: 'post-slug',
    title: 'Post Title',
    excerpt: 'The is the excerpt of the post',
    tall: true,
  },
};

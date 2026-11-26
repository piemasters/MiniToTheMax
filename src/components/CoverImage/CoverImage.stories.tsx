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
      src: '/images/example-cover.jpg',
      srcSet:
        '/images/example-cover.jpg 450w, /images/example-cover.jpg 900w, /images/example-cover.jpg 1800w',
      sizes: '(min-width: 750px) 750px, 100vw',
      width: 750,
      height: 375,
    },
    title: `This is the post title`,
    tall: false,
  },
};

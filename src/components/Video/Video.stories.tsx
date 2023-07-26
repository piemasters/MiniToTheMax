import type { Meta, StoryObj } from '@storybook/react';

import { Video } from './Video';

const meta: Meta<typeof Video> = {
  component: Video,
  argTypes: {
    src: {
      name: 'src',
      description: 'Source of the video file',
      defaultValue: '',
      control: { type: 'text' },
    },
    title: {
      name: 'title',
      description: 'Title of the video',
      defaultValue: 'Video Title',
      control: { type: 'text' },
    },
    width: {
      name: 'image',
      description: 'The width the video should be on the page',
      defaultValue: 714,
      control: { type: 'number' },
    },
    aspectRatio: {
      name: 'aspectRatio',
      description: 'The aspect ratio of the image to determine the height',
      defaultValue: 16 / 9,
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Video>;

export const Primary: Story = {
  args: {
    src: 'https://www.youtube.com/embed/s1Ck5Xn6420',
    title: 'Grey Knight Librarian',
    width: 714,
    aspectRatio: 16 / 9,
  },
};

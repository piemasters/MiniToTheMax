import type { Meta, StoryObj } from '@storybook/react-vite';
import { Video } from './Video';

const meta: Meta<typeof Video> = {
  component: Video,
  argTypes: {
    videoId: {
      name: 'videoId',
      description: 'The id part of the source for the video file',
      defaultValue: '',
      control: { type: 'text' },
    },
    title: {
      name: 'title',
      description: 'Title of the video',
      defaultValue: 'Video Title',
      control: { type: 'text' },
    },
    aspectWidth: {
      name: 'aspectWidth',
      description: 'The aspect ratio width of the video',
      defaultValue: 16,
      control: { type: 'number' },
    },
    aspectHeight: {
      name: 'aspectHeight',
      description: 'The aspect ratio height of the video',
      defaultValue: 9,
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Video>;

export const Primary: Story = {
  args: {
    videoId: 's1Ck5Xn6420',
    title: 'Grey Knight Librarian',
    aspectWidth: 16,
    aspectHeight: 9,
  },
};

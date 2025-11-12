import type { Meta, StoryObj } from '@storybook/react-vite';
import { PostTag } from './PostTag';

const meta: Meta<typeof PostTag> = {
  component: PostTag,
  argTypes: {
    name: {
      name: 'name',
      description: 'The text within the tag',
      defaultValue: 'Tag',
      control: { type: 'text' },
    },
    type: {
      name: 'type',
      description: 'Used to determine the base url',
      defaultValue: 'tag',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostTag>;

export const Primary: Story = {
  args: {
    name: 'Tag',
    type: 'tag',
  },
};

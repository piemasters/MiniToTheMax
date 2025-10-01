import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  argTypes: {
    author: {
      name: 'author',
      description: 'Website author',
      defaultValue: 'MiniToTheMax',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
  args: {
    author: 'MiniToTheMax',
  },
};

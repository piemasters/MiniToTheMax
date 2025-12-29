import type { Meta, StoryObj } from '@storybook/react-vite';
import { SimplePagination } from './SimplePagination';

const meta: Meta<typeof SimplePagination> = {
  component: SimplePagination,
  argTypes: {
    previous: {
      name: 'prevPage',
      description: 'Link to the previous page',
      defaultValue: { slug: 'previous', title: 'Previous Page' },
      control: { type: 'object' },
    },
    next: {
      name: 'nextPage',
      description: 'Link to the next page',
      defaultValue: { slug: 'next', title: 'Next Page' },
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimplePagination>;

export const Primary: Story = {
  args: {
    previous: {
      slug: 'previous',
      title: 'Previous Page',
    },
    next: {
      slug: 'next',
      title: 'Next Page',
    },
  },
};

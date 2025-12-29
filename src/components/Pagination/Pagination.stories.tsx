import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {
    numPages: {
      name: 'numPages',
      description: 'The number of pages to display between Previous and Next',
      defaultValue: 20,
      control: { type: 'number' },
    },
    currentPage: {
      name: 'currentPage',
      description: 'The current page number',
      defaultValue: 3,
      control: { type: 'number' },
    },
    maxPages: {
      name: 'maxPages',
      description: 'The maximum number of pages to show at once',
      defaultValue: 10,
      control: { type: 'number' },
    },
    baseUrl: {
      name: 'baseUrl',
      description:
        'The base URL the prefixes each of the generated page strings/numbers',
      defaultValue: '/blog/',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  args: {
    numPages: 20,
    currentPage: 3,
    maxPages: 10,
    baseUrl: '/',
  },
};

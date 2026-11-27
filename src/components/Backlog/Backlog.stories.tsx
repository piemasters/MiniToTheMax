import type { Meta, StoryObj } from '@storybook/react-vite';
import { Backlog } from './Backlog';

const meta: Meta<typeof Backlog> = {
  component: Backlog,
};

export default meta;
type Story = StoryObj<typeof Backlog>;

export const Primary: Story = {};

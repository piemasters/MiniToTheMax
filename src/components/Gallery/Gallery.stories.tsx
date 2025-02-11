import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './Gallery';
import { mockGallery } from './mock';

const meta: Meta<typeof Gallery> = {
  component: Gallery,
  argTypes: {
    gallery: {
      name: 'gallery',
      description: 'Gallery of images',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div className="grow mx-auto max-w-3xl px-4 w-full">
        <div>
          <h2>Gallery</h2>
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    gallery: mockGallery,
  },
};

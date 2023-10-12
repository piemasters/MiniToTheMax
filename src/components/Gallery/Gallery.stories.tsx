import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './Gallery';
import { mockGallery } from './mock';

const meta: Meta<typeof Gallery> = {
  component: Gallery,
  argTypes: {
    gallery: {
      name: 'gallery',
      description: 'Gallery of images',
      // defaultValue: [],
      // control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          flexGrow: '1',
          margin: '0 auto',
          maxWidth: '750px',
          padding: ' 0 1rem',
          width: ' 100%',
        }}
      >
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

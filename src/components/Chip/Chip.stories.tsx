import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Chip } from './Chip';

const colorDot = (hex: string) => (
  <span
    aria-hidden="true"
    className="inline-block w-3 h-3 border border-gray-400 rounded-full"
    style={{ backgroundColor: hex }}
  />
);

const meta: Meta<typeof Chip> = {
  component: Chip,
  args: {
    label: 'Citadel',
    ariaLabel: 'Remove filter Citadel',
    onRemove: fn(),
  },
  argTypes: {
    label: {
      description: 'The visible text of the chip',
      control: { type: 'text' },
    },
    ariaLabel: {
      description:
        'The accessible name of the button. It should say what removing does and include the visible label',
      control: { type: 'text' },
    },
    onRemove: {
      description: 'Called when the chip is clicked',
    },
    prefix: {
      description: 'Optional content shown before the label',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {};

export const Search: Story = {
  args: {
    label: 'Search: gold',
    ariaLabel: 'Remove Search: gold',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Close to #9a1115',
    ariaLabel: 'Remove color match Close to #9a1115',
    prefix: colorDot('#9a1115'),
  },
};

export const All: Story = {
  render: ({ onRemove }) => (
    <div className="flex flex-wrap gap-2">
      <Chip
        label="Citadel"
        ariaLabel="Remove filter Citadel"
        onRemove={onRemove}
      />
      <Chip
        label="Search: gold"
        ariaLabel="Remove Search: gold"
        onRemove={onRemove}
      />
      <Chip
        label="Close to #9a1115"
        ariaLabel="Remove color match Close to #9a1115"
        onRemove={onRemove}
        prefix={colorDot('#9a1115')}
      />
    </div>
  ),
};

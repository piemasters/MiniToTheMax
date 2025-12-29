import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Accordion } from './Accordion';

const meta = {
  component: Accordion,
  subcomponents: { Item: Accordion.Item },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;

export const AccordionWrapper: Story = {
  render: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Accordion name="demo-1" className="max-w-lg w-full">
          <Accordion.Item value="1" trigger="👋 Hello There">
            A demo Accordion item
          </Accordion.Item>
          <Accordion.Item value="2" trigger="🌟 It's Animated">
            It transitions between the open and close states
          </Accordion.Item>
          <Accordion.Item
            value="3"
            trigger={<div>🧶It&apos;s customisable</div>}
          >
            It is entirely customizable. You can put any HTML element and style
            it however you want.
          </Accordion.Item>
          <Accordion.Item value="4" trigger={<div>🦕 React & Tailwind</div>}>
            Nothing but React and Tailwind CSS
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
  args: {
    value: '1',
    onChange: fn(),
  },
};

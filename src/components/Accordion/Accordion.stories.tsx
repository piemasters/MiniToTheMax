import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionItem } from './Accordion';
import { BadgeNames } from '../../types';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  argTypes: {
    // type: {
    //   name: 'type',
    //   description: 'The badge type to display',
    //   defaultValue: BadgeNames.showcase,
    //   control: { type: 'radio' },
    // },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  render: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Accordion className="max-w-lg">
          <AccordionItem value="1" trigger="👋 Hello There">
            A demo Accordion item
          </AccordionItem>
          <AccordionItem value="2" trigger="🌟 It's Animated">
            It transitions between the open and close states
          </AccordionItem>
          <AccordionItem value="3" trigger={<div>🧶It's customisable</div>}>
            It is entirely customizable. You can put any HTML element and style
            it however you want.
          </AccordionItem>
          <AccordionItem value="4" trigger={<div>🦕 React & Tailwind</div>}>
            Nothing but React and Tailwind CSS
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
  //   args: {
  //     type: BadgeNames.showcase,
  //   },
};

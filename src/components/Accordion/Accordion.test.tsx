import {
  fireEvent,
  render,
  getByTestId,
  getAllByTestId,
} from '@testing-library/react';

import { Accordion, AccordionItem } from './Accordion';

describe('Accordion', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Accordion className="max-w-lg">
        <AccordionItem value="1" trigger="👋 Hello There">
          A demo Accordion item
        </AccordionItem>
        <AccordionItem value="2" trigger="🌟 It's Animated">
          It transitions between the open and close states
        </AccordionItem>
        <AccordionItem value="3" trigger={<div>🧶It's customisable</div>}>
          It is entirely customizable. You can put any HTML element and style it
          however you want.
        </AccordionItem>
        <AccordionItem value="4" trigger={<div>🦕 React & Tailwind</div>}>
          Nothing but React and Tailwind CSS
        </AccordionItem>
      </Accordion>
    );

    expect(getByTestId(container, 'accordion')).toBeVisible();
    expect(getAllByTestId(container, 'accordion-item').length).toBe(4);

    expect(getAllByTestId(container, 'accordion-item-content')[0]).toHaveClass(
      'closed'
    );
    fireEvent.click(getAllByTestId(container, 'accordion-item-trigger')[0]);
    expect(getAllByTestId(container, 'accordion-item-content')[0]).toHaveClass(
      'open'
    );

    expect(container).toMatchSnapshot();
  });
});

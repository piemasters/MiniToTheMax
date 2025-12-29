import {
  fireEvent,
  render,
  getByTestId,
  getAllByTestId,
} from '@testing-library/react';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Accordion name="test">
        <Accordion.Item value="1" trigger="Trigger 1">
          Item 1 Content
        </Accordion.Item>
        <Accordion.Item value="2" trigger="Trigger 2">
          Item 2 Content
        </Accordion.Item>
        <Accordion.Item value="3" trigger={<div>Trigger 3</div>}>
          Item 3 Content
        </Accordion.Item>
        <Accordion.Item value="4" trigger={<div>Trigger 4</div>}>
          Item 4 Content
        </Accordion.Item>
      </Accordion>
    );

    expect(getByTestId(container, 'accordion')).toBeVisible();
    expect(getAllByTestId(container, 'accordion-item').length).toBe(4);
    expect(getAllByTestId(container, 'accordion-item-header').length).toBe(4);
    expect(getAllByTestId(container, 'accordion-item-content').length).toBe(4);

    expect(getAllByTestId(container, 'accordion-item-content')[0]).toHaveClass(
      'closed'
    );
    fireEvent.click(getAllByTestId(container, 'accordion-item')[0]);
    expect(getAllByTestId(container, 'accordion-item-content')[0]).toHaveClass(
      'open'
    );
    expect(getAllByTestId(container, 'accordion-item-content')[1]).toHaveClass(
      'closed'
    );
    expect(getAllByTestId(container, 'accordion-item-content')[2]).toHaveClass(
      'closed'
    );
    expect(getAllByTestId(container, 'accordion-item-content')[3]).toHaveClass(
      'closed'
    );

    expect(container).toMatchSnapshot();
  });
});

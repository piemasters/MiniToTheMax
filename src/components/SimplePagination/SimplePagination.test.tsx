import { getByTestId, render } from '@testing-library/react';
import { SimplePagination } from './SimplePagination';

describe('SimplePagination', () => {
  test('renders correctly', () => {
    const previous = {
      slug: 'previous',
      title: 'The Previous Page',
    };

    const next = {
      slug: 'next',
      title: 'The Next Page',
    };

    const { container } = render(
      <SimplePagination previous={previous} next={next} />
    );

    expect(
      getByTestId(container as HTMLElement, 'simple-pagination')
    ).toHaveTextContent(previous.title);
    expect(
      getByTestId(container as HTMLElement, 'simple-pagination')
    ).toHaveTextContent(next.title);
    expect(container).toMatchSnapshot();
  });
});

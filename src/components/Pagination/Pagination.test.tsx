import { getByTestId, render } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Pagination numPages={5} currentPage={3} maxPages={10} baseUrl={'/'} />
    );

    expect(
      getByTestId(container as HTMLElement, 'pagination')
    ).toHaveTextContent('<<12345>>');
    expect(container).toMatchSnapshot();
  });
});

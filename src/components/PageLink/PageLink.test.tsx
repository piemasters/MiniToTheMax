import { getByTestId, render } from '@testing-library/react';
import { PageLink } from './PageLink';

describe('PageLink', () => {
  test('renders correctly', () => {
    const { container } = render(<PageLink to={'/'}>Default</PageLink>);

    expect(
      getByTestId(container as HTMLElement, 'page-link')
    ).toHaveTextContent('Default');
    expect(container).toMatchSnapshot();
  });
});

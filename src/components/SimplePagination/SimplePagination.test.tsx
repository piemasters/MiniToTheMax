import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { SimplePagination } from './SimplePagination';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

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

    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <SimplePagination previous={previous} next={next} />
      </ThemeProvider>
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

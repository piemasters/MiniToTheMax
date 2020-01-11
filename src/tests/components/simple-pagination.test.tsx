import React from 'react';
import { PureSimplePagination as SimplePagination } from '../../components/simple-pagination';
import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';

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
      <ThemeProvider theme={theme}>
        <SimplePagination previous={previous} next={next} />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'simple-pagination')).toHaveTextContent('1');
    expect(container).toMatchSnapshot();
  });
});

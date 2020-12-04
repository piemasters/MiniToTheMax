import React from 'react';
import Pagination from '../../components/pagination';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('Pagination', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <Pagination
          isFirst={false}
          isLast={false}
          prevPage={'previous'}
          nextPage={'next'}
          numPages={5}
          currentPage={3}
          maxPages={10}
          baseUrl={'/'}
        />
      </ThemeProvider>
    );

    expect(
      getByTestId(container as HTMLElement, 'pagination')
    ).toHaveTextContent('<<12345>>');
    expect(container).toMatchSnapshot();
  });
});

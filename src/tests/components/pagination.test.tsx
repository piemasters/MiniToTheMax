import React from 'react';
import Pagination from '../../components/pagination';
import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';

describe('Pagination', () => {
  test('renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Pagination
          isFirst={false}
          isLast={false}
          prevPage={'previous'}
          nextPage={'next'}
          numPages={5}
          currentPage={3}
          baseUrl={'/'}
        />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'pagination')).toHaveTextContent('/');
    expect(container).toMatchSnapshot();
  });
});

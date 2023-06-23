import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Pagination } from './Pagination';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

describe('Pagination', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
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

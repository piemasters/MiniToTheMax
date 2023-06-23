import React from 'react';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { CoverCategory } from './CoverCategory';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

describe('CoverCategory', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <CoverCategory
          img={{
            layout: 'constrained',
            width: 1800,
            height: 900,
            backgroundColor: '#282828',
            images: {
              fallback: {
                src: 'cover.jpeg',
              },
            },
          }}
          slug={'/showcase/board-games'}
          title={'Board Games'}
        />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'cover-category')).toHaveTextContent(
      'Board Games'
    );
    expect(container).toMatchSnapshot();
  });
});

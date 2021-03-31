import React from 'react';
import CoverCategory from '../../components/cover-category';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('CoverCategory', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
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

    expect(
      getByTestId(container as HTMLElement, 'cover-category')
    ).toHaveTextContent('Board Games');
    expect(container).toMatchSnapshot();
  });
});

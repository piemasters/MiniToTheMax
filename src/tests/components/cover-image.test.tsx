import React from 'react';
import CoverImage from '../../components/cover-image';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('CoverImage', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <CoverImage
          image={{
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
          title={'Demo Post Title'}
        />
      </ThemeProvider>
    );

    expect(
      getByTestId(container as HTMLElement, 'cover-image')
    ).toHaveTextContent('Demo Post Title');
    expect(container).toMatchSnapshot();
  });
});

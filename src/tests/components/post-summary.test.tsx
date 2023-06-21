import React from 'react';
import PostSummary from '../../components/post-summary';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('PostSummary', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <PostSummary
          date={'11/01/2019'}
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
          slug={'slug'}
          title={'Demo Post Title'}
          excerpt={'A test sentence'}
        />
      </ThemeProvider>
    );

    expect(
      getByTestId(container as HTMLElement, 'post-summary')
    ).toHaveTextContent('Demo Post Title');
    expect(container).toMatchSnapshot();
  });
});

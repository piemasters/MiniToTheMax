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
            aspectRatio: 1,
            src: 'cover.jpeg',
            srcSet: '',
            sizes: '(max-width: 800px) 100vw, 800px',
          }}
          slug={'slug'}
          title={'Demo Post Title'}
          excerpt={'A test sentence'}
          timeToRead={5}
        />
      </ThemeProvider>
    );

    expect(
      getByTestId(container as HTMLElement, 'post-summary')
    ).toHaveTextContent('Demo Post Title');
    expect(container).toMatchSnapshot();
  });
});

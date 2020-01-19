import React from 'react';
import PostSummary from '../../components/post-summary';
import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';

describe('PostSummary', () => {
  test('renders correctly', () => {
    const { container } = render(
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

    expect(getByTestId(container, 'post-summary')).toHaveTextContent(
      'Demo Post Title'
    );
    expect(container).toMatchSnapshot();
  });
});

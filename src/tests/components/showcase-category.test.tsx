import React from 'react';
import ShowcaseCategory from '../../components/showcase-category';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('ShowcaseCategory', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <ShowcaseCategory
          img={{
            aspectRatio: 2,
            src: 'cover.jpeg',
            srcSet: '',
            sizes: '(max-width: 800px) 100vw, 800px',
          }}
          slug={'/showcase/board-games'}
          title={'Board Games'}
        />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'showcase-category')).toHaveTextContent(
      'Board Games'
    );
    expect(container).toMatchSnapshot();
  });
});

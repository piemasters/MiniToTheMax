import React from 'react';
import PostTag from '../../components/post-tag';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('PostTag', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <PostTag name={'Tag'} type={'tag'} />
      </ThemeProvider>
    );

    expect(getByTestId(container as HTMLElement, 'post-tag')).toHaveTextContent(
      'Tag'
    );
    expect(container).toMatchSnapshot();
  });
});

import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { PostTag } from './PostTag';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

describe('PostTag', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <PostTag name={'Tag'} type={'tag'} />
      </ThemeProvider>
    );

    expect(getByTestId(container as HTMLElement, 'post-tag')).toHaveTextContent(
      'Tag'
    );
    expect(container).toMatchSnapshot();
  });
});

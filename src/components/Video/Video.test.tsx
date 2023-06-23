import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Video } from './Video';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

describe('Video', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <Video
          src="https://www.youtube.com/embed/qcWaykRRDfM"
          title="Grey Knight Stormraven"
        />{' '}
      </ThemeProvider>
    );
    expect(getByTestId(container as HTMLElement, 'video')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

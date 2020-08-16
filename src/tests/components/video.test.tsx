import React from 'react';
import Video from '../../components/video';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('Video', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <Video
          src="https://www.youtube.com/embed/qcWaykRRDfM"
          title="Grey Knight Stormraven"
        />{' '}
      </ThemeProvider>
    );
    expect(getByTestId(container, 'video')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

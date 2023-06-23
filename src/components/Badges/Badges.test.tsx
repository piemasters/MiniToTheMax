import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Badges } from './Badges';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

describe('Badges', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <Badges />
      </ThemeProvider>
    );

    expect(getByTestId(container as HTMLElement, 'badges')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

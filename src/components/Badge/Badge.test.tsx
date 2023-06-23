import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Badge } from './Badge';
import { appTheme } from '../../styles/theme';
import { BadgeNames } from '../../types';
import { renderWithTransitionProvider } from '../../util';

describe('Badge', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <Badge type={BadgeNames.showcase} />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'badge')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

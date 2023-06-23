import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Paint } from './Paint';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';
import { baseRetributorArmour } from '../../data/paints/base';

describe('Paint', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <Paint paint={baseRetributorArmour} />
      </ThemeProvider>
    );

    expect(getByTestId(container as HTMLElement, 'paint')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

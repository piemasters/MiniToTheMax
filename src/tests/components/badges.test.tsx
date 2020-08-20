import React from 'react';
import Badges from '../../components/badges';
import { getByTestId, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';

describe('Badges', () => {
  test('renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Badges />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'badges')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

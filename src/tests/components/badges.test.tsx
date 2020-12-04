import React from 'react';
import Badges from '../../components/badges';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('Badges', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <Badges />
      </ThemeProvider>
    );

    expect(getByTestId(container as HTMLElement, 'badges')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

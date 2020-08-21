import React from 'react';
import Badge from '../../components/badge';
import { getByTestId, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';
import { BadgeNames } from '../../types/app.types';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('Badge', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <Badge type={BadgeNames.showcase} />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'badge')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

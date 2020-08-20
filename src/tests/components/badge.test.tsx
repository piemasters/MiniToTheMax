import React from 'react';
import Badge from '../../components/badge';
import { getByTestId, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';
import { BadgeNames } from '../../types/app.types';

describe('Badge', () => {
  test('renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Badge type={BadgeNames.showcase} />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'badge')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

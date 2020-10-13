import React from 'react';
import Paint from '../../components/paint';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';
import { baseRetributorArmour } from '../../data/paints/base';

describe('Paint', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <Paint paint={baseRetributorArmour} />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'paint')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

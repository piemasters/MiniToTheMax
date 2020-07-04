import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../src/styles/theme';
import InternalProvider from 'gatsby-plugin-transition-link/context/InternalProvider';

const ThemeDecorator = (storyFn) => (
  <InternalProvider>
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  </InternalProvider>
);

export default ThemeDecorator;

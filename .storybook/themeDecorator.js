import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../src/styles/theme';
import InternalProvider from 'gatsby-plugin-transition-link/context/InternalProvider';
import { Global } from '@emotion/react';
import { globalStyles } from '../src/styles/global';

const ThemeDecorator = storyFn => (
  <InternalProvider>
    <div style={{ maxWidth: '750px' }}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles(theme)} />
        {storyFn()}
      </ThemeProvider>
    </div>
  </InternalProvider>
);

export default ThemeDecorator;

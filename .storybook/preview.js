import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '@emotion/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import results from '../.jest-results.json';
import { withTests } from '@storybook/addon-jest';
import theme from './theme';
import { appTheme } from '../src/styles/theme';
import { globalStyles } from '../src/styles/global';
import { Global } from '@emotion/react';
import InternalProvider from 'gatsby-plugin-transition-link/context/InternalProvider';

const GlobalStyles = () => <Global styles={globalStyles(appTheme)} />;

export const parameters = {
  ally: {},
  docs: {
    inlineStories: true,
    iframeHeight: '60px',
    theme: theme,
  },
  options: {
    storySort: (a, b) =>
      a.id === b.id
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true }),
  },
};

export const decorators = [
  withTests({
    results,
    filesExt: '.test.tsx',
  }),
  withThemeFromJSXProvider({
    themes: {
      light: appTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
  (Story) => (
    <InternalProvider>
      <Story />
    </InternalProvider>
  ),
];

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions

window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

import { action } from '@storybook/addon-actions';
import '../src/styles/global.css';
import results from '../.jest-results.json';
import { withTests } from '@storybook/addon-jest';
import { theme as storybookTheme } from './theme';

export const parameters = {
  ally: {},
  docs: {
    inlineStories: true,
    theme: storybookTheme,
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
  (Story) => <Story />,
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
export const tags = ['autodocs'];

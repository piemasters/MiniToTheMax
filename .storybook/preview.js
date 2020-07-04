import { addParameters, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import results from '../.jest-results.json';
import { withTests } from '@storybook/addon-jest';
import { withCssResources } from '@storybook/addon-cssresources';
import themeDecorator from './themeDecorator';
import '../src/styles/index.scss';
import theme from './theme';

// Adding decorators here enables these plugins in every story

addDecorator(
  withTests({
    results,
    filesExt: '.test.tsx',
  })
);
addDecorator(withCssResources);
addDecorator(themeDecorator);

addParameters({
  // Define settings for accessibility
  ally: {},
  // Define possible background colors which can be toggled in the canvas view
  backgrounds: {
    default: 'white',
    values: [
      { name: 'white', value: '#ffffff' },
      { name: 'black', value: '#000000' },
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' },
    ],
  },
  // Define global css that can be toggled on/off in the canvas view
  cssresources: [
    {
      id: `bluetheme`,
      code: `<style>body { background-color: lightblue; }</style>`,
      picked: false,
    },
  ],
  // Settings for the Docs plugin
  docs: {
    inlineStories: true,
    iframeHeight: '60px',
    theme: theme,
  },
  options: {
    showRoots: true,
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
});

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// __PATH_PREFIX__ is used inside gatsby-link an other various places. For storybook not to crash, you need to set it as well.
global.__BASE_PATH__ = '';
global.__PATH_PREFIX__ = '';
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

// https://gist.github.com/shilman/69c1dd41a466bae137cc88bd2c6ef487
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
};

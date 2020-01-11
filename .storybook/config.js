import { configure, addParameters, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import results from '../.jest-results.json';
import { withTests } from '@storybook/addon-jest';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withCssResources } from '@storybook/addon-cssresources';
import themeDecorator from './themeDecorator';
import '../src/styles/index.scss';

addDecorator(
  withTests({
    results,
    filesExt: '.test.tsx',
  })
);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withCssResources);
addDecorator(themeDecorator);

addParameters({
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
    { name: 'black', value: '#000000' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
  cssresources: [
    {
      id: `bluetheme`,
      code: `<style>body { background-color: lightblue; }</style>`,
      picked: false,
    },
  ],
  docs: {
    inlineStories: true,
    iframeHeight: '60px',
  },
  options: {
    showRoots: true,
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
});

// automatically import all files ending in *.stories.js
configure(
  require.context('../src', true, /\.stories\.(js|jsx|ts|tsx|mdx)$/),
  module
);
// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};

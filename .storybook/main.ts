import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  staticDirs: ['../public', '../content/assets'],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-jest',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  docs: {},
};

export default config;

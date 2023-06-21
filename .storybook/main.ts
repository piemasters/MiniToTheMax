import type { StorybookConfig } from '@storybook/react-webpack5';
import React from 'react';
import path from 'path';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  // stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  stories: ['../src/**/*.stories.@(tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-jest',
    '@storybook/addon-links',
    '@storybook/addon-styling',
    '@storybook/addon-mdx-gfm',
    path.resolve('./.storybook/addon-gatsby.js'),
  ],
  docs: {
    autodocs: 'tag',
  },
  babel: (options) => ({
    ...options,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: 100,
          },
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
      '@emotion/babel-preset-css-prop',
    ],
    plugins: ['babel-plugin-remove-graphql-queries'],
  }),
  webpackFinal: async (config) => {
    config.resolve.mainFields = ['browser', 'module', 'main'];
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    // Remove core-js to prevent issues with Storybook
    config.module.rules[0].exclude = [
      /node_modules\/(?!(gatsby|gatsby-script)\/)/,
      /core-js/,
    ];
    // Use correct react-dom depending on React version.
    // if (parseInt(React.version) <= 18) {
    //   config.externals = ['react-dom/client'];
    // }
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    // config.module.rules[0].use[0].options.plugins.push(
    //   require.resolve('babel-plugin-remove-graphql-queries')
    // );

    // Support SVGs
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().indexOf('svg') !== -1
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    return config;
  },
};

export default config;

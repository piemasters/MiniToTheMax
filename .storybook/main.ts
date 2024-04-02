// @ts-nocheck
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  staticDirs: ['../public', '../content/assets'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-jest',
    '@storybook/addon-links',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-webpack5-compiler-babel',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules to support PostCSS
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
              {
                // Gets options from `postcss.config.js` in your project root
                loader: 'postcss-loader',
                options: { implementation: require.resolve('postcss') },
              },
            ],
          },
        ],
      },
    },
  ],
  docs: {
    autodocs: true,
  },
  babel: (options) => ({
    ...options,
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
        'preset-react-jsx-transform',
      ],
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
    config.module.rules[2].exclude = [/node_modules\/(?!(gatsby)\/)/];
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

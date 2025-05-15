const { defineConfig } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const jsxA11Y = require('eslint-plugin-jsx-a11y');
const graphql = require('eslint-plugin-graphql');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        graphql: true,
        __PATH_PREFIX__: true,
        __BASE_PATH__: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:storybook/recommended',
      'plugin:cypress/recommended'
    ),
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      'jsx-a11y': jsxA11Y,
      graphql,
    },
    rules: {
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['css'],
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]);

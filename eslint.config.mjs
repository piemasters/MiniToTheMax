import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  globalIgnores([
    '.astro/',
    '.history/',
    '.yarn/',
    'dist/',
    'storybook-static/',
    'cypress/screenshots/',
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  eslintConfigPrettier,
  ...storybook.configs['flat/recommended'],
  // Named, as the plugin can't detect it under this version of ESLint
  { settings: { react: { version: '19.3' } } },
  {
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    // A leading underscore marks a value which is unused on purpose
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: [
      '__mocks__/**/*.js',
      'jest.config.js',
      'postcss.config.js',
      'src/scripts/**/*.js',
    ],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    files: ['astro.config.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: { ...globals.mocha, cy: 'readonly', Cypress: 'readonly' },
    },
  },
]);

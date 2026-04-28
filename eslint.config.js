import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  eslintConfigPrettier,
  ...storybook.configs['flat/recommended'],
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
]);

// export default defineConfig([
//   {
//     languageOptions: {
//       parser: tsParser,
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//         graphql: true,
//         __PATH_PREFIX__: true,
//         __BASE_PATH__: true,
//       },
//       ecmaVersion: 2018,
//       sourceType: 'module',
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     extends: compat.extends(
//       'eslint:recommended',
//       'plugin:react/recommended',
//       'plugin:react/jsx-runtime',
//       'plugin:jsx-a11y/recommended',
//       'plugin:@typescript-eslint/recommended',
//       'prettier',
//       'plugin:storybook/recommended'
//     ),
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//     plugins: {
//       react,
//       'jsx-a11y': jsxA11Y,
//     },
//     rules: {
//       'react/prop-types': 'off',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/no-empty-interface': [
//         'error',
//         {
//           allowSingleExtends: true,
//         },
//       ],
//       '@typescript-eslint/no-unused-vars': 'off',
//       'react/no-unknown-property': [
//         'error',
//         {
//           ignore: ['css'],
//         },
//       ],
//     },
//   },
//   {
//     files: ['**/*.js'],
//     rules: {
//       '@typescript-eslint/no-var-requires': 'off',
//     },
//   },
// ]);

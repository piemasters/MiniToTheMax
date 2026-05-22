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

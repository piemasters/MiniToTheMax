import { create } from '@storybook/theming/create';
import logo from '../content/assets/images/icon.png';

export const theme = create({
  base: 'light',

  colorPrimary: '#ff5470',
  colorSecondary: '#00dcb5',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 10,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: '#00dcb5',
  barBg: '#00153d',

  // Form colors
  inputBg: 'white',
  inputBorder: 'white',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'MiniToTheMax Storybook',
  brandUrl: 'https://minitothemax.app',
  brandImage: logo,
});

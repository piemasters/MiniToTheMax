import { addons } from '@storybook/addons';
import { theme } from './theme';

// Use to theme storybook
addons.setConfig({
  theme: theme,
  showRoots: true,
});

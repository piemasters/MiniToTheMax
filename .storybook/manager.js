import { addons } from 'storybook/manager-api';
import { theme } from './theme';

// Use to theme storybook
addons.setConfig({
  theme: theme,
  showRoots: true,
});

import '../src/styles/global.css';
import { theme as storybookTheme } from './theme';

export const parameters = {
  ally: {},
  docs: {
    inlineStories: true,
    theme: storybookTheme,
  },
  options: {
    storySort: (a, b) =>
      a.id === b.id
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true }),
  },
};

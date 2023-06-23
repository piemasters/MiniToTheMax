import { render } from '@testing-library/react';
// @ts-expect-error: TransitionLinkProvider doesn't use TypeScript
import TransitionLinkProvider from 'gatsby-plugin-transition-link/context/InternalProvider';

export const renderWithTransitionProvider = (ui: JSX.Element) =>
  render(<TransitionLinkProvider>{ui}</TransitionLinkProvider>);

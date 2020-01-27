import React from 'react';
import { render } from '@testing-library/react';
// @ts-ignore
import TransitionLinkProvider from 'gatsby-plugin-transition-link/context/InternalProvider';

export const renderWithTransitionProvider = (ui: JSX.Element) =>
  render(<TransitionLinkProvider>{ui}</TransitionLinkProvider>);

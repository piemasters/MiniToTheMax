import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import Header from '../components/stateful/header';
import Footer from '../components/stateful/footer';
import appTheme from '../styles/theme';
import '../styles/index.scss';
import { globalStyles } from '../styles/global';

interface LayoutProps {
  children?: any;
}

const Layout = ({ children }: LayoutProps) => {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

  const contentStyles = css`
    flex-grow: 1;
    margin: 0 auto;
    max-width: 750px;
    padding: 0 1rem;
    width: 100%;
  `;

  return (
    <ThemeProvider theme={appTheme}>
      <Global styles={globalStyles(appTheme)} />
      <div css={containerStyles}>
        <Header />
        <div css={contentStyles}>
          <div>{children}</div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;

import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { css } from '@emotion/core';
import Header from '../components/header';
import Footer from '../components/footer';
import appTheme from '../styles/theme';
import '../styles/index.scss';

interface LayoutProps {
  children?: any;
}

const Layout = ({ children }: LayoutProps) => {
  const Container = css`
    margin: 0 auto;
    max-width: 750px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

  const Content = css`
    flex-grow: 1;
  `;

  return (
    <ThemeProvider theme={appTheme}>
      <div css={Container}>
        <div css={Content}>
          <Header />
          {children}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;

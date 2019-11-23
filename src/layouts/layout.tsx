import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/index.scss';
import { css } from '@emotion/core';

interface Props {
  location?: Location;
  title?: string;
  children?: any;
}

const Layout = ({ children }: Props) => {
  const containerStyle = css`
    margin: 0 auto;
    max-width: 750px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

  const contentStyle = css`
    flex-grow: 1;
  `;

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

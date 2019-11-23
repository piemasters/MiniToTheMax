import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const footerStyle = css`
    margin-top: 3rem;
  `;

  return (
    <footer css={footerStyle}>
      <p>Created by {data.site.siteMetadata.author} © 2019</p>
    </footer>
  );
};

export default Footer;

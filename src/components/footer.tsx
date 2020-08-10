import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../styles/theme';

interface FooterProps {
  author: string;
}

export const PureFooter = ({ author }: FooterProps) => {
  const theme: Theme = useTheme();

  const Footer = css`
    margin-top: 3rem;
    a {
      color: ${theme.colors.hyperlink};
      text-decoration: none;
      &:hover {
        color: ${theme.colors.hyperlinkActive};
      }
    }
  `;

  return (
    <footer data-testid="footer" css={Footer}>
      <p>
        Created by{' '}
        <a href="https://davidnorton.app/" target="_blank">
          {author}
        </a>{' '}
        © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

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

  return <PureFooter author={data.site.siteMetadata.author} />;
};

export default Footer;

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

interface FooterProps {
  author: string;
}

export const PureFooter = ({ author }: FooterProps) => {
  const theme: any = useTheme();

  const Footer = css`
    margin-top: 3rem;
  `;

  return (
    <footer data-testid="footer" css={Footer}>
      <p>
        Created by {author} © {new Date().getFullYear()}
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

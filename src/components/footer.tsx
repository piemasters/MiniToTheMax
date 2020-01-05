import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

interface FooterProps {
  author: string;
}

export const PureFooter = ({ author }: FooterProps) => {
  const Footer = styled.footer`
    margin-top: 3rem;
  `;

  return (
    <Footer>
      <p>
        Created by {author} © {new Date().getFullYear()}
      </p>
    </Footer>
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

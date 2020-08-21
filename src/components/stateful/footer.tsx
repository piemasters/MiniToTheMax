import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PureFooter from '../footer';

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

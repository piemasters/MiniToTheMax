import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PureHeader from '../header';

interface NavLink {
  name: string;
  url: string;
}

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      file(name: { eq: "logo" }) {
        size
        relativeDirectory
        publicURL
      }
    }
  `);

  const pages: NavLink[] = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Showcase', url: '/showcase' },
    { name: 'Backlog', url: '/backlog' },
  ];

  return (
    <PureHeader
      title={data.site.siteMetadata.title}
      logo={data.file.publicURL}
      pages={pages}
    />
  );
};

export default Header;

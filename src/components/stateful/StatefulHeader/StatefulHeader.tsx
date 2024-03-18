import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Header as PureHeader } from '../../Header';
import type { NavLink } from '../../../types';

export const StatefulHeader: FC = () => {
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
    { name: 'Paints', url: '/paints' },
  ];

  return (
    <PureHeader
      title={data.site.siteMetadata.title}
      logo={data.file.publicURL}
      pages={pages}
    />
  );
};

export default StatefulHeader;

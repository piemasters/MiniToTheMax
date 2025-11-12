import { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Footer as PureFooter } from '../../Footer/Footer';

export const StatefulFooter: FC = () => {
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

export default StatefulFooter;

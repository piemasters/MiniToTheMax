import { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Seo as PureSeo } from '../../Seo/Seo';

export const StatefulSeo: FC<{
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  pathname?: string;
}> = ({ title, description, image, pathname, article }) => {
  const data = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
        }
      }
    }
  `);

  const seo = {
    title: title ?? data.site.siteMetadata.title,
    description: description ?? data.site.siteMetadata.description,
    image: `${data.site.siteMetadata.siteUrl}${
      image ?? data.site.siteMetadata.image
    }`,
    siteUrl: `${data.site.siteMetadata.siteUrl}${pathname ?? '/'}`,
  };

  return (
    <PureSeo
      title={seo.title}
      description={seo.description}
      image={seo.image}
      article={article}
      siteUrl={seo.siteUrl}
    />
  );
};

export default StatefulSeo;

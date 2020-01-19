import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

interface PureSeoProps {
  title: string;
  description: string;
  image: string;
  article?: boolean;
  siteUrl: string;
}

export const PureSeo = ({
  title,
  description,
  image,
  article,
  siteUrl,
}: PureSeoProps) => {
  return (
    <>
      <Helmet title={title}>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* OpenGraph tags */}
        {siteUrl && <meta property="og:url" content={siteUrl} />}
        {(article ? true : null) && (
          <meta property="og:type" content="article" />
        )}
        {title && <meta property="og:title" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {image && <meta property="og:image" content={image} />}
      </Helmet>
    </>
  );
};

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  pathname?: string;
}

const Seo = ({ title, description, image, pathname, article }: SeoProps) => {
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
    title: title || data.site.siteMetadata.title,
    description: description || data.site.siteMetadata.description,
    image: `${data.site.siteMetadata.siteUrl}${image ||
      data.site.siteMetadata.image}`,
    siteUrl: `${data.site.siteMetadata.siteUrl}${pathname || '/'}`,
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
export default Seo;

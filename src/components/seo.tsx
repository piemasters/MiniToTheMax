import React from 'react';

interface SeoProps {
  title: string;
  description: string;
  image: string;
  article?: boolean;
  siteUrl: string;
}

const Seo = ({
  title,
  description,
  image,
  article,
  siteUrl,
}: SeoProps): JSX.Element => {
  return (
    <>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* OpenGraph tags */}
      {siteUrl && <meta property="og:url" content={siteUrl} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
    </>
  );
};

export default Seo;

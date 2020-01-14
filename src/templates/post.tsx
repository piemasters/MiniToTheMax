import React from 'react';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { kebabCase } from 'lodash';
import SimplePagination from '../components/simple-pagination';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// @ts-ignore
import Gallery from 'react-grid-gallery';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import { DiscussionEmbed } from 'disqus-react';
import { SharpFluidObject } from '../types/app.types';

interface Node {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    tags?: string[];
  };
}

interface PostContext {
  previous: Node;
  next: Node;
}

interface SiteData {
  siteMetadata: {
    siteUrl: string;
  };
}

interface GalleryData {
  publicURL: string;
  childImageSharp: {
    fluid: SharpFluidObject;
  };
}

interface Post {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    categories: string[];
    featuredImage: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    gallery: GalleryData[];
  };
  body: any;
}

interface PostData {
  post: Post;
  site: SiteData;
}

interface GalleryImage {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  nano?: string;
  srcSet: string | string[];
}

interface DisqusConfig {
  identifier: string;
  title: string;
  url: string;
}

const Post = ({
  pageContext,
  data,
}: {
  pageContext: PostContext;
  data: PostData;
}) => {
  const post: Post = data.post;
  const galleryImages: GalleryImage[] = [];
  post.frontmatter.gallery.forEach((img: GalleryData) => {
    const image = img.childImageSharp.fluid;
    galleryImages.push({
      src: image.src,
      thumbnail: image.src,
      thumbnailWidth: image.presentationWidth,
      thumbnailHeight: image.presentationHeight,
      nano: image.base64,
      srcSet: image.srcSet,
    });
  });

  const disqusShortname = process.env.GATSBY_DISQUS_NAME || 'disqusShortname';
  const disqusConfig: DisqusConfig = {
    identifier: post.fields.slug,
    title: post.frontmatter.title,
    url: `${data.site.siteMetadata.siteUrl}/${post.fields.slug}`,
  };

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
        pathname={post.fields.slug}
        image={post.frontmatter.featuredImage.childImageSharp.fluid.src}
        article={true}
      />
      <h1>{data.post.frontmatter.title}</h1>
      <p>{data.post.frontmatter.date}</p>
      <Img fluid={data.post.frontmatter.featuredImage.childImageSharp.fluid} />
      <br />
      TAGS:
      {data.post.frontmatter.tags.map((tag: any) => (
        <PageLink
          key={tag}
          to={`/tags/${kebabCase(tag)}/`}
          type={'cover'}
          direction={'up'}
        >
          {tag}
        </PageLink>
      ))}
      CATEGORIES:
      {data.post.frontmatter.categories.map((category: any) => (
        <PageLink
          key={category}
          to={`/categories/${kebabCase(category)}/`}
          type={'cover'}
          direction={'up'}
        >
          {category}
        </PageLink>
      ))}
      <MDXRenderer>{data.post.body}</MDXRenderer>
      <h2>Gallery</h2>
      <Gallery
        images={galleryImages}
        enableImageSelection={false}
        rowHeight={180}
        margin={2}
      />
      <SimplePagination
        previous={pageContext.previous}
        next={pageContext.next}
      />
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    post: mdx(fields: { slug: { eq: $slug } }) {
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date
        tags
        categories
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800, maxHeight: 400) {
              ...GatsbyImageSharpFluid
              presentationWidth
              presentationHeight
            }
          }
        }
        gallery {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
              presentationWidth
              presentationHeight
            }
          }
        }
      }
      body
    }
  }
`;

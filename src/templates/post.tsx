import React from 'react';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { kebabCase } from 'lodash';
import SimplePagination from '../components/simple-pagination';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { safe } from '../utils';
// @ts-ignore
import Gallery from 'react-grid-gallery';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import { DiscussionEmbed } from 'disqus-react';

interface GalleryImage {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  nano: string;
  srcSet: string[];
}

const Post = (props: any) => {
  const post = props.data.post;
  const { previous, next } = props.pageContext;

  const { frontmatter } = safe(post);
  const { gallery } = safe(frontmatter);

  const galleryImages: GalleryImage[] = gallery
    ? gallery.map((img: any) => ({
        src: img.childImageSharp.fluid.src,
        thumbnail: img.childImageSharp.fluid.src,
        thumbnailWidth: img.childImageSharp.fluid.presentationWidth,
        thumbnailHeight: img.childImageSharp.fluid.presentationHeight,
        nano: img.childImageSharp.fluid.base64,
        srcSet: img.childImageSharp.fluid.srcSet,
      }))
    : [];

  const disqusShortname = process.env.GATSBY_DISQUS_NAME || 'disqusShortname';
  const disqusConfig: { identifier: string; title: string; url: string } = {
    identifier: post.slug ? post.slug : 'default-identifier',
    title: post.frontmatter.title ? post.frontmatter.title : 'default-title',
    url: `${props.data.site.siteMetadata.siteUrl}/${post.slug}`,
  };

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
        pathname={post.slug}
        image={post.frontmatter.featuredImage.childImageSharp.fluid.src}
        article={true}
      />
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <Img
        fluid={
          post.frontmatter.featuredImage
            ? post.frontmatter.featuredImage.childImageSharp.fluid
            : { width: 0, height: 0, src: '', srcSet: null }
        }
      />
      <br />
      TAGS:{' '}
      {post.frontmatter.tags.map((tag: any) => (
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
      {post.frontmatter.categories.map((category: any) => (
        <PageLink
          key={category}
          to={`/categories/${kebabCase(category)}/`}
          type={'cover'}
          direction={'up'}
        >
          {category}
        </PageLink>
      ))}
      <MDXRenderer>{post.body}</MDXRenderer>
      <h2>Gallery</h2>
      <Gallery
        images={galleryImages}
        enableImageSelection={false}
        rowHeight={180}
        margin={2}
      />
      <SimplePagination previous={previous} next={next} />
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
      frontmatter {
        title
        date
        tags
        categories
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800, maxHeight: 400) {
              ...GatsbyImageSharpFluid
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

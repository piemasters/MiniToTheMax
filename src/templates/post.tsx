import React from 'react';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import SimplePagination from '../components/simple-pagination';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// @ts-ignore
import Gallery from 'react-grid-gallery';
import Seo from '../components/seo';
import { DiscussionEmbed } from 'disqus-react';
import { DisqusConfig, MdxPost } from '../types/app.types';
import { MdxFrontmatterGalleryImage, MdxNode } from '../types/base.types';
import PostTag from '../components/post-tag';
import { css } from '@emotion/core';
import CoverImage from '../components/cover-image';

interface PostContext {
  previous: MdxNode;
  next: MdxNode;
}

const Post = ({
  pageContext,
  data,
}: {
  pageContext: PostContext;
  data: MdxPost;
}) => {
  const pagination = {
    previous: pageContext.previous
      ? {
          slug: pageContext.previous.fields.slug,
          title: pageContext.previous.frontmatter.title,
        }
      : undefined,
    next: pageContext.next
      ? {
          slug: pageContext.next.fields.slug,
          title: pageContext.next.frontmatter.title,
        }
      : undefined,
  };

  const post = {
    title: data.post.frontmatter.title,
    url: data.site.siteMetadata.siteUrl,
    date: data.post.frontmatter.date,
    excerpt: data.post.excerpt,
    body: data.post.body,
    slug: data.post.fields.slug,
    tags: data.post.frontmatter.tags,
    categories: data.post.frontmatter.categories,
    featuredImage: data.post.frontmatter.featuredImage.childImageSharp.fluid,
    gallery: data.post.frontmatter.gallery
      ? data.post.frontmatter.gallery.map(
          (img: MdxFrontmatterGalleryImage) => ({
            src: img.childImageSharp.fluid.src,
            thumbnail: img.childImageSharp.fluid.src,
            thumbnailWidth: img.childImageSharp.fluid.presentationWidth,
            thumbnailHeight: img.childImageSharp.fluid.presentationHeight,
            nano: img.childImageSharp.fluid.base64,
            srcSet: img.childImageSharp.fluid.srcSet,
          })
        )
      : [],
  };

  const disqusShortname = process.env.GATSBY_DISQUS_NAME || 'disqusShortname';
  const disqusConfig: DisqusConfig = {
    identifier: post.slug,
    title: post.title,
    url: `${data.site.siteMetadata.siteUrl}/${post.slug}`,
  };

  const tagsStyle = css`
    padding: 0.5rem 0;
  `;

  const dateStyle = css`
    font-size: 0.8rem;
    padding: 0.5rem;
    text-align: right;
  `;

  const galleryContainerStyle = css`
    overflow: hidden;
    margin-bottom: 2rem;
  `;

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        pathname={post.slug}
        image={post.featuredImage.src}
        article={true}
      />
      <CoverImage image={post.featuredImage} title={post.title} />
      <div css={tagsStyle}>
        {post.categories.map((category: string) => (
          <PostTag type={'categories'} name={category} key={category} />
        ))}
        {post.tags.map((tag: string) => (
          <PostTag type={'tags'} name={tag} key={tag} />
        ))}
      </div>
      <div css={dateStyle}>
        <strong>Published</strong> {post.date}
      </div>

      <MDXRenderer>{post.body}</MDXRenderer>
      <h2>Gallery</h2>
      <div css={galleryContainerStyle}>
        <Gallery
          images={post.gallery}
          enableImageSelection={false}
          rowHeight={180}
          margin={2}
        />
      </div>

      <SimplePagination previous={pagination.previous} next={pagination.next} />
      <hr />
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

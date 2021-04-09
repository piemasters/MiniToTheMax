import React from 'react';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import SimplePagination from '../components/simple-pagination';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Gallery from '@browniebroke/gatsby-image-gallery';
import Seo from '../components/stateful/seo';
import { DiscussionEmbed } from 'disqus-react';
import { DisqusConfig, MdxPost } from '../types/app.types';
import { MdxFrontmatterGalleryImage, MdxNode } from '../types/base.types';
import PostTag from '../components/post-tag';
import { css } from '@emotion/react';
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
}): React.ReactNode => {
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
    imgPublicURL: data.post.frontmatter.featuredImage.publicURL,
    featuredImage:
      data.post.frontmatter.featuredImage.childImageSharp.gatsbyImageData,
    gallery: data.post.frontmatter.gallery
      ? data.post.frontmatter.gallery.map(
          (node: MdxFrontmatterGalleryImage) => node.childImageSharp
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
    padding: 1rem 0.5rem;
    text-align: right;
  `;

  const galleryContainerStyle = css`
    cursor: pointer;
    overflow: hidden;
    margin-bottom: 2rem;
  `;

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt}
        pathname={post.slug}
        image={post.imgPublicURL}
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
      {post.gallery.length > 0 && (
        <div>
          <h2>Gallery</h2>
          <div css={galleryContainerStyle}>
            <Gallery images={post.gallery} />
          </div>
        </div>
      )}

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
          publicURL
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        gallery {
          publicURL
          childImageSharp {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      body
    }
  }
`;

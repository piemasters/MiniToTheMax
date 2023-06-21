import React from 'react';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import SimplePagination from '../components/simple-pagination';
import Gallery from '@browniebroke/gatsby-image-gallery';
import Seo from '../components/stateful/seo';
import { DiscussionEmbed } from 'disqus-react';
import PostTag from '../components/post-tag';
import CoverImage from '../components/cover-image';

const Post = ({ pageContext, data, children }) => {
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
    body: children,
    slug: data.post.fields.slug,
    tags: data.post.frontmatter.tags,
    categories: data.post.frontmatter.categories,
    imgPublicURL: data.post.frontmatter.featuredImage.publicURL,
    featuredImage:
      data.post.frontmatter.featuredImage.childImageSharp.gatsbyImageData,
    gallery: data.post.frontmatter.gallery
      ? data.post.frontmatter.gallery.map((node) => node?.childImageSharp)
      : [],
  };

  const disqusShortname = process.env.GATSBY_DISQUS_NAME || 'disqusShortname';
  const disqusConfig = {
    identifier: post.slug,
    title: post.title,
    url: `${data.site.siteMetadata.siteUrl}/${post.slug}`,
  };

  return (
    <Layout>
      {post.featuredImage && (
        <CoverImage image={post.featuredImage} title={post.title} />
      )}
      <div
        style={{
          padding: '0.5rem 0',
        }}
      >
        {post.categories.map((category) => (
          <PostTag type={'categories'} name={category} key={category} />
        ))}
        {post.tags.map((tag) => (
          <PostTag type={'tags'} name={tag} key={tag} />
        ))}
      </div>
      <div
        style={{
          fontSize: ' 0.8rem',
          padding: '1rem 0.5rem',
          textAlign: 'right',
        }}
      >
        <strong>Published</strong> {post.date}
      </div>
      {post.body}
      {post.gallery.length > 0 && (
        <div>
          <h2>Gallery</h2>
          <div
            style={{
              cursor: 'pointer',
              overflow: 'hidden',
              marginBottom: '2rem',
            }}
          >
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

export const pageQuery = graphql`
  query ($slug: String!) {
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
    }
  }
`;

export const Head = ({ data }) => (
  <Seo
    title={data?.post?.frontmatter?.title}
    description={data?.post?.excerpt}
    pathname={data?.post?.fields?.slug}
    image={data?.post?.frontmatter?.featuredImage?.publicURL}
    article={true}
  />
);

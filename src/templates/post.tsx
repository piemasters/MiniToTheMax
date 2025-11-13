import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import Layout from '../layouts/layout';
import { CoverImage } from '../components/CoverImage/CoverImage';
import { Gallery } from '../components/Gallery/Gallery';
import { PostTag } from '../components/PostTag/PostTag';
import { SimplePagination } from '../components/SimplePagination/SimplePagination';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';

// @ts-expect-error build fails with types enabled
export const Post = ({ pageContext, data, children }) => {
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
      ? // @ts-expect-error build fails with types enabled
        data.post.frontmatter.gallery.map((node) => node?.childImageSharp)
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
      <div className="py-2">
        {/* @ts-expect-error build fails with types enabled */}
        {post.categories.map((category) => (
          <PostTag type={'categories'} name={category} key={category} />
        ))}
        {/* @ts-expect-error build fails with types enabled */}
        {post.tags.map((tag) => (
          <PostTag type={'tags'} name={tag} key={tag} />
        ))}
      </div>
      <div className="text-sm px-2 py-4 text-right">
        <strong>Published</strong> {post.date}
      </div>
      <div className="post-body">{post.body}</div>
      {post.gallery.length > 0 && (
        <div>
          <h2>Gallery</h2>
          <Gallery gallery={post.gallery} />
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
              width: 169
              height: 169
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

// @ts-expect-error build fails with types enabled
export const Head = ({ data }) => (
  <Seo
    title={data?.post?.frontmatter?.title}
    description={data?.post?.excerpt}
    pathname={data?.post?.fields?.slug}
    image={data?.post?.frontmatter?.featuredImage?.publicURL}
    article={true}
  />
);

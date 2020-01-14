import React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import { FluidObject } from 'gatsby-image';
import Layout from '../layouts/layout';
import Pagination from '../components/pagination';
import Seo from '../components/seo';
import PostSummary from '../components/post-summary';

interface PostContext {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
}

interface PostEdge {
  node: {
    excerpt: string;
    timeToRead: number;
    frontmatter: {
      title: string;
      date: string;
      featuredImage: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
    fields: {
      slug: string;
    };
  };
}

interface PostData {
  posts: {
    edges: PostEdge[];
  };
}

interface Post {
  slug: string;
  title: string;
  date: string;
  img: FluidObject;
  excerpt: string;
  timeToRead: number;
}

const Blog = ({
  data,
  pageContext,
}: {
  data: PostData;
  pageContext: PostContext;
}) => {
  const postsStyle = css`
    list-style-type: none;
    margin: 0;
  `;

  const page = {
    isFirst: pageContext.currentPage === 1,
    isLast: pageContext.currentPage === pageContext.numPages,
    prevPage:
      '/blog/' +
      (pageContext.currentPage - 1 === 1
        ? ''
        : (pageContext.currentPage - 1).toString()),
    nextPage: '/blog/' + (pageContext.currentPage + 1).toString(),
    numPages: pageContext.numPages,
    currentPage: pageContext.currentPage,
    baseUrl: '/blog/',
  };

  const posts: Post[] = data.posts.edges.map((edge: PostEdge) => ({
    slug: edge.node.fields.slug,
    title: edge.node.frontmatter.title,
    date: edge.node.frontmatter.date,
    img: edge.node.frontmatter.featuredImage.childImageSharp.fluid,
    excerpt: edge.node.excerpt,
    timeToRead: edge.node.timeToRead,
  }));

  return (
    <Layout>
      <Seo
        title={'Blog'}
        description={'Blog Posts'}
        pathname={`/blog/${page.currentPage}`}
      />
      <h1>Blog</h1>
      <ol css={postsStyle}>
        {posts.map((post: Post) => {
          return (
            <li key={post.slug}>
              <PostSummary
                date={post.date}
                img={post.img}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                timeToRead={post.timeToRead}
              />
            </li>
          );
        })}
      </ol>

      <Pagination
        isFirst={page.isFirst}
        isLast={page.isLast}
        prevPage={page.prevPage}
        nextPage={page.nextPage}
        numPages={page.numPages}
        currentPage={page.currentPage}
        baseUrl={page.baseUrl}
      />
    </Layout>
  );
};

export const postQuery = graphql`
  query blogPageQuery($skip: Int, $limit: Int) {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          timeToRead
          frontmatter {
            title
            date
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 300) {
                  ...GatsbyImageSharpFluid
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Blog;

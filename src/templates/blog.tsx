import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import Pagination from '../components/pagination';
import Seo from '../components/SEO';

const Blog = ({ data, pageContext }: { data: any; pageContext: any }) => {
  const posts = data.posts.edges;
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    '/blog/' + (currentPage - 1 === 1 ? '' : (currentPage - 1).toString());
  const nextPage = '/blog/' + (currentPage + 1).toString();

  const postsStyle = css`
    list-style-type: none;
    margin: 0;
  `;

  const postStyle = css`
    margin: 1rem 0;
  `;

  const postHeaderStyle = css`
    margin-bottom: 0;
  `;

  const postParagraphStyle = css`
    color: #777777;
    font-size: 0.8rem;
    font-style: italic;
  `;

  const postLinkStyle = css`
    background-color: #f4f4f4;
    color: #000000;
    display: block;
    padding: 1rem;
    text-decoration: none;
    &:hover {
      background-color: #e4e4e4;
    }
  `;

  return (
    <Layout>
      <Seo
        title={'Blog'}
        description={'Blog Posts'}
        pathname={`/blog/${currentPage}`}
      />
      <h1>Blog</h1>
      <ol css={postsStyle}>
        {posts.map((edge: any) => {
          return (
            <li css={postStyle} key={edge.node.fields.slug}>
              <Link css={postLinkStyle} to={edge.node.fields.slug}>
                <h2 css={postHeaderStyle}>{edge.node.frontmatter.title}</h2>
                <p css={postParagraphStyle}>{edge.node.frontmatter.date}</p>
                <Img
                  fluid={
                    edge.node.frontmatter.featuredImage
                      ? edge.node.frontmatter.featuredImage.childImageSharp
                          .fluid
                      : {
                          width: 0,
                          height: 0,
                          src: '',
                          srcSet: null,
                        }
                  }
                />
              </Link>
            </li>
          );
        })}
      </ol>

      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
        numPages={numPages}
        currentPage={currentPage}
        baseUrl={'/blog/'}
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
          frontmatter {
            title
            date
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 300) {
                  ...GatsbyImageSharpFluid
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

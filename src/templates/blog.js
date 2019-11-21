import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import blogStyles from '../pages/blog.module.scss';
import Head from '../components/head';
import Img from "gatsby-image"

const Blog = ({data, pageContext}) => {

    const posts = data.posts.edges;
    const { currentPage, numPages } = pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = '/blog/' + (currentPage - 1 === 1 ? '' : (currentPage - 1).toString());
    const nextPage = '/blog/' + ((currentPage + 1).toString());

    return (
      <Layout>
        <Head title="Blog"/>
        <h1>Blog</h1>
        <ol className={blogStyles.posts}>
          {posts.map(edge => {
            return (
              <li className={blogStyles.post} key={edge.node.fields.slug}>
                <Link to={edge.node.fields.slug}>
                  <h2>{edge.node.frontmatter.title}</h2>
                  <p>{edge.node.frontmatter.date}</p>
                  <Img
                    fluid={edge.node.frontmatter.featuredImage ? edge.node.frontmatter.featuredImage.childImageSharp.fluid : {
                      width: 0,
                      height: 0,
                      src: "",
                      srcSet: null
                    }}/>
                </Link>
              </li>
            );
          })}
        </ol>
          <ul
              style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  listStyle: 'none',
                  padding: 0,
              }}
          >
              {!isFirst && (
                  <Link to={prevPage} rel="prev">
                      ← Previous Page
                  </Link>
              )}
              {Array.from({ length: numPages }, (_, i) => (
                  <li
                      key={`pagination-number${i + 1}`}
                      style={{
                          margin: 0,
                      }}
                  >
                      <Link
                          to={`/posts/${i === 0 ? '' : i + 1}`}
                          style={{
                              textDecoration: 'none',
                              color: i + 1 === currentPage ? '#ffffff' : '',
                              background: i + 1 === currentPage ? '#007acc' : '',
                          }}
                      >
                          {i + 1}
                      </Link>
                  </li>
              ))}
              {!isLast && (
                  <Link to={nextPage} rel="next">
                      Next Page →
                  </Link>
              )}
          </ul>
      </Layout>
    );
};

export const postQuery = graphql`
    query blogPageQuery($skip: Int, $limit: Int) {
        posts: allMarkdownRemark(
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

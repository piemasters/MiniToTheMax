import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import blogStyles from './blog.module.scss';
import Head from '../components/head';
import Img from "gatsby-image"

const BlogPage = ({data, pageContext}) => {
    // const postQuery = graphql`
    //     query blogPageQuery($skip: Int!, $limit: Int!) {
    //         allMarkdownRemark(
    //             sort: { fields: [frontmatter___date], order: DESC }
    //             limit: $limit
    //             skip: $skip
    //         ) {
    //             edges {
    //                 node {
    //                     frontmatter {
    //                         title
    //                         date
    //                         featuredImage {
    //                             childImageSharp {
    //                                 fluid(maxWidth: 800, maxHeight: 300) {
    //                                     ...GatsbyImageSharpFluid
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     fields {
    //                         slug
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `;

    console.log("DATA: ", data);
    console.log("PROPS: ", pageContext);

    const posts = data.posts.edges;
    //const { data } = props;
    //const posts = data.allMarkdownRemark.edges;
    // const { currentPage, numPages } = this.props.pageContext;
    // const isFirst = currentPage === 1;
    // const isLast = currentPage === numPages;
    // const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
    // const nextPage = (currentPage + 1).toString();

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

export default BlogPage;

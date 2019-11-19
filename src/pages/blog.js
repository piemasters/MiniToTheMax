import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import blogStyles from './blog.module.scss';
import Head from '../components/head';
import Img from "gatsby-image"

const BlogPage = (props) => {
  const data = graphql`
    query blogListQuery($skip: Int!, $limit: Int!) {
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
  console.log(props)
    console.log(data)

  return (
    <Layout>
      <Head title="Blog" />
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {data.posts.edges.map(edge => {
          return (
            <li className={blogStyles.post} key={edge.node.fields.slug}>
              <Link to={edge.node.fields.slug}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.date}</p>
                  <Img fluid={edge.node.frontmatter.featuredImage ? edge.node.frontmatter.featuredImage.childImageSharp.fluid : {width: 0, height: 0, src:"", srcSet:null}} />
              </Link>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogPage;

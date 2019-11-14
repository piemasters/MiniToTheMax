import React from 'react';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import Head from '../components/head';

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        tags
      }
      html
    }
  }
`;

const Blog = props => {
  return (
    <Layout>
      <Head title={props.data.markdownRemark.frontmatter.title} />
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <p>{props.data.markdownRemark.frontmatter.date}</p>
      <p>{props.data.markdownRemark.frontmatter.tags}</p>
      <img src={props.data.markdownRemark.frontmatter.featuredImage} alt="" />
      <div
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
    </Layout>
  );
};

export default Blog;

import React from 'react';
import Layout from '../layouts/layout';
import {graphql} from 'gatsby';
import Head from '../components/head';
import Img from "gatsby-image"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        tags
          featuredImage {
              childImageSharp {
                  fluid(maxWidth: 800, maxHeight: 400) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
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
        <Img fluid={props.data.markdownRemark.frontmatter.featuredImage ? props.data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid : {width: 0, height: 0, src:"", srcSet:null}} />
        <br/>
        <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
    </Layout>
  );
};

export default Blog;

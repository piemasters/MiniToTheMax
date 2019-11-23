import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import Head from '../components/head';
import Img from 'gatsby-image';
import { kebabCase } from 'lodash';
import SimplePagination from '../components/simple-pagination';

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
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

const Post = (props: any) => {
  const post = props.data.post;
  const { previous, next } = props.pageContext;

  return (
    <Layout>
      <Head title={post.frontmatter.title} />
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <Img
        fluid={
          post.frontmatter.featuredImage
            ? post.frontmatter.featuredImage.childImageSharp.fluid
            : { width: 0, height: 0, src: '', srcSet: null }
        }
      />
      <br />

      {post.frontmatter.tags.map((tag: any) => (
        <Link key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Link>
      ))}

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <SimplePagination previous={previous} next={next} />
    </Layout>
  );
};

export default Post;

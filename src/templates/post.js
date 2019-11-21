import React from 'react';
import Layout from '../layouts/layout';
import { Link, graphql } from 'gatsby';
import Head from '../components/head';
import Img from "gatsby-image"

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

const Post = props => {
    const post = props.data.post;
    const { previous, next } = props.pageContext;
    return (
        <Layout>
            <Head title={post.frontmatter.title} />
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
            <Img fluid={post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp.fluid : {width: 0, height: 0, src:"", srcSet:null}} />
            <br/>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            <ul
                style={{
                    display: `flex`,
                    flexWrap: `wrap`,
                    justifyContent: `space-between`,
                    listStyle: `none`,
                    padding: 0,
                }}
            >
                <li>
                    {previous && (
                        <Link to={previous.fields.slug} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next && (
                        <Link to={next.fields.slug} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </ul>
        </Layout>
    );
};

export default Post;

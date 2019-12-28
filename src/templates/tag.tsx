import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import Layout from '../layouts/layout';

const Tag = ({ pageContext, data }: { pageContext: any; data: any }) => {
  const { tag, url } = pageContext;
  const { edges, totalCount } = data.tags;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;
  return (
    <Layout>
      <Seo title={tag} pathname={url} description={tagHeader} />
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }: { node: any }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <PageLink to={slug} type={'cover'} direction={'up'}>
                {title}
              </PageLink>
            </li>
          );
        })}
      </ul>
      <PageLink to="/tags" type={'cover'} direction={'up'}>
        All tags
      </PageLink>
    </Layout>
  );
};
Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};
export default Tag;
export const pageQuery = graphql`
  query($tag: String) {
    tags: allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

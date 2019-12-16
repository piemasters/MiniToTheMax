import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Link, graphql } from 'gatsby';
const Category = ({ pageContext, data }: { pageContext: any; data: any }) => {
  const { category } = pageContext;
  const { edges, totalCount } = data.categories;
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${category}"`;
  return (
    <div>
      <h1>{categoryHeader}</h1>
      <ul>
        {edges.map(({ node }: { node: any }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
      <Link to="/categories">All categories</Link>
    </div>
  );
};
Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
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
export default Category;
export const pageQuery = graphql`
  query($category: String) {
    categories: allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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

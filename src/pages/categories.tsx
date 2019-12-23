import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Seo from '../components/seo';

const CategoriesPage = ({
  data: {
    allMdx: { group },
  },
}: {
  data: any;
}) => (
  <div>
    <Seo
      title={'Categories'}
      description={'All blog categories'}
      pathname={'/categories'}
    />
    <div>
      <h1>Categories</h1>
      <ul>
        {group.map((category: any) => (
          <li key={category.fieldValue}>
            <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
CategoriesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
};
export default CategoriesPage;
export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;

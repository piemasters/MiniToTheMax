import React from 'react';
import { kebabCase } from 'lodash';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import PageLink from '../components/page-link';

interface CategoryDataType {
  allMdx: {
    group: {
      fieldValue: string;
      totalCount: string;
    }[];
  };
}

const CategoriesPage = ({
  data: {
    allMdx: { group },
  },
}: {
  data: CategoryDataType;
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
            <PageLink
              to={`/categories/${kebabCase(category.fieldValue)}/`}
              type={'cover'}
              direction={'up'}
            >
              {category.fieldValue} ({category.totalCount})
            </PageLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

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

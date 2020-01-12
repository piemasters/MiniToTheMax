import React from 'react';
import { kebabCase } from 'lodash';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import PageLink from '../components/page-link';

interface TagDataType {
  fieldValue: string;
  totalCount: string;
}

interface TagGroupDataType {
  allMdx: {
    group: TagDataType[];
  };
}

const TagsPage = ({
  data: {
    allMdx: { group },
  },
}: {
  data: TagGroupDataType;
}) => (
  <div>
    <Seo title={'Tags'} description={'All blog tags'} pathname={'/tags'} />
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map((tag: TagDataType) => (
          <li key={tag.fieldValue}>
            <PageLink
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
              type={'cover'}
              direction={'up'}
            >
              {tag.fieldValue} ({tag.totalCount})
            </PageLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

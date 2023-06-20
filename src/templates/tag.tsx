import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';
import Layout from '../layouts/layout';
import { TagLink, Tags } from '../types/app.types';
import { MdxEdge } from '../types/base.types';

interface TagContext {
  tag: string;
  url: string;
}

const Tag = ({
  pageContext,
  data,
}: {
  pageContext: TagContext;
  data: Tags;
}): React.ReactNode => {
  const tagHeader = `${data.tags.totalCount} post${
    data.tags.totalCount === 1 ? '' : 's'
  } tagged with "${pageContext.tag}"`;

  const tags: TagLink[] = data.tags.edges.map((edge: MdxEdge) => ({
    slug: edge.node.fields.slug,
    title: edge.node.frontmatter.title,
  }));

  return (
    <Layout>
      <Seo
        title={pageContext.tag}
        pathname={pageContext.url}
        description={tagHeader}
      />
      <h1>{tagHeader}</h1>
      <ul>
        {tags.map((tag: TagLink) => {
          return (
            <li key={tag.slug}>
              <PageLink to={tag.slug} type={'cover'} direction={'up'}>
                {tag.title}
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

export default Tag;

export const pageQuery = graphql`
  query ($tag: String) {
    tags: allMdx(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { published: { eq: true }, tags: { in: [$tag] } } }
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

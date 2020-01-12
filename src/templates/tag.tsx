import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import Layout from '../layouts/layout';

interface TagContext {
  tag: string;
  url: string;
}

interface TagEdge {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
}

interface TagData {
  tags: {
    totalCount: number;
    edges: TagEdge[];
  };
}

interface Tag {
  slug: string;
  title: string;
}

const Tag = ({
  pageContext,
  data,
}: {
  pageContext: TagContext;
  data: TagData;
}) => {
  const tagHeader = `${data.tags.totalCount} post${
    data.tags.totalCount === 1 ? '' : 's'
  } tagged with "${pageContext.tag}"`;

  const tags: Tag[] = data.tags.edges.map((edge: TagEdge) => ({
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
        {tags.map((tag: Tag) => {
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

import { FC } from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import { PageLink } from '../components/PageLink/PageLink';
import { AllMdx, MdxEdge } from '../types';

type TagLink = {
  slug: string;
  title: string;
};

type TagContext = {
  tag: string;
  url: string;
};

export const Tag: FC<{
  pageContext: TagContext;
  data: {
    tags: AllMdx;
  };
}> = ({ pageContext, data }) => {
  const tagHeader = `${data.tags.totalCount} post${
    data.tags.totalCount === 1 ? '' : 's'
  } tagged with "${pageContext.tag}"`;

  const tags: TagLink[] = data.tags.edges.map((edge: MdxEdge) => ({
    slug: edge.node.fields.slug,
    title: edge.node.frontmatter.title,
  }));

  return (
    <Layout>
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

export const Head = ({ pageContext }: { pageContext: TagContext }) => (
  <Seo
    title={pageContext?.tag}
    pathname={pageContext?.url}
    description={pageContext?.tag}
  />
);

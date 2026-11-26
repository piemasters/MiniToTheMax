import { graphql, type PageProps } from 'gatsby';
import { type ReactNode, StrictMode } from 'react';
import Layout from '../layouts/layout';
import { PaintsExplorer } from '../components/PaintFilters/PaintsExplorer';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import type { PaintPostNode } from '../util/paints/paintPosts';

interface PaintsPageData {
  posts: { nodes: PaintPostNode[] };
}

export const Paints = ({
  data,
}: Partial<PageProps<PaintsPageData>>): ReactNode => (
  <StrictMode>
    <Layout wide>
      <PaintsExplorer posts={data?.posts.nodes} />
    </Layout>
  </StrictMode>
);

export default Paints;

// Which posts show which paints, for each paint's details
export const query = graphql`
  query PaintsPage {
    posts: allMdx(sort: { frontmatter: { date: DESC } }, limit: 2000) {
      nodes {
        fields {
          slug
        }
        paintReferences
        frontmatter {
          title
          published
        }
      }
    }
  }
`;

export const Head = () => <Seo title={'Paints'} pathname={'/paints'} />;

import { FC } from 'react';
import { graphql } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Layout from '../layouts/layout';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import { CoverCategory } from '../components/CoverCategory/CoverCategory';

type BattleReports = {
  fortyThousand: IGatsbyImageData;
};

export const BattleReportsPage: FC<{
  data: BattleReports;
}> = ({ data }) => {
  const categories = [
    {
      title: '40k',
      slug: '/battle-reports/40k',
      img: getImage(data.fortyThousand),
    },
  ];
  return (
    <Layout>
      <h1>Battle Reports</h1>
      {categories.map((category) => {
        return (
          <CoverCategory
            key={category.title}
            img={category.img}
            slug={category.slug}
            title={category.title}
          />
        );
      })}
    </Layout>
  );
};

export default BattleReportsPage;

export const pageQuery = graphql`
  query {
    fortyThousand: file(
      relativePath: {
        eq: "battle-reports/40k/grey-knights-vs-eldar/grey-knights-vs-eldar-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title={'Battle Reports'}
    description={'Reports on games of warhammer'}
    pathname={'/battle-reports'}
  />
);

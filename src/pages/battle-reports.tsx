import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import { graphql } from 'gatsby';
import { BattleReports } from '../types/app.types';
import CoverCategory from '../components/cover-category';
import { getImage } from 'gatsby-plugin-image';

const BattleReportsPage = ({
  data,
}: {
  data: BattleReports;
}): React.ReactNode => {
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

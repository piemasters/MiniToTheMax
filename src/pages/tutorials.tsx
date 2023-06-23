import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import Layout from '../layouts/layout';
import { CoverCategory, StatefulSeo as Seo } from '../components';
import { Tutorials } from '../types';

export interface TutorialsPageProps {
  data: Tutorials;
}

export const TutorialsPage: FC<TutorialsPageProps> = ({ data }) => {
  const categories = [
    {
      title: '40k',
      slug: '/tutorials/40k',
      img: getImage(data.fortyThousand),
    },
    {
      title: 'Bases',
      slug: '/tutorials/bases',
      img: getImage(data.bases),
    },
    {
      title: 'Scenery',
      slug: '/tutorials/scenery',
      img: getImage(data.scenery),
    },
    {
      title: 'Tools',
      slug: '/tutorials/tools',
      img: getImage(data.tools),
    },
  ];

  return (
    <Layout>
      <h1>Tutorials</h1>

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

export default TutorialsPage;

export const pageQuery = graphql`
  query {
    fortyThousand: file(
      relativePath: {
        eq: "tutorials/40k/force-weapons/force-weapons-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    bases: file(
      relativePath: { eq: "tutorials/bases/snow-bases/snow-bases-cover.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    scenery: file(
      relativePath: {
        eq: "tutorials/scenery/battle-boards/battle-boards-tutorial-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    tools: file(
      relativePath: {
        eq: "tutorials/tools/paint-stripping/paint-stripping-cover.jpg"
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
    title={'Tutorials'}
    description={'Tutorials for different parts of the hobby'}
    pathname={'/tutorials'}
  />
);

import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import CoverCategory from '../components/cover-category';
import { graphql } from 'gatsby';
import { Tutorials } from '../types/app.types';

const TutorialsPage = ({ data }: { data: Tutorials }): React.ReactNode => {
  const categories = [
    {
      title: '40k',
      slug: '/tutorials/40k',
      img: data.fortyThousand.childImageSharp.gatsbyImageData,
    },
    {
      title: 'Bases',
      slug: '/tutorials/bases',
      img: data.bases.childImageSharp.gatsbyImageData,
    },
    {
      title: 'Scenery',
      slug: '/tutorials/scenery',
      img: data.scenery.childImageSharp.gatsbyImageData,
    },
    {
      title: 'Tools',
      slug: '/tutorials/tools',
      img: data.tools.childImageSharp.gatsbyImageData,
    },
  ];

  return (
    <Layout>
      <Seo
        title={'Tutorials'}
        description={'Tutorials for different parts of the hobby'}
        pathname={'/tutorials'}
      />

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

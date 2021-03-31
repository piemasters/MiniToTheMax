import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import CoverCategory from '../components/cover-category';
import { graphql } from 'gatsby';
import { Showcase } from '../types/app.types';

const ShowcasePage = ({ data }: { data: Showcase }): React.ReactNode => {
  const categories = [
    {
      title: 'Board Games',
      slug: '/showcase/board-games',
      img: data.boardGames.childImageSharp.gatsbyImageData,
    },
    {
      title: 'Gloomspite Gitz',
      slug: '/showcase/gloomspite-gitz',
      img: data.gloomspiteGitz.childImageSharp.gatsbyImageData,
    },
    {
      title: 'Grey Knights',
      slug: '/showcase/grey-knights',
      img: data.greyKnights.childImageSharp.gatsbyImageData,
    },
    {
      title: 'Orks',
      slug: '/showcase/orks',
      img: data.orks.childImageSharp.gatsbyImageData,
    },

    {
      title: 'Scenery',
      slug: '/showcase/scenery',
      img: data.scenery.childImageSharp.gatsbyImageData,
    },
    {
      title: 'Space Wolves',
      slug: '/showcase/space-wolves',
      img: data.spaceWolves.childImageSharp.gatsbyImageData,
    },
  ];

  return (
    <Layout>
      <Seo
        title={'Showcase'}
        description={'Showcase of completed miniatures'}
        pathname={'/showcase'}
      />

      <h1>Showcase</h1>

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

export default ShowcasePage;

export const pageQuery = graphql`
  query {
    boardGames: file(
      relativePath: {
        eq: "showcase/board-games/silver-tower/silver-tower-complete/Silver Tower Cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    gloomspiteGitz: file(
      relativePath: {
        eq: "showcase/gloomspite-gitz/spearmen/gloomspite-spearmen-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    greyKnights: file(
      relativePath: {
        eq: "showcase/grey-knights/librarian/grey-knight-librarian-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    orks: file(
      relativePath: { eq: "showcase/orks/gretchin/gretchin-cover.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    scenery: file(
      relativePath: {
        eq: "showcase/scenery/iron-battlefield/iron-battlefield-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    spaceWolves: file(
      relativePath: {
        eq: "showcase/space-wolves/grey-hunters/grey-hunters-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
`;

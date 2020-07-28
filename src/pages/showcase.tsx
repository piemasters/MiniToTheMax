import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import ShowcaseCategory from '../components/showcase-category';
import { graphql } from 'gatsby';
import { Showcase } from '../types/app.types';

const ShowcasePage = ({ data }: { data: Showcase }) => {
  const categories = [
    {
      title: 'Board Games',
      slug: '/showcase/board-games',
      img: data.boardGames.childImageSharp.fluid,
    },
    {
      title: 'Gloomspite Gitz',
      slug: '/showcase/gloomspite-gitz',
      img: data.gloomspiteGitz.childImageSharp.fluid,
    },
    {
      title: 'Grey Knights',
      slug: '/showcase/grey-knights',
      img: data.greyKnights.childImageSharp.fluid,
    },
    {
      title: 'Orks',
      slug: '/showcase/orks',
      img: data.orks.childImageSharp.fluid,
    },

    {
      title: 'Scenery',
      slug: '/showcase/scenery',
      img: data.scenery.childImageSharp.fluid,
    },
    {
      title: 'Space Wolves',
      slug: '/showcase/space-wolves',
      img: data.spaceWolves.childImageSharp.fluid,
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
          <ShowcaseCategory
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
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    gloomspiteGitz: file(
      relativePath: {
        eq: "showcase/gloomspite-gitz/spearmen/gloomspite-spearmen-cover.jpg"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    greyKnights: file(
      relativePath: {
        eq: "showcase/grey-knights/librarian/grey-knight-librarian-cover.jpg"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    orks: file(
      relativePath: { eq: "showcase/orks/gretchin/gretchin-cover.jpg" }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    scenery: file(
      relativePath: {
        eq: "showcase/scenery/iron-battlefield/iron-battlefield-cover.jpg"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    spaceWolves: file(
      relativePath: {
        eq: "showcase/space-wolves/grey-hunters/grey-hunters-cover.jpg"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

import { FC } from 'react';
import { graphql } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Layout from '../layouts/layout';
import { CoverCategory } from '../components/CoverCategory/CoverCategory';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';

type Tutorials = {
  fortyThousand: IGatsbyImageData;
  bases: IGatsbyImageData;
  general: IGatsbyImageData;
  scenery: IGatsbyImageData;
  tools: IGatsbyImageData;
};

export const TutorialsPage: FC<{
  data: Tutorials;
}> = ({ data }) => {
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
      title: 'General',
      slug: '/tutorials/general',
      img: getImage(data.general),
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
    general: file(
      relativePath: { eq: "tutorials/general/weathering/weathering-cover.jpg" }
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

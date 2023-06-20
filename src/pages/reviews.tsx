import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import { graphql } from 'gatsby';
import { Reviews } from '../types/app.types';
import CoverCategory from '../components/cover-category';
import { getImage } from 'gatsby-plugin-image';

const ReviewsPage = ({ data }: { data: Reviews }): React.ReactNode => {
  const categories = [
    {
      title: 'Board Games',
      slug: '/reviews/board-games',
      img: getImage(data.boardGames),
    },
    {
      title: 'Books',
      slug: '/reviews/books',
      img: getImage(data.books),
    },
    {
      title: 'Tools',
      slug: '/reviews/tools',
      img: getImage(data.tools),
    },
  ];

  return (
    <Layout>
      <h1>Reviews</h1>
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

export default ReviewsPage;

export const pageQuery = graphql`
  query {
    boardGames: file(
      relativePath: {
        eq: "reviews/board-games/lost-patrol/lost-patrol-review-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    books: file(
      relativePath: {
        eq: "reviews/books/arjac-rockfist/arjac-rockfist-book-cover.jpg"
      }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
    tools: file(
      relativePath: { eq: "reviews/tools/instant-mold/instantmold-cover.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title={'Reviews'}
    description={'Reviews of different hobby products'}
    pathname={'/reviews'}
  />
);

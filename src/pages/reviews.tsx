import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import PageLink from '../components/page-link';

const ReviewsPage = () => {
  return (
    <Layout>
      <Seo
        title={'Reviews'}
        description={'Reviews of different hobby products'}
        pathname={'/reviews'}
      />

      <h1>Reviews</h1>
      <li>
        <PageLink to={`/reviews/board-games`} type={'cover'} direction={'up'}>
          Board Games
        </PageLink>
      </li>
      <li>
        <PageLink to={`/reviews/books`} type={'cover'} direction={'up'}>
          Books
        </PageLink>
      </li>
      <li>
        <PageLink to={`/reviews/tools`} type={'cover'} direction={'up'}>
          Tools
        </PageLink>
      </li>
    </Layout>
  );
};

export default ReviewsPage;

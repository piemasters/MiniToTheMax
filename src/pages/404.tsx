import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';

const NotFound = (): React.ReactNode => {
  return (
    <Layout>
      <h1>Page not found</h1>
      <p>
        <PageLink type={'paintDrip'} to="/">
          Head home
        </PageLink>
      </p>
    </Layout>
  );
};

export default NotFound;

export const Head = () => <Seo title={'404'} pathname={'/404'} />;

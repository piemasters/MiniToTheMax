import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layouts/layout';
import Seo from '../components/SEO';

const NotFound = () => {
  return (
    <Layout>
      <Seo title={'404'} pathname={'/404'} />
      <h1>Page not found</h1>
      <p>
        <Link to="/">Head home</Link>
      </p>
    </Layout>
  );
};

export default NotFound;

import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/SEO';

const IndexPage = () => {
  return (
    <Layout>
      <Seo />
      <h1>Hello</h1>
      <h2>This is a test sentence</h2>
    </Layout>
  );
};

export default IndexPage;

import React from 'react';
import Layout from '../layouts/layout';
import Head from '../components/head';

const IndexPage = () => {
  return (
    <Layout>
      <Head title="Home" />
      <h1>Hello</h1>
      <h2>This is a test sentence</h2>
    </Layout>
  );
};

export default IndexPage;

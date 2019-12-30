import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';

const BacklogPage = () => {
  return (
    <Layout>
      <Seo
        title={'Backlog'}
        description={'My backlog of miniatures still to paint'}
        pathname={'/backlog'}
      />
      <h1>Backlog</h1>
      <p>Content will show up here</p>
    </Layout>
  );
};

export default BacklogPage;

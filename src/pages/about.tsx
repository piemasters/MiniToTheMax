import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/SEO';

const AboutPage = () => {
  return (
    <Layout>
      <Seo
        title={'About'}
        description={'About MiniToTheMax'}
        pathname={'/about'}
      />

      <h1>About</h1>
      <p>Content will show up here</p>
    </Layout>
  );
};

export default AboutPage;

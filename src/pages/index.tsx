import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import Video from '../components/video';

const IndexPage = () => {
  return (
    <Layout>
      <Seo />
      <h1>Hello</h1>
      <h2>Latest Video</h2>
      <Video
        src="https://www.youtube.com/embed/R0yWxR0tras"
        title="Grey Knight Stormraven"
      />
    </Layout>
  );
};

export default IndexPage;

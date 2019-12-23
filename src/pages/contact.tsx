import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';

const ContactPage = () => {
  return (
    <Layout>
      <Seo
        title={'Contact'}
        description={'Contact Me!'}
        pathname={'/contact'}
      />
      <h1>Contact</h1>
      <p>Content will show up here</p>
    </Layout>
  );
};

export default ContactPage;

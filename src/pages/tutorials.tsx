import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import PageLink from '../components/page-link';

const TutorialsPage = () => {
  return (
    <Layout>
      <Seo
        title={'Tutorials'}
        description={'Tutorials for different parts of the hobby'}
        pathname={'/tutorials'}
      />

      <h1>Tutorials</h1>
      <li>
        <PageLink to={`/tutorials/40k`} type={'cover'} direction={'up'}>
          40k
        </PageLink>
      </li>
      <li>
        <PageLink to={`/tutorials/bases`} type={'cover'} direction={'up'}>
          Bases
        </PageLink>
      </li>
      <li>
        <PageLink to={`/tutorials/scenery`} type={'cover'} direction={'up'}>
          Scenery
        </PageLink>
      </li>
      <li>
        <PageLink to={`/tutorials/tools`} type={'cover'} direction={'up'}>
          Tools
        </PageLink>
      </li>
    </Layout>
  );
};

export default TutorialsPage;

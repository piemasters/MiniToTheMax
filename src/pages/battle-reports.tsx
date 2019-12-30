import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import PageLink from '../components/page-link';

const BattleReportsPage = () => {
  return (
    <Layout>
      <Seo
        title={'Battle Reports'}
        description={'Reports on games of warhammer'}
        pathname={'/battle-reports'}
      />

      <h1>Battle Reports</h1>
      <li>
        <PageLink to={`/battle-reports/40k`} type={'cover'} direction={'up'}>
          40k
        </PageLink>
      </li>
    </Layout>
  );
};

export default BattleReportsPage;

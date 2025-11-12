import { FC } from 'react';
import Layout from '../layouts/layout';
import { PageLink } from '../components/PageLink/PageLink';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';

export const UpdatesPage: FC = () => {
  return (
    <Layout>
      <h1>Updates</h1>
      <li>
        <PageLink to={`/updates/2013`} type={'cover'} direction={'up'}>
          2013
        </PageLink>
      </li>
      <li>
        <PageLink to={`/updates/2014`} type={'cover'} direction={'up'}>
          2014
        </PageLink>
      </li>
      <li>
        <PageLink to={`/updates/2015`} type={'cover'} direction={'up'}>
          2015
        </PageLink>
      </li>
    </Layout>
  );
};

export default UpdatesPage;

export const Head = () => (
  <Seo
    title={'Updates'}
    description={"Quick updates on what I'm currently working on"}
    pathname={'/updates'}
  />
);

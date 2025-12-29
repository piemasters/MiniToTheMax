import { FC } from 'react';
import { Layout } from '../layouts/layout';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import { PageLink } from '../components/PageLink/PageLink';

const NotFound: FC = () => {
  return (
    <Layout>
      <h1>Page not found</h1>
      <p>
        <PageLink type={'paintDrip'} to="/">
          Head home
        </PageLink>
      </p>
    </Layout>
  );
};

export default NotFound;

export const Head = () => <Seo title={'404'} pathname={'/404'} />;

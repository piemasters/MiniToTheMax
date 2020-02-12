import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/seo';
import PageLink from '../components/page-link';
import ShowcaseCategory from '../components/showcase-category';

const ShowcasePage = () => {
  return (
    <Layout>
      <Seo
        title={'Showcase'}
        description={'Showcase of completed miniatures'}
        pathname={'/showcase'}
      />

      <h1>Showcase</h1>

      <ShowcaseCategory
        img={`content/assets/images/icon.png`}
        slug={`/showcase/board-games`}
        title={`Board Games`}
      />

      <li>
        <PageLink to={`/showcase/board-games`} type={'cover'} direction={'up'}>
          Board Games
        </PageLink>
      </li>

      <li>
        <PageLink
          to={`/showcase/gloomspite-gitz`}
          type={'cover'}
          direction={'up'}
        >
          Gloomspite Gitz
        </PageLink>
      </li>
      <li>
        <PageLink to={`/showcase/grey-knights`} type={'cover'} direction={'up'}>
          Grey Knights
        </PageLink>
      </li>
      <li>
        <PageLink to={`/showcase/orks`} type={'cover'} direction={'up'}>
          Orks
        </PageLink>
      </li>
      <li>
        <PageLink to={`/showcase/scenery`} type={'cover'} direction={'up'}>
          Scenery
        </PageLink>
      </li>
      <li>
        <PageLink to={`/showcase/space-wolves`} type={'cover'} direction={'up'}>
          Space Wolves
        </PageLink>
      </li>
    </Layout>
  );
};

export default ShowcasePage;

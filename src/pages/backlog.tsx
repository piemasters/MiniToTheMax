import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';
import {
  blackstoneFortress,
  bloodBowl,
  chaosSpaceMarines,
  darkAngels,
  deathwatchOverkill,
  dreadfleet,
  dungeonBowl,
  executionForce,
  gloomspiteGitz,
  gorechosen,
  greyKnights,
  harlequins,
  heroQuest,
  heroQuestFrozenHorror,
  heroQuestKellarsKeep,
  heroQuestReturnOfTheWitchLord,
  ironjawz,
  kruleboyz,
  lostPatrol,
  malignSorcery,
  objectives,
  orks,
  scenery40k,
  sceneryAoS,
  silverTower,
  spaceHulk,
  spaceWolves,
  spaceWolvesPrimaris,
  underworlds,
} from '../data/backlog';

export interface BacklogEntry {
  name: string;
  link?: string;
}

const BacklogPage = (): React.ReactNode => {
  const generateEntries = (entries: BacklogEntry[]) => {
    entries.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    const domList: React.ReactNode[] = [];

    for (const [index, value] of entries.entries()) {
      if (value.link) {
        domList.push(
          <li key={index} style={{ listStyleType: 'none' }}>
            <label>
              <input
                type="checkbox"
                checked
                onChange={() => {
                  /*do nothing */
                }}
              />{' '}
              <PageLink to={value.link} type={'cover'} direction={'up'}>
                {value.name}
              </PageLink>
            </label>
          </li>
        );
      } else {
        domList.push(
          <li key={index} style={{ listStyleType: 'none' }}>
            <label>
              <input
                type="checkbox"
                checked={false}
                onChange={() => {
                  /*do nothing */
                }}
              />{' '}
              {value.name}
            </label>
          </li>
        );
      }
    }
    return domList;
  };

  return (
    <Layout>
      <h1>Backlog</h1>

      <h2>40k</h2>
      <hr />

      <h3>Grey Knights</h3>
      <ul>{generateEntries(greyKnights)}</ul>

      <h3>Space Wolves</h3>
      <ul>{generateEntries(spaceWolves)}</ul>
      <ul>{generateEntries(spaceWolvesPrimaris)}</ul>

      <h3>Dark Angels</h3>
      <ul>{generateEntries(darkAngels)}</ul>

      <h3>Orks</h3>
      <ul>{generateEntries(orks)}</ul>

      <h3>Harlequins</h3>
      <ul>{generateEntries(harlequins)}</ul>

      <h3>Chaos Space Marines</h3>
      <ul>{generateEntries(chaosSpaceMarines)}</ul>

      <h3>Scenery</h3>
      <ul>{generateEntries(scenery40k)}</ul>

      <h2>Age of Sigmar</h2>
      <hr />

      <h3>Gloomspite Gitz</h3>
      <ul>{generateEntries(gloomspiteGitz)}</ul>

      <h3>Ironjawz</h3>
      <ul>{generateEntries(ironjawz)}</ul>

      <h3>Kruleboyz</h3>
      <ul>{generateEntries(kruleboyz)}</ul>

      <h3>Malign Sorcery</h3>
      <ul>{generateEntries(malignSorcery)}</ul>

      <h3>Objectives</h3>
      <ul>{generateEntries(objectives)}</ul>

      <h3>Scenery</h3>
      <ul>{generateEntries(sceneryAoS)}</ul>

      <h2>Board Games 40k</h2>
      <hr />

      <h3>Blackstone Fortress</h3>
      <ul>{generateEntries(blackstoneFortress)}</ul>

      <h3>Deathwatch Overkill</h3>
      <ul>{generateEntries(deathwatchOverkill)}</ul>

      <h3>Execution Force</h3>
      <ul>{generateEntries(executionForce)}</ul>

      <h3>Lost Patrol</h3>
      <ul>{generateEntries(lostPatrol)}</ul>

      <h3>Space Hulk</h3>
      <ul>{generateEntries(spaceHulk)}</ul>

      <h2>Board Games Age of Sigmar</h2>
      <hr />

      <h3>Blood Bowl</h3>
      <ul>{generateEntries(bloodBowl)}</ul>

      <h3>Dreadfleet</h3>
      <ul>{generateEntries(dreadfleet)}</ul>

      <h3>Dungeon Bowl</h3>
      <ul>{generateEntries(dungeonBowl)}</ul>

      <h3>Gorechosen</h3>
      <ul>{generateEntries(gorechosen)}</ul>

      <h3>Silver Tower</h3>
      <ul>{generateEntries(silverTower)}</ul>

      <h3>Underworlds</h3>
      <ul>{generateEntries(underworlds)}</ul>

      <h2>Other</h2>
      <hr />

      <h3>Hero Quest</h3>
      <ul>{generateEntries(heroQuest)}</ul>
      <ul>{generateEntries(heroQuestReturnOfTheWitchLord)}</ul>
      <ul>{generateEntries(heroQuestKellarsKeep)}</ul>
      <ul>{generateEntries(heroQuestFrozenHorror)}</ul>
    </Layout>
  );
};

export default BacklogPage;

export const Head = () => (
  <Seo
    title={'Backlog'}
    description={'My backlog of miniatures still to paint'}
    pathname={'/backlog'}
  />
);

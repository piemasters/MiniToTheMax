import React, { FC, ReactNode } from 'react';

import Layout from '../layouts/layout';
import { PageLink, StatefulSeo as Seo } from '../components';
import { BacklogEntry } from '../types';
import * as backlog from '../data/backlog';

export const BacklogPage: FC = () => {
  const generateEntries = (entries: BacklogEntry[]) => {
    entries.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    const domList: ReactNode[] = [];

    for (const [index, value] of entries.entries()) {
      if (value.link) {
        domList.push(
          <li key={index} className="list-none">
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
          <li key={index} className="list-none">
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
      <ul>{generateEntries(backlog.greyKnights)}</ul>

      <h3>Space Wolves</h3>
      <ul>{generateEntries(backlog.spaceWolves)}</ul>
      <ul>{generateEntries(backlog.spaceWolvesPrimaris)}</ul>

      <h3>Orks</h3>
      <ul>{generateEntries(backlog.orks)}</ul>

      <h3>Harlequins</h3>
      <ul>{generateEntries(backlog.harlequins)}</ul>

      <h3>Chaos Space Marines</h3>
      <ul>{generateEntries(backlog.chaosSpaceMarines)}</ul>

      <h3>Scenery</h3>
      <ul>{generateEntries(backlog.scenery40k)}</ul>

      <h2>Age of Sigmar</h2>
      <hr />

      <h3>Gloomspite Gitz</h3>
      <ul>{generateEntries(backlog.gloomspiteGitz)}</ul>

      <h3>Ironjawz</h3>
      <ul>{generateEntries(backlog.ironjawz)}</ul>

      <h3>Kruleboyz</h3>
      <ul>{generateEntries(backlog.kruleboyz)}</ul>

      <h3>Malign Sorcery</h3>
      <ul>{generateEntries(backlog.malignSorcery)}</ul>

      <h3>Objectives</h3>
      <ul>{generateEntries(backlog.objectives)}</ul>

      <h3>Scenery</h3>
      <ul>{generateEntries(backlog.sceneryAoS)}</ul>

      <h2>Board Games 40k</h2>
      <hr />

      <h3>Blackstone Fortress</h3>
      <ul>{generateEntries(backlog.blackstoneFortress)}</ul>

      <h3>Deathwatch Overkill</h3>
      <ul>{generateEntries(backlog.deathwatchOverkill)}</ul>

      <h3>Execution Force</h3>
      <ul>{generateEntries(backlog.executionForce)}</ul>

      <h3>Lost Patrol</h3>
      <ul>{generateEntries(backlog.lostPatrol)}</ul>

      <h3>Space Hulk</h3>
      <ul>{generateEntries(backlog.spaceHulk)}</ul>

      <h2>Board Games Age of Sigmar</h2>
      <hr />

      <h3>Blood Bowl</h3>
      <ul>{generateEntries(backlog.bloodBowl)}</ul>

      <h3>Dreadfleet</h3>
      <ul>{generateEntries(backlog.dreadfleet)}</ul>

      <h3>Dungeon Bowl</h3>
      <ul>{generateEntries(backlog.dungeonBowl)}</ul>

      <h3>Gorechosen</h3>
      <ul>{generateEntries(backlog.gorechosen)}</ul>

      <h3>Silver Tower</h3>
      <ul>{generateEntries(backlog.silverTower)}</ul>

      <h3>Underworlds</h3>
      <ul>{generateEntries(backlog.underworlds)}</ul>

      <h2>Lord of the Rings</h2>
      <hr />

      <h3>Battle for Balins Tomb</h3>
      <ul>{generateEntries(backlog.battleForBalinsTomb)}</ul>

      <h2>Other</h2>
      <hr />

      <h3>Hero Quest</h3>
      <ul>{generateEntries(backlog.heroQuest)}</ul>
      <ul>{generateEntries(backlog.heroQuestReturnOfTheWitchLord)}</ul>
      <ul>{generateEntries(backlog.heroQuestKellarsKeep)}</ul>
      <ul>{generateEntries(backlog.heroQuestFrozenHorror)}</ul>
      <ul>{generateEntries(backlog.heroQuestTheMageOfTheMirror)}</ul>
      <ul>{generateEntries(backlog.heroQuestRiseOfTheDreadMoon)}</ul>
      <ul>{generateEntries(backlog.heroQuestSpiritQueensTorment)}</ul>
      <ul>{generateEntries(backlog.heroQuestProphecyOfTelor)}</ul>
      <ul>{generateEntries(backlog.heroQuestTheRogueHeirOfElethorn)}</ul>
      <ul>{generateEntries(backlog.heroQuestPathOfTheWanderingMonk)}</ul>
      <ul>{generateEntries(backlog.heroQuestAgainstTheOgreHorde)}</ul>

      <h3>The Witcher Old World</h3>
      <ul>{generateEntries(backlog.witcherOldWorld)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldKickstarterExclusive)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldWildHunt)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldMages)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldLegendaryHunt)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldSkellige)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldMonsterPack)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldAdventurePack)}</ul>
      <ul>{generateEntries(backlog.witcherOldWorldMonsterTrail)}</ul>

      <h3>Star Wars Shatterpoint</h3>
      <ul>{generateEntries(backlog.starWarsShatterpoint)}</ul>

      <h3>Star Wars Imperial Assault</h3>
      <ul>{generateEntries(backlog.starWarsImperialAssault)}</ul>

      <h3>Squidmar Miniatures</h3>
      <ul>{generateEntries(backlog.squidmar)}</ul>
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

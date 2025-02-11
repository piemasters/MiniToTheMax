import React, { FC, ReactNode } from 'react';

import Layout from '../layouts/layout';
import {
  Accordion,
  AccordionItem,
  PageLink,
  StatefulSeo as Seo,
} from '../components';
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

      {/* <Accordion className="max-w-lg">
        <AccordionItem value="1" trigger="👋 Hello There">
          A demo Accordion item
        </AccordionItem>
        <AccordionItem value="2" trigger="🌟 It's Animated">
          It transitions between the open and close states
        </AccordionItem>
        <AccordionItem value="3" trigger={<div>🧶Its customisable</div>}>
          It is entirely customizable. You can put any HTML element and style it
          however you want.
        </AccordionItem>
        <AccordionItem value="4" trigger={<div>🦕 React & Tailwind</div>}>
          Nothing but React and Tailwind CSS
        </AccordionItem>
      </Accordion> */}

      <h2>Warhammer 40,000</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Grey Knights">
          <ul>{generateEntries(backlog.greyKnights)}</ul>
        </AccordionItem>
        <AccordionItem value={2} trigger="Space Wolves">
          <>
            <ul>{generateEntries(backlog.spaceWolves)}</ul>
            <ul>{generateEntries(backlog.spaceWolvesPrimaris)}</ul>
          </>
        </AccordionItem>
        <AccordionItem value={3} trigger="Orks">
          <ul>{generateEntries(backlog.orks)}</ul>
        </AccordionItem>
        <AccordionItem value={4} trigger="Harlequins">
          <ul>{generateEntries(backlog.harlequins)}</ul>
        </AccordionItem>
        <AccordionItem value={5} trigger="Chaos Space Marines">
          <ul>{generateEntries(backlog.chaosSpaceMarines)}</ul>
        </AccordionItem>
        <AccordionItem value={6} trigger="Scenery">
          <ul>{generateEntries(backlog.scenery40k)}</ul>
        </AccordionItem>
      </Accordion>

      <h4>Board Games</h4>

      <Accordion>
        <AccordionItem value={1} trigger="Blackstone Fortress">
          <ul>{generateEntries(backlog.blackstoneFortress)}</ul>
        </AccordionItem>
        <AccordionItem value={2} trigger="Deathwatch Overkill">
          <ul>{generateEntries(backlog.deathwatchOverkill)}</ul>
        </AccordionItem>
        <AccordionItem value={3} trigger="Execution Force">
          <ul>{generateEntries(backlog.executionForce)}</ul>
        </AccordionItem>
        <AccordionItem value={4} trigger="Lost Patrol">
          <ul>{generateEntries(backlog.lostPatrol)}</ul>
        </AccordionItem>
        <AccordionItem value={5} trigger="Space Hulk">
          <ul>{generateEntries(backlog.spaceHulk)}</ul>
        </AccordionItem>
      </Accordion>

      <h2>Age of Sigmar & Old World</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Gloomspite Gitz">
          <ul>{generateEntries(backlog.gloomspiteGitz)}</ul>
        </AccordionItem>
        <AccordionItem value={2} trigger="Ironjawz">
          <ul>{generateEntries(backlog.ironjawz)}</ul>
        </AccordionItem>
        <AccordionItem value={3} trigger="Kruleboyz">
          <ul>{generateEntries(backlog.kruleboyz)}</ul>
        </AccordionItem>
        <AccordionItem value={4} trigger="Malign Sorcery">
          <ul>{generateEntries(backlog.malignSorcery)}</ul>
        </AccordionItem>
        <AccordionItem value={5} trigger="Objectives">
          <ul>{generateEntries(backlog.objectives)}</ul>
        </AccordionItem>
        <AccordionItem value={6} trigger="Scenery">
          <ul>{generateEntries(backlog.sceneryAoS)}</ul>
        </AccordionItem>
      </Accordion>

      <h4>Board Games</h4>

      <Accordion>
        <AccordionItem value={1} trigger="Blood Bowl">
          <ul>{generateEntries(backlog.bloodBowl)}</ul>
        </AccordionItem>
        <AccordionItem value={2} trigger="Dreadfleet">
          <ul>{generateEntries(backlog.dreadfleet)}</ul>
        </AccordionItem>
        <AccordionItem value={3} trigger="Dungeon Bowl">
          <ul>{generateEntries(backlog.dungeonBowl)}</ul>
        </AccordionItem>
        <AccordionItem value={4} trigger="Gorechosen">
          <ul>{generateEntries(backlog.gorechosen)}</ul>
        </AccordionItem>
        <AccordionItem value={5} trigger="Silver Tower">
          <ul>{generateEntries(backlog.silverTower)}</ul>
        </AccordionItem>
        <AccordionItem value={6} trigger="Underworlds">
          <ul>{generateEntries(backlog.underworlds)}</ul>
        </AccordionItem>
      </Accordion>

      <h2>Lord of the Rings</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Battle for Balin&#39;s Tomb">
          <ul>{generateEntries(backlog.battleForBalinsTomb)}</ul>
        </AccordionItem>
      </Accordion>

      <h2>HeroQuest</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Core Game">
          <ul>{generateEntries(backlog.heroQuest)}</ul>
        </AccordionItem>
        <AccordionItem value={2} trigger="Mythic Tier">
          <ul>{generateEntries(backlog.heroQuestMythic)}</ul>
        </AccordionItem>
        <AccordionItem value={3} trigger="Return of the Witch Lord">
          <ul>{generateEntries(backlog.heroQuestReturnOfTheWitchLord)}</ul>
        </AccordionItem>
        <AccordionItem value={4} trigger="Kellar&#39;s Keep">
          <ul>{generateEntries(backlog.heroQuestKellarsKeep)}</ul>
        </AccordionItem>
        <AccordionItem value={5} trigger="Frozen Horror">
          <ul>{generateEntries(backlog.heroQuestFrozenHorror)}</ul>
        </AccordionItem>
        <AccordionItem value={6} trigger="The Mage of the Mirror">
          <ul>{generateEntries(backlog.heroQuestTheMageOfTheMirror)}</ul>
        </AccordionItem>
        <AccordionItem value={7} trigger="Rise of the Dread Moon">
          <ul>{generateEntries(backlog.heroQuestRiseOfTheDreadMoon)}</ul>
        </AccordionItem>
        <AccordionItem value={8} trigger="Spirit Queen&#39;s Torment">
          <ul>{generateEntries(backlog.heroQuestSpiritQueensTorment)}</ul>
        </AccordionItem>
        <AccordionItem value={9} trigger="Prophecy of Telor">
          <ul>{generateEntries(backlog.heroQuestProphecyOfTelor)}</ul>
        </AccordionItem>
        <AccordionItem value={10} trigger="The Rogue Heir of Elethorn">
          <ul>{generateEntries(backlog.heroQuestTheRogueHeirOfElethorn)}</ul>
        </AccordionItem>
        <AccordionItem value={11} trigger="Path of the Wandering Monk">
          <ul>{generateEntries(backlog.heroQuestPathOfTheWanderingMonk)}</ul>
        </AccordionItem>
        <AccordionItem value={12} trigger="Against the Ogre Horde">
          <ul>{generateEntries(backlog.heroQuestAgainstTheOgreHorde)}</ul>
        </AccordionItem>
        <AccordionItem value={13} trigger="The Jungles of Delthrak">
          <ul>{generateEntries(backlog.heroQuestTheJunglesOfDelthrak)}</ul>
        </AccordionItem>
      </Accordion>

      <h2>The Witcher Old World</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Core Game">
          <ul>{generateEntries(backlog.witcherOldWorld)}</ul>
        </AccordionItem>
        <AccordionItem value={2} trigger="Kickstarter Exclusive">
          <ul>
            {generateEntries(backlog.witcherOldWorldKickstarterExclusive)}
          </ul>
        </AccordionItem>
        <AccordionItem value={3} trigger="Wild Hunt">
          <ul>{generateEntries(backlog.witcherOldWorldWildHunt)}</ul>
        </AccordionItem>
        <AccordionItem value={4} trigger="Mages">
          <ul>{generateEntries(backlog.witcherOldWorldMages)}</ul>
        </AccordionItem>
        <AccordionItem value={5} trigger="Legendary Hunt">
          <ul>{generateEntries(backlog.witcherOldWorldLegendaryHunt)}</ul>
        </AccordionItem>
        <AccordionItem value={6} trigger="Skellige">
          <ul>{generateEntries(backlog.witcherOldWorldSkellige)}</ul>
        </AccordionItem>
        <AccordionItem value={7} trigger="Monster Pack">
          <ul>{generateEntries(backlog.witcherOldWorldMonsterPack)}</ul>
        </AccordionItem>
        <AccordionItem value={8} trigger="Adventure Pack">
          <ul>{generateEntries(backlog.witcherOldWorldAdventurePack)}</ul>
        </AccordionItem>
        <AccordionItem value={9} trigger="Monster Trail">
          <ul>{generateEntries(backlog.witcherOldWorldMonsterTrail)}</ul>
        </AccordionItem>
      </Accordion>

      <h2>Star Wars</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Shatterpoint">
          <ul>{generateEntries(backlog.starWarsShatterpoint)}</ul>
        </AccordionItem>
        <AccordionItem value={2} trigger="Imperial Assault">
          <ul>{generateEntries(backlog.starWarsImperialAssault)}</ul>
        </AccordionItem>
      </Accordion>

      <h2>Squidmar Miniatures</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Paint Set Miniatures">
          <ul>{generateEntries(backlog.squidmar)}</ul>
        </AccordionItem>
      </Accordion>
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

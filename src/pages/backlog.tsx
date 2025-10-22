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
          <li key={index} className="list-none!">
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
          <li key={index} className="list-none!">
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
    return <ul className="m-0!">{domList}</ul>;
  };

  return (
    <Layout>
      <h1>Backlog</h1>

      <h2>Warhammer 40,000</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Grey Knights">
          {generateEntries(backlog.greyKnights)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Space Wolves">
          <>
            {generateEntries(backlog.spaceWolves)}
            {generateEntries(backlog.spaceWolvesPrimaris)}
          </>
        </AccordionItem>
        <AccordionItem value={3} trigger="Orks">
          {generateEntries(backlog.orks)}
        </AccordionItem>
        <AccordionItem value={4} trigger="Harlequins">
          {generateEntries(backlog.harlequins)}
        </AccordionItem>
        <AccordionItem value={5} trigger="Chaos Space Marines">
          {generateEntries(backlog.chaosSpaceMarines)}
        </AccordionItem>
        <AccordionItem value={6} trigger="Scenery">
          {generateEntries(backlog.scenery40k)}
        </AccordionItem>
      </Accordion>

      <h4>Board Games</h4>

      <Accordion>
        <AccordionItem value={1} trigger="Blackstone Fortress">
          {generateEntries(backlog.blackstoneFortress)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Deathwatch Overkill">
          {generateEntries(backlog.deathwatchOverkill)}
        </AccordionItem>
        <AccordionItem value={3} trigger="Execution Force">
          {generateEntries(backlog.executionForce)}
        </AccordionItem>
        <AccordionItem value={4} trigger="Lost Patrol">
          {generateEntries(backlog.lostPatrol)}
        </AccordionItem>
        <AccordionItem value={5} trigger="Space Hulk">
          {generateEntries(backlog.spaceHulk)}
        </AccordionItem>
      </Accordion>

      <h2>Age of Sigmar & Old World</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Gloomspite Gitz">
          {generateEntries(backlog.gloomspiteGitz)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Ironjawz">
          {generateEntries(backlog.ironjawz)}
        </AccordionItem>
        <AccordionItem value={3} trigger="Kruleboyz">
          {generateEntries(backlog.kruleboyz)}
        </AccordionItem>
        <AccordionItem value={4} trigger="Malign Sorcery">
          {generateEntries(backlog.malignSorcery)}
        </AccordionItem>
        <AccordionItem value={5} trigger="Objectives">
          {generateEntries(backlog.objectives)}
        </AccordionItem>
        <AccordionItem value={6} trigger="Scenery">
          {generateEntries(backlog.sceneryAoS)}
        </AccordionItem>
      </Accordion>

      <h4>Board Games</h4>

      <Accordion>
        <AccordionItem value={1} trigger="Blood Bowl">
          {generateEntries(backlog.bloodBowl)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Dungeon Bowl">
          {generateEntries(backlog.dungeonBowl)}
        </AccordionItem>
        <AccordionItem value={3} trigger="Blood Bowl Gnomes">
          {generateEntries(backlog.bloodBowlGnomes)}
        </AccordionItem>
        <AccordionItem value={4} trigger="Dreadfleet">
          {generateEntries(backlog.dreadfleet)}
        </AccordionItem>
        <AccordionItem value={5} trigger="Gorechosen">
          {generateEntries(backlog.gorechosen)}
        </AccordionItem>
        <AccordionItem value={6} trigger="Silver Tower">
          {generateEntries(backlog.silverTower)}
        </AccordionItem>
        <AccordionItem value={7} trigger="Underworlds">
          {generateEntries(backlog.underworlds)}
        </AccordionItem>
      </Accordion>

      <h2>Lord of the Rings</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Battle for Balin&#39;s Tomb">
          {generateEntries(backlog.battleForBalinsTomb)}
        </AccordionItem>
      </Accordion>

      <h2>HeroQuest</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Core Game">
          {generateEntries(backlog.heroQuest)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Mythic Tier">
          {generateEntries(backlog.heroQuestMythic)}
        </AccordionItem>
        <AccordionItem value={3} trigger="Return of the Witch Lord">
          {generateEntries(backlog.heroQuestReturnOfTheWitchLord)}
        </AccordionItem>
        <AccordionItem value={4} trigger="Kellar&#39;s Keep">
          {generateEntries(backlog.heroQuestKellarsKeep)}
        </AccordionItem>
        <AccordionItem value={5} trigger="Frozen Horror">
          {generateEntries(backlog.heroQuestFrozenHorror)}
        </AccordionItem>
        <AccordionItem value={6} trigger="The Mage of the Mirror">
          {generateEntries(backlog.heroQuestTheMageOfTheMirror)}
        </AccordionItem>
        <AccordionItem value={7} trigger="Rise of the Dread Moon">
          {generateEntries(backlog.heroQuestRiseOfTheDreadMoon)}
        </AccordionItem>
        <AccordionItem value={8} trigger="Spirit Queen&#39;s Torment">
          {generateEntries(backlog.heroQuestSpiritQueensTorment)}
        </AccordionItem>
        <AccordionItem value={9} trigger="Prophecy of Telor">
          {generateEntries(backlog.heroQuestProphecyOfTelor)}
        </AccordionItem>
        <AccordionItem value={10} trigger="The Rogue Heir of Elethorn">
          {generateEntries(backlog.heroQuestTheRogueHeirOfElethorn)}
        </AccordionItem>
        <AccordionItem value={11} trigger="Path of the Wandering Monk">
          {generateEntries(backlog.heroQuestPathOfTheWanderingMonk)}
        </AccordionItem>
        <AccordionItem value={12} trigger="Against the Ogre Horde">
          {generateEntries(backlog.heroQuestAgainstTheOgreHorde)}
        </AccordionItem>
        <AccordionItem value={13} trigger="The Jungles of Delthrak">
          {generateEntries(backlog.heroQuestTheJunglesOfDelthrak)}
        </AccordionItem>
      </Accordion>

      <h2>The Witcher Old World</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Core Game">
          {generateEntries(backlog.witcherOldWorld)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Kickstarter Exclusive">
          <ul>
            {generateEntries(backlog.witcherOldWorldKickstarterExclusive)}
          </ul>
        </AccordionItem>
        <AccordionItem value={3} trigger="Wild Hunt">
          {generateEntries(backlog.witcherOldWorldWildHunt)}
        </AccordionItem>
        <AccordionItem value={4} trigger="Mages">
          {generateEntries(backlog.witcherOldWorldMages)}
        </AccordionItem>
        <AccordionItem value={5} trigger="Legendary Hunt">
          {generateEntries(backlog.witcherOldWorldLegendaryHunt)}
        </AccordionItem>
        <AccordionItem value={6} trigger="Skellige">
          {generateEntries(backlog.witcherOldWorldSkellige)}
        </AccordionItem>
        <AccordionItem value={7} trigger="Monster Pack">
          {generateEntries(backlog.witcherOldWorldMonsterPack)}
        </AccordionItem>
        <AccordionItem value={8} trigger="Adventure Pack">
          {generateEntries(backlog.witcherOldWorldAdventurePack)}
        </AccordionItem>
        <AccordionItem value={9} trigger="Monster Trail">
          {generateEntries(backlog.witcherOldWorldMonsterTrail)}
        </AccordionItem>
      </Accordion>

      <h2>Assassin&#39;s Creed</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Brotherhood">
          {generateEntries(backlog.assassinsCreedBrotherhood)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Apocalypse">
          {generateEntries(backlog.assassinsCreedApocalypse)}
        </AccordionItem>
        <AccordionItem value={3} trigger="Roma">
          {generateEntries(backlog.assassinsCreedRoma)}
        </AccordionItem>
        <AccordionItem value={4} trigger="Creed vs Crows">
          {generateEntries(backlog.assassinsCreedCreedVsCrows)}
        </AccordionItem>
        <AccordionItem value={5} trigger="Tokyo XXI">
          {generateEntries(backlog.assassinsCreedTokyoXXI)}
        </AccordionItem>
      </Accordion>

      <h2>Star Wars</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Shatterpoint">
          {generateEntries(backlog.starWarsShatterpoint)}
        </AccordionItem>
        <AccordionItem value={2} trigger="Imperial Assault">
          {generateEntries(backlog.starWarsImperialAssault)}
        </AccordionItem>
      </Accordion>

      <h2>Other</h2>
      <hr />

      <Accordion>
        <AccordionItem value={1} trigger="Squidmar Miniatures">
          {generateEntries(backlog.squidmar)}
        </AccordionItem>
        <AccordionItem value={1} trigger="Jordan Sorcery Miniatures">
          {generateEntries(backlog.jordanSorcery)}
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

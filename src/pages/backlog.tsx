import { FC, ReactNode } from 'react';
import Layout from '../layouts/layout';
import { StatefulSeo as Seo } from '../components/stateful/StatefulSeo/StatefulSeo';
import { PageLink } from '../components/PageLink/PageLink';
import { Accordion } from '../components/Accordion/Accordion';
import * as backlog from '../data/backlog';

type BacklogEntry = {
  name: string;
  link?: string;
};

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

      <Accordion name="40k">
        <Accordion.Item value={1} trigger="Grey Knights">
          {generateEntries(backlog.greyKnights)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Space Wolves">
          <>
            {generateEntries(backlog.spaceWolves)}
            {generateEntries(backlog.spaceWolvesPrimaris)}
          </>
        </Accordion.Item>
        <Accordion.Item value={3} trigger="Orks">
          {generateEntries(backlog.orks)}
        </Accordion.Item>
        <Accordion.Item value={4} trigger="Harlequins">
          {generateEntries(backlog.harlequins)}
        </Accordion.Item>
        <Accordion.Item value={5} trigger="Chaos Space Marines">
          {generateEntries(backlog.chaosSpaceMarines)}
        </Accordion.Item>
        <Accordion.Item value={6} trigger="Scenery">
          {generateEntries(backlog.scenery40k)}
        </Accordion.Item>
      </Accordion>

      <h4>Board Games</h4>

      <Accordion name="board-games-40k">
        <Accordion.Item value={1} trigger="Blackstone Fortress">
          {generateEntries(backlog.blackstoneFortress)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Deathwatch Overkill">
          {generateEntries(backlog.deathwatchOverkill)}
        </Accordion.Item>
        <Accordion.Item value={3} trigger="Execution Force">
          {generateEntries(backlog.executionForce)}
        </Accordion.Item>
        <Accordion.Item value={4} trigger="Lost Patrol">
          {generateEntries(backlog.lostPatrol)}
        </Accordion.Item>
        <Accordion.Item value={5} trigger="Space Hulk">
          {generateEntries(backlog.spaceHulk)}
        </Accordion.Item>
      </Accordion>

      <h2>Age of Sigmar & Old World</h2>
      <hr />

      <Accordion name="aos">
        <Accordion.Item value={1} trigger="Gloomspite Gitz">
          {generateEntries(backlog.gloomspiteGitz)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Ironjawz">
          {generateEntries(backlog.ironjawz)}
        </Accordion.Item>
        <Accordion.Item value={3} trigger="Kruleboyz">
          {generateEntries(backlog.kruleboyz)}
        </Accordion.Item>
        <Accordion.Item value={4} trigger="Malign Sorcery">
          {generateEntries(backlog.malignSorcery)}
        </Accordion.Item>
        <Accordion.Item value={5} trigger="Objectives">
          {generateEntries(backlog.objectives)}
        </Accordion.Item>
        <Accordion.Item value={6} trigger="Scenery">
          {generateEntries(backlog.sceneryAoS)}
        </Accordion.Item>
      </Accordion>

      <h4>Board Games</h4>

      <Accordion name="board-games-aos">
        <Accordion.Item value={1} trigger="Blood Bowl">
          {generateEntries(backlog.bloodBowl)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Dungeon Bowl">
          {generateEntries(backlog.dungeonBowl)}
        </Accordion.Item>
        <Accordion.Item value={3} trigger="Blood Bowl Gnomes">
          {generateEntries(backlog.bloodBowlGnomes)}
        </Accordion.Item>
        <Accordion.Item value={4} trigger="Dreadfleet">
          {generateEntries(backlog.dreadfleet)}
        </Accordion.Item>
        <Accordion.Item value={5} trigger="Gorechosen">
          {generateEntries(backlog.gorechosen)}
        </Accordion.Item>
        <Accordion.Item value={6} trigger="Silver Tower">
          {generateEntries(backlog.silverTower)}
        </Accordion.Item>
        <Accordion.Item value={7} trigger="Underworlds">
          {generateEntries(backlog.underworlds)}
        </Accordion.Item>
      </Accordion>

      <h2>Lord of the Rings</h2>
      <hr />

      <Accordion name="lotr">
        <Accordion.Item value={1} trigger="Battle for Balin&#39;s Tomb">
          {generateEntries(backlog.battleForBalinsTomb)}
        </Accordion.Item>
      </Accordion>

      <h2>HeroQuest</h2>
      <hr />

      <Accordion name="hero-quest">
        <Accordion.Item value={1} trigger="Core Game">
          {generateEntries(backlog.heroQuest)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Mythic Tier">
          {generateEntries(backlog.heroQuestMythic)}
        </Accordion.Item>
        <Accordion.Item value={3} trigger="Return of the Witch Lord">
          {generateEntries(backlog.heroQuestReturnOfTheWitchLord)}
        </Accordion.Item>
        <Accordion.Item value={4} trigger="Kellar&#39;s Keep">
          {generateEntries(backlog.heroQuestKellarsKeep)}
        </Accordion.Item>
        <Accordion.Item value={5} trigger="Frozen Horror">
          {generateEntries(backlog.heroQuestFrozenHorror)}
        </Accordion.Item>
        <Accordion.Item value={6} trigger="The Mage of the Mirror">
          {generateEntries(backlog.heroQuestTheMageOfTheMirror)}
        </Accordion.Item>
        <Accordion.Item value={7} trigger="Rise of the Dread Moon">
          {generateEntries(backlog.heroQuestRiseOfTheDreadMoon)}
        </Accordion.Item>
        <Accordion.Item value={8} trigger="Spirit Queen&#39;s Torment">
          {generateEntries(backlog.heroQuestSpiritQueensTorment)}
        </Accordion.Item>
        <Accordion.Item value={9} trigger="Prophecy of Telor">
          {generateEntries(backlog.heroQuestProphecyOfTelor)}
        </Accordion.Item>
        <Accordion.Item value={10} trigger="The Rogue Heir of Elethorn">
          {generateEntries(backlog.heroQuestTheRogueHeirOfElethorn)}
        </Accordion.Item>
        <Accordion.Item value={11} trigger="Path of the Wandering Monk">
          {generateEntries(backlog.heroQuestPathOfTheWanderingMonk)}
        </Accordion.Item>
        <Accordion.Item value={12} trigger="Against the Ogre Horde">
          {generateEntries(backlog.heroQuestAgainstTheOgreHorde)}
        </Accordion.Item>
        <Accordion.Item value={13} trigger="The Jungles of Delthrak">
          {generateEntries(backlog.heroQuestTheJunglesOfDelthrak)}
        </Accordion.Item>
      </Accordion>

      <h2>The Witcher Old World</h2>
      <hr />

      <Accordion name="witcher-old-world">
        <Accordion.Item value={1} trigger="Core Game">
          {generateEntries(backlog.witcherOldWorld)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Kickstarter Exclusive">
          <ul>
            {generateEntries(backlog.witcherOldWorldKickstarterExclusive)}
          </ul>
        </Accordion.Item>
        <Accordion.Item value={3} trigger="Wild Hunt">
          {generateEntries(backlog.witcherOldWorldWildHunt)}
        </Accordion.Item>
        <Accordion.Item value={4} trigger="Mages">
          {generateEntries(backlog.witcherOldWorldMages)}
        </Accordion.Item>
        <Accordion.Item value={5} trigger="Legendary Hunt">
          {generateEntries(backlog.witcherOldWorldLegendaryHunt)}
        </Accordion.Item>
        <Accordion.Item value={6} trigger="Skellige">
          {generateEntries(backlog.witcherOldWorldSkellige)}
        </Accordion.Item>
        <Accordion.Item value={7} trigger="Monster Pack">
          {generateEntries(backlog.witcherOldWorldMonsterPack)}
        </Accordion.Item>
        <Accordion.Item value={8} trigger="Adventure Pack">
          {generateEntries(backlog.witcherOldWorldAdventurePack)}
        </Accordion.Item>
        <Accordion.Item value={9} trigger="Monster Trail">
          {generateEntries(backlog.witcherOldWorldMonsterTrail)}
        </Accordion.Item>
      </Accordion>

      <h2>Assassin&#39;s Creed</h2>
      <hr />

      <Accordion name="assassins-creed">
        <Accordion.Item value={1} trigger="Brotherhood">
          {generateEntries(backlog.assassinsCreedBrotherhood)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Apocalypse">
          {generateEntries(backlog.assassinsCreedApocalypse)}
        </Accordion.Item>
        <Accordion.Item value={3} trigger="Roma">
          {generateEntries(backlog.assassinsCreedRoma)}
        </Accordion.Item>
        <Accordion.Item value={4} trigger="Creed vs Crows">
          {generateEntries(backlog.assassinsCreedCreedVsCrows)}
        </Accordion.Item>
        <Accordion.Item value={5} trigger="Tokyo XXI">
          {generateEntries(backlog.assassinsCreedTokyoXXI)}
        </Accordion.Item>
      </Accordion>

      <h2>Star Wars</h2>
      <hr />

      <Accordion name="star-wars">
        <Accordion.Item value={1} trigger="Shatterpoint">
          {generateEntries(backlog.starWarsShatterpoint)}
        </Accordion.Item>
        <Accordion.Item value={2} trigger="Imperial Assault">
          {generateEntries(backlog.starWarsImperialAssault)}
        </Accordion.Item>
      </Accordion>

      <h2>Other</h2>
      <hr />

      <Accordion name="other-miniatures">
        <Accordion.Item value={1} trigger="Squidmar Miniatures">
          {generateEntries(backlog.squidmar)}
        </Accordion.Item>
        <Accordion.Item value={1} trigger="Jordan Sorcery Miniatures">
          {generateEntries(backlog.jordanSorcery)}
        </Accordion.Item>
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

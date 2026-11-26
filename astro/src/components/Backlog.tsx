import { Accordion } from '../../../src/components/Accordion/Accordion';
import * as backlog from '../../../src/data/backlog';

type Entry = { name: string; link?: string };

type Section =
  | { heading: string }
  | { subheading: string }
  | { name: string; items: [string, Entry[][]][] };

const sections: Section[] = [
  { heading: "Warhammer 40,000" },
  {
    name: "40k",
    items: [
      ["Grey Knights", [backlog.greyKnights]],
      ["Space Wolves", [backlog.spaceWolves, backlog.spaceWolvesPrimaris]],
      ["Orks", [backlog.orks]],
      ["Harlequins", [backlog.harlequins]],
      ["Chaos Space Marines", [backlog.chaosSpaceMarines]],
      ["Scenery", [backlog.scenery40k]],
    ],
  },
  { subheading: "Board Games" },
  {
    name: "board-games-40k",
    items: [
      ["Blackstone Fortress", [backlog.blackstoneFortress]],
      ["Deathwatch Overkill", [backlog.deathwatchOverkill]],
      ["Execution Force", [backlog.executionForce]],
      ["Lost Patrol", [backlog.lostPatrol]],
      ["Space Hulk", [backlog.spaceHulk]],
    ],
  },
  { heading: "Age of Sigmar & Old World" },
  {
    name: "aos",
    items: [
      ["Gloomspite Gitz", [backlog.gloomspiteGitz]],
      ["Ironjawz", [backlog.ironjawz]],
      ["Kruleboyz", [backlog.kruleboyz]],
      ["Malign Sorcery", [backlog.malignSorcery]],
      ["Objectives", [backlog.objectives]],
      ["Scenery", [backlog.sceneryAoS]],
    ],
  },
  { subheading: "Board Games" },
  {
    name: "board-games-aos",
    items: [
      ["Blood Bowl", [backlog.bloodBowl]],
      ["Dungeon Bowl", [backlog.dungeonBowl]],
      ["Blood Bowl Gnomes", [backlog.bloodBowlGnomes]],
      ["Dreadfleet", [backlog.dreadfleet]],
      ["Gorechosen", [backlog.gorechosen]],
      ["Silver Tower", [backlog.silverTower]],
      ["Underworlds", [backlog.underworlds]],
    ],
  },
  { heading: "Lord of the Rings" },
  {
    name: "lotr",
    items: [
      ["Battle for Balin's Tomb", [backlog.battleForBalinsTomb]],
    ],
  },
  { heading: "Necromunda" },
  {
    name: "necromunda",
    items: [
      ["Ozostium Aranthus", [backlog.necromunda]],
    ],
  },
  { heading: "HeroQuest" },
  {
    name: "hero-quest",
    items: [
      ["Core Game", [backlog.heroQuest]],
      ["Mythic Tier", [backlog.heroQuestMythic]],
      ["Return of the Witch Lord", [backlog.heroQuestReturnOfTheWitchLord]],
      ["Kellar's Keep", [backlog.heroQuestKellarsKeep]],
      ["Frozen Horror", [backlog.heroQuestFrozenHorror]],
      ["The Mage of the Mirror", [backlog.heroQuestTheMageOfTheMirror]],
      ["Rise of the Dread Moon", [backlog.heroQuestRiseOfTheDreadMoon]],
      ["Spirit Queen's Torment", [backlog.heroQuestSpiritQueensTorment]],
      ["Prophecy of Telor", [backlog.heroQuestProphecyOfTelor]],
      ["The Rogue Heir of Elethorn", [backlog.heroQuestTheRogueHeirOfElethorn]],
      ["Path of the Wandering Monk", [backlog.heroQuestPathOfTheWanderingMonk]],
      ["Against the Ogre Horde", [backlog.heroQuestAgainstTheOgreHorde]],
      ["The Jungles of Delthrak", [backlog.heroQuestTheJunglesOfDelthrak]],
    ],
  },
  { heading: "The Witcher Old World" },
  {
    name: "witcher-old-world",
    items: [
      ["Core Game", [backlog.witcherOldWorld]],
      ["Kickstarter Exclusive", [backlog.witcherOldWorldKickstarterExclusive]],
      ["Wild Hunt", [backlog.witcherOldWorldWildHunt]],
      ["Mages", [backlog.witcherOldWorldMages]],
      ["Legendary Hunt", [backlog.witcherOldWorldLegendaryHunt]],
      ["Skellige", [backlog.witcherOldWorldSkellige]],
      ["Monster Pack", [backlog.witcherOldWorldMonsterPack]],
      ["Adventure Pack", [backlog.witcherOldWorldAdventurePack]],
      ["Monster Trail", [backlog.witcherOldWorldMonsterTrail]],
    ],
  },
  { heading: "Assassin's Creed" },
  {
    name: "assassins-creed",
    items: [
      ["Brotherhood", [backlog.assassinsCreedBrotherhood]],
      ["Apocalypse", [backlog.assassinsCreedApocalypse]],
      ["Roma", [backlog.assassinsCreedRoma]],
      ["Creed vs Crows", [backlog.assassinsCreedCreedVsCrows]],
      ["Tokyo XXI", [backlog.assassinsCreedTokyoXXI]],
    ],
  },
  { heading: "Star Wars" },
  {
    name: "star-wars",
    items: [
      ["Shatterpoint", [backlog.starWarsShatterpoint]],
      ["Imperial Assault", [backlog.starWarsImperialAssault]],
    ],
  },
  { heading: "Moonstone" },
  {
    name: "moonstone",
    items: [
      ["Moonstone", [backlog.moonstone]],
    ],
  },
  { heading: "Other" },
  {
    name: "other-miniatures",
    items: [
      ["Squidmar Miniatures", [backlog.squidmar]],
      ["Archon Studio Miniatures", [backlog.archonStudio]],
      ["Jordan Sorcery Miniatures", [backlog.jordanSorcery]],
      ["The Cats of Mont St. Michel", [backlog.theCatsOfMontStMichel]],
    ],
  },
];

/** One list of miniatures, alphabetically, with the painted ones ticked. */
const Entries = ({ entries }: { entries: Entry[] }) => (
  <ul className="m-0!">
    {[...entries]
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
      .map(({ name, link }, index) => (
        <li key={index} className="list-none!">
          <label>
            <input type="checkbox" checked={Boolean(link)} readOnly />{' '}
            {link ? (
              <a
                href={link}
                className="text-blue-500 no-underline visited:text-blue-500 hover:text-blue-700"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </label>
        </li>
      ))}
  </ul>
);

export const Backlog = () => (
  <>
    {sections.map((section, index) => {
      if ('heading' in section) {
        return (
          <div key={index}>
            <h2>{section.heading}</h2>
            <hr />
          </div>
        );
      }
      if ('subheading' in section) {
        return <h4 key={index}>{section.subheading}</h4>;
      }
      return (
        <Accordion name={section.name} key={index}>
          {section.items.map(([trigger, lists], item) => (
            <Accordion.Item value={item + 1} trigger={trigger} key={trigger}>
              {lists.map((entries, list) => (
                <Entries entries={entries} key={list} />
              ))}
            </Accordion.Item>
          ))}
        </Accordion>
      );
    })}
  </>
);

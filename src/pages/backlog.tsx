import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';

export interface BacklogEntry {
  name: string;
  link?: string;
}

const BacklogPage = (): React.ReactNode => {
  const generateEntries = (entries: BacklogEntry[]) => {
    entries.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    const domList = [];

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

  const spaceWolves = [
    { name: 'Arjac Rockfist' },
    {
      name: 'Blood Claws',
      link: '/showcase/space-wolves/blood-claws/',
    },
    {
      name: 'Canis Wolfborn',
      link: '/showcase/space-wolves/canis-wolfborn/',
    },
    {
      name: 'Centurions',
      link: '/showcase/gloomspite-gitz/skarsnik/',
    },
    {
      name: 'Geigor Fell-Hand',
      link: '/showcase/space-wolves/greigor-fell-hand/',
    },
    {
      name: 'Grey Hunters',
      link: '/showcase/space-wolves/grey-hunters/',
    },
    { name: 'Grey Hunters II' },
    { name: 'Hunter/Stalker' },
    {
      name: 'Imperial Knight',
      link: '/showcase/space-wolves/imperial-knight/',
    },
    { name: 'Krom Dragongaze' },
    {
      name: 'Logan Grimnar',
      link: '/showcase/space-wolves/logan-grimnar/',
    },
    { name: 'Njal Stormcaller' },
    { name: 'Primaris Bladeguard Ancient' },
    { name: 'Primaris Captain' },
    { name: 'Primaris Captain' },
    { name: 'Primaris Hellblaster Squad' },
    { name: 'Primaris Inceptor Squad' },
    { name: 'Primaris Infiltrators' },
    { name: 'Primaris Intercessor Squad' },
    { name: 'Primaris Judicar' },
    { name: 'Ragnar Blackmane' },
    { name: 'Stormbird' },
    {
      name: 'Thunderwolves',
      link: '/showcase/space-wolves/thunderwolves/',
    },
    {
      name: 'Wolf Guard Swiftclaws',
      link: '/showcase/space-wolves/swiftclaws/',
    },
    {
      name: 'Wolf Guard Terminators',
      link: '/showcase/space-wolves/wolf-guard-terminators/',
    },
    { name: 'Wolf Guard Terminators II' },
    {
      name: 'Wolves',
      link: '/showcase/space-wolves/fenrisian-wolves/',
    },
  ];

  const greyKnights = [
    { name: 'Brother Captain Stern', link: '/showcase/grey-knights/stern/' },
    {
      name: 'Brotherhood Champion',
      link: '/showcase/grey-knights/brotherhood-champion/',
    },
    {
      name: 'Castellan Crowe',
      link: '/showcase/grey-knights/castellan-crowe/',
    },
    { name: 'Chaplain', link: '/showcase/grey-knights/chaplain/' },
    { name: 'Custodian Guard' },
    { name: 'Dreadknight', link: '/showcase/grey-knights/dreadknight/' },
    { name: 'Dreadknight II', link: '/showcase/grey-knights/dreadknight-2/' },
    { name: 'Dreadnought', link: '/showcase/grey-knights/dreadnought/' },
    { name: 'Grand Master Voldus' },
    { name: 'Imperial Knight' },
    { name: 'Inquisitor Coteaz' },
    { name: 'Interceptor Squad', link: '/showcase/grey-knights/interceptors/' },
    { name: 'Kaldor Draigo' },
    { name: 'Land Raider' },
    { name: 'Librarian', link: '/showcase/grey-knights/librarian/' },
    { name: 'Paladins' },
    {
      name: 'Purgation Squad',
      link: '/showcase/grey-knights/purgation-squad/',
    },
    { name: 'Purifiers', link: '/showcase/grey-knights/purifiers/' },
    { name: 'Razorback', link: '/showcase/grey-knights/razorback/' },
    { name: 'Sisters of Silence' },
    { name: 'Stormraven', link: '/showcase/grey-knights/stormraven/' },
    { name: 'Strike Squad', link: '/showcase/grey-knights/strike-squad/' },
    { name: 'Terminator Squad', link: '/showcase/grey-knights/terminators/' },
    { name: 'Terminators Squad II' },
  ];

  const darkAngels = [
    { name: 'Chaplain Seraphicus' },
    { name: 'Company Master' },
    { name: 'Death Wing Terminators' },
    { name: 'Librarian' },
    { name: 'Ravenwing Bikes' },
    { name: 'Tactical Marines' },
  ];

  const orks = [
    { name: 'Ammo Runt' },
    { name: 'Ghazghkull Thraka' },
    { name: 'Gretchin', link: '/showcase/orks/gretchin/' },
    { name: 'Grot Oiler' },
    { name: 'Grukk Face-Rippa' },
    { name: 'Kans' },
    { name: 'Meganobz' },
    { name: 'Nobz' },
    { name: 'Nobz II' },
    { name: 'Runtherd' },
  ];

  const harlequins = [
    { name: 'Death Jester' },
    { name: 'Shadowseer' },
    { name: 'Solitaire' },
  ];

  const chaosSpaceMarines = [
    { name: 'Ahzek Ahriman' },
    { name: "Chosen Draznicht's Ravagers" },
    { name: 'Cultists' },
    { name: 'Cultists II' },
    { name: 'Foetid Bloat-drone' },
    { name: 'Helbrute' },
    { name: 'Kranon the Relentless' },
    { name: 'Lord of Contagion' },
    { name: 'Plague Marines' },
    { name: 'Poxwalkers' },
  ];

  const gloomspiteGitz = [
    {
      name: 'Da Red Gobbo',
      link: '/showcase/gloomspite-gitz/da-red-gobbo/',
    },
    {
      name: 'Mangler Squigs',
      link: '/showcase/gloomspite-gitz/mangler-squigs/',
    },
    {
      name: 'Morglum Necksnapper',
      link: '/showcase/gloomspite-gitz/morglum-necksnapper/',
    },
    {
      name: 'Skarsnik & Gobbla',
      link: '/showcase/gloomspite-gitz/skarsnik/',
    },
    {
      name: 'Skragrott',
      link: '/showcase/gloomspite-gitz/skragrott-the-loonking/',
    },
    {
      name: 'Spearmen',
      link: '/showcase/gloomspite-gitz/spearmen/',
    },
    {
      name: 'Throgg',
      link: '/showcase/gloomspite-gitz/throgg/',
    },
  ];

  const malignSorcery = [
    {
      name: 'Aethervoid Pendulun',
      link: '/showcase/gloomspite-gitz/malign-sorcery/aethervoid-pendulum/',
    },
    {
      name: 'Burning Head',
      link: '/showcase/gloomspite-gitz/malign-sorcery/burning-head/',
    },
    {
      name: 'Chronomantic Cogs',
      link: '/showcase/gloomspite-gitz/malign-sorcery/chronomantic-cogs/',
    },
    {
      name: 'Emerald Lifeswarm',
      link: '/showcase/gloomspite-gitz/malign-sorcery/emerald-lifeswarm/',
    },
    {
      name: 'Geminids of Uhl-Ghysh',
      link: '/showcase/gloomspite-gitz/malign-sorcery/geminids-of-uhl-gysh/',
    },
    {
      name: 'Malevolent Maelstrom',
      link: '/showcase/gloomspite-gitz/malign-sorcery/malevolent-maelstrom/',
    },
    {
      name: 'Prismatic Palisade',
      link: '/showcase/gloomspite-gitz/malign-sorcery/prismatic-palisade/',
    },
    {
      name: 'Purple Sun of Shyish',
      link: '/showcase/gloomspite-gitz/malign-sorcery/purple-sun-of-shyish/',
    },
    {
      name: 'Quicksilver Swords',
      link: '/showcase/gloomspite-gitz/malign-sorcery/quicksilver-swords/',
    },
    {
      name: 'Ravenak’s Gnashing Jaws',
      link: '/showcase/gloomspite-gitz/malign-sorcery/ravenaks-gnashing-jaws/',
    },
    {
      name: 'Soulsnare Shackles',
      link: '/showcase/gloomspite-gitz/malign-sorcery/soulsnare-shackles/',
    },
    {
      name: 'Suffocating Gravetide',
      link: '/showcase/gloomspite-gitz/malign-sorcery/suffocating-gravetide/',
    },
    {
      name: 'Umbral Spellportal',
      link: '/showcase/gloomspite-gitz/malign-sorcery/umbral-spell-portals/',
    },
  ];

  const objectives = [
    {
      name: 'Ensorcelled Armoury',
      link: '/showcase/scenery/shattered-dominion-objectives/enscrolled-armoury/',
    },
    {
      name: 'Hallowed Tomb',
      link: '/showcase/scenery/shattered-dominion-objectives/hallowed-tomb/',
    },
    {
      name: 'Iconoclast Axe',
      link: '/showcase/scenery/shattered-dominion-objectives/iconoclast-axe/',
    },
    {
      name: 'Realmvault Key',
      link: '/showcase/scenery/shattered-dominion-objectives/realmvault-key/',
    },
    {
      name: 'Soul Stone',
      link: '/showcase/scenery/shattered-dominion-objectives/soul-stone/',
    },
    {
      name: 'The Realm’s Ransom',
      link: '/showcase/scenery/shattered-dominion-objectives/the-realms-ransom/',
    },
    {
      name: 'Trove of Arcane Glory',
      link: '/showcase/scenery/shattered-dominion-objectives/trove-of-arcane-glory/',
    },
  ];

  const dreadfleet = [
    {
      name: 'Auxiliaries',
      link: '/showcase/board-games/dreadfleet/auxiliaries/',
    },
    {
      name: 'Black Kraken',
      link: '/showcase/board-games/dreadfleet/black-kraken/',
    },
    {
      name: 'Bloody Reaver',
      link: '/showcase/board-games/dreadfleet/bloody-reaver/',
    },
    {
      name: 'Components',
      link: '/showcase/board-games/dreadfleet/components/',
    },
    {
      name: 'Curse of Zandri',
      link: '/showcase/board-games/dreadfleet/curse-of-zandri/',
    },
    {
      name: 'Flaming Scimitar',
      link: '/showcase/board-games/dreadfleet/flaming-scimitar/',
    },
    {
      name: "Grimnir's Thunder",
      link: '/showcase/board-games/dreadfleet/grimnirs-thunder/',
    },
    {
      name: 'Heldenhammer',
      link: '/showcase/board-games/dreadfleet/heldenhammer/',
    },
    {
      name: 'Islands',
      link: '/showcase/board-games/dreadfleet/islands/',
    },
    {
      name: 'Monsters',
      link: '/showcase/board-games/dreadfleet/monsters/',
    },
    {
      name: 'Seadrake',
      link: '/showcase/board-games/dreadfleet/seadrake/',
    },
    {
      name: 'Shadewraith',
      link: '/showcase/board-games/dreadfleet/shadewraith/',
    },
    {
      name: 'Shipwrecks',
      link: '/showcase/board-games/dreadfleet/shipwrecks/',
    },
    {
      name: 'Skabrus',
      link: '/showcase/board-games/dreadfleet/skabrus/',
    },
    {
      name: 'Swordfysh',
      link: '/showcase/board-games/dreadfleet/swordfysh/',
    },
  ];

  const gorechosen = [
    {
      name: 'Fexgore the Flayer',
      link: '/showcase/board-games/gorechosen/fexgor-the-flayer/',
    },
    {
      name: 'Heldrax Goretouched',
      link: '/showcase/board-games/gorechosen/heldrax-goretouched/',
    },
    {
      name: 'Kore Hammerskull',
      link: '/showcase/board-games/gorechosen/kore-hammerskull/',
    },
    {
      name: 'Redarg Bloodfane',
      link: '/showcase/board-games/gorechosen/redarg-bloodfane/',
    },
    {
      name: 'Vexnar the Reaper',
      link: '/showcase/board-games/gorechosen/vexnar-the-reaper/',
    },
  ];

  const silverTower = [
    {
      name: 'Blue Horrors',
      link: '/showcase/board-games/silver-tower/blue-horrors/',
    },
    {
      name: 'Brimstone Horrors',
      link: '/showcase/board-games/silver-tower/brimstone-horrors/',
    },
    {
      name: 'Darkoeth Chieftan',
      link: '/showcase/board-games/silver-tower/darkoath-chieftain/',
    },
    {
      name: 'Excelsior War Priest',
      link: '/showcase/board-games/silver-tower/excelsior-warpriest/',
    },
    {
      name: 'Familiars',
      link: '/showcase/board-games/silver-tower/gaunt-summoner/',
    },
    {
      name: 'Fyreslayer Doomseeker',
      link: '/showcase/board-games/silver-tower/fyreslayer-doomseeker/',
    },
    {
      name: 'Gaunt Summoner',
      link: '/showcase/board-games/silver-tower/gaunt-summoner/',
    },
    {
      name: 'Grot Scuttlings',
      link: '/showcase/board-games/silver-tower/grot-scuttlings/',
    },
    {
      name: 'Kairic Acolytes',
      link: '/showcase/board-games/silver-tower/kairic-acolytes/',
    },
    {
      name: 'Knight Questor ',
      link: '/showcase/board-games/silver-tower/knight-questor/',
    },
    {
      name: 'Mistweaver Saith',
      link: '/showcase/board-games/silver-tower/mistweaver-saih/',
    },
    {
      name: 'Ogroid Traumaturge',
      link: '/showcase/board-games/silver-tower/ogroid-thaumaturge/',
    },
    {
      name: 'Pink Horrors',
      link: '/showcase/board-games/silver-tower/pink-horrors/',
    },
    {
      name: 'Skaven Deathrunners',
      link: '/showcase/board-games/silver-tower/skaven-deathrunners/',
    },
    {
      name: 'Tenebrand Shard',
      link: '/showcase/board-games/silver-tower/tenebrael-shard',
    },
    {
      name: 'Tzaangors',
      link: '/showcase/board-games/silver-tower/tzaangors/',
    },
  ];

  const spaceHulk = [
    { name: 'Artefact' },
    { name: 'Broodlord' },
    { name: 'C.A.T' },
    { name: 'Dead Space Marine' },
    { name: 'Genestealers' },
    { name: 'Space Marine Terminators' },
  ];

  const executionForce = [
    {
      name: 'Callidus',
      link: '/showcase/board-games/assassinorum-execution-force/callidus-assassin/',
    },
    {
      name: 'Chaos Cultists',
      link: '/showcase/board-games/assassinorum-execution-force/chaos-cultists/',
    },
    {
      name: 'Chaos Space Marines',
      link: '/showcase/board-games/assassinorum-execution-force/chaos-space-marines/',
    },
    {
      name: 'Chaos Terminator Lord',
      link: '/showcase/board-games/assassinorum-execution-force/chaos-sorcerer-lord/',
    },
    {
      name: 'Cullexus',
      link: '/showcase/board-games/assassinorum-execution-force/culexus-assassin/',
    },
    {
      name: 'Eversor',
      link: '/showcase/board-games/assassinorum-execution-force/eversor-assassin/',
    },
    {
      name: 'Vindicare',
      link: '/showcase/board-games/assassinorum-execution-force/vindicare-assassin/',
    },
  ];

  const deathwatchOverkill = [
    { name: 'Acolyte Hybrids' },
    { name: 'Chaplain Cassius' },
    { name: 'Deathwatch Members' },
    { name: 'Familiars' },
    { name: 'Genestealers' },
    { name: 'Genestealer Aberrants' },
    { name: 'Magus' },
    { name: 'Neophyte Cultists' },
    { name: 'Patriarch' },
    { name: 'Primus' },
  ];

  const lostPatrol = [
    {
      name: 'Genestealers',
      link: '/showcase/board-games/lost-patrol/genestealers/',
    },
    {
      name: 'Infestations',
      link: '/showcase/board-games/lost-patrol/infestations/',
    },
    {
      name: 'Space Marine Scouts',
      link: '/showcase/board-games/lost-patrol/scouts/',
    },
  ];

  const underworlds = [
    { name: "Stormsire's Cursebreakers" },
    { name: 'Thorns of the Briar Queen' },
    { name: "Zarbag's Gitz" },
  ];

  const scenery = [
    { name: 'Aquila Strongpoint' },
    { name: 'Firestorm Redoubt' },
    { name: 'Firestorm Redoubt II' },
    { name: 'Imperial Bunker' },
    { name: 'Imperial Defence Emplacement' },
    { name: 'Imperial Defence Line' },
    {
      name: 'Iron Battlefield',
      link: '/showcase/scenery/iron-battlefield/',
    },
    {
      name: 'Realm of Battle Boards',
      link: '/showcase/scenery/battle-boards/',
    },
    { name: 'Skullvane Manse', link: '/showcase/scenery/skullvane/' },
    { name: 'Vengeance Weapon Battery' },
  ];

  return (
    <Layout>
      <Seo
        title={'Backlog'}
        description={'My backlog of miniatures still to paint'}
        pathname={'/backlog'}
      />
      <h1>Backlog</h1>

      <h2>40k</h2>
      <hr />

      <h3>Grey Knights</h3>
      <ul>{generateEntries(greyKnights)}</ul>

      <h3>Space Wolves</h3>
      <ul>{generateEntries(spaceWolves)}</ul>

      <h3>Dark Angels</h3>
      <ul>{generateEntries(darkAngels)}</ul>

      <h3>Orks</h3>
      <ul>{generateEntries(orks)}</ul>

      <h3>Harlequins</h3>
      <ul>{generateEntries(harlequins)}</ul>

      <h3>Chaos Space Marines</h3>
      <ul>{generateEntries(chaosSpaceMarines)}</ul>

      <h2>Age of Sigmar</h2>
      <hr />

      <h3>Gloomspite Gitz</h3>
      <ul>{generateEntries(gloomspiteGitz)}</ul>

      <h3>Malign Sorcery</h3>
      <ul>{generateEntries(malignSorcery)}</ul>

      <h3>Objectives</h3>
      <ul>{generateEntries(objectives)}</ul>

      <h2>Scenery</h2>
      <hr />
      <ul>{generateEntries(scenery)}</ul>

      <h2>Board Games</h2>
      <hr />

      <h3>Dreadfleet</h3>
      <ul>{generateEntries(dreadfleet)}</ul>

      <h3>Gorechosen</h3>
      <ul>{generateEntries(gorechosen)}</ul>

      <h3>Silver Tower</h3>
      <ul>{generateEntries(silverTower)}</ul>

      <h3>Lost Patrol</h3>
      <ul>{generateEntries(lostPatrol)}</ul>

      <h3>Execution Force</h3>
      <ul>{generateEntries(executionForce)}</ul>

      <h3>Space Hulk</h3>
      <ul>{generateEntries(spaceHulk)}</ul>

      <h3>Deathwatch Overkill</h3>
      <ul>{generateEntries(deathwatchOverkill)}</ul>

      <h3>Underworlds</h3>
      <ul>{generateEntries(underworlds)}</ul>
    </Layout>
  );
};

export default BacklogPage;

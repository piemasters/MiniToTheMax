import React from 'react';
import Layout from '../layouts/layout';
import Seo from '../components/stateful/seo';
import PageLink from '../components/page-link';

export interface BacklogEntry {
  name: string;
  link?: string;
}

const BacklogPage = () => {
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
              <input type="checkbox" checked onChange={() => {}} />{' '}
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
              <input type="checkbox" checked={false} onChange={() => {}} />{' '}
              {value.name}
            </label>
          </li>
        );
      }
    }
    return domList;
  };

  const spaceWolves = [
    {
      name: 'Imperial Knight',
      link: '/showcase/space-wolves/imperial-knight/',
    },
    { name: 'Krom Dragongaze' },
    { name: 'Arjac Rockfist' },
    { name: 'Logan Grimnar' },
    { name: 'Ragnar Blackmane' },
    { name: 'Canis Wolfborn' },
    { name: 'Geigor Fell-Hand' },
    { name: 'Njal Stormcaller' },
    { name: 'Wolf Guard Terminators' },
    { name: 'Wolf Guard Swiftclaws' },
    { name: 'Centurions' },
    { name: 'Wolf Guard Terminators' },
    { name: 'Blood Claws' },
    { name: 'Grey Hunters' },
    { name: 'Grey Hunters II' },
    { name: 'Wolves' },
    { name: 'Hunter/Stalker' },
    { name: 'Stormbird' },
    { name: 'Primaris Captain' },
    { name: 'Primaris Captain' },
    { name: 'Primaris Judicar' },
    { name: 'Primaris Bladeguard Ancient' },
    { name: 'Primaris Intercessor Squad' },
    { name: 'Primaris Inceptor Squad' },
    { name: 'Primaris Hellblaster Squad' },
    { name: 'Primaris Infiltrators' },
  ];

  const greyKnights = [
    { name: 'Strike Squad', link: '/showcase/grey-knights/strike-squad/' },
    { name: 'Brother Captain Stern', link: '/showcase/grey-knights/stern/' },
    { name: 'Terminator Squad', link: '/showcase/grey-knights/terminators/' },
    { name: 'Chaplain', link: '/showcase/grey-knights/chaplain/' },
    {
      name: 'Purgation Squad',
      link: '/showcase/grey-knights/purgation-squad/',
    },
    { name: 'Stormraven', link: '/showcase/grey-knights/stormraven/' },
    { name: 'Dreadknight', link: '/showcase/grey-knights/dreadknight/' },
    { name: 'Razorback', link: '/showcase/grey-knights/razorback/' },
    { name: 'Dreadknight II', link: '/showcase/grey-knights/dreadknight-2/' },
    {
      name: 'Brotherhood Champion',
      link: '/showcase/grey-knights/brotherhood-champion/',
    },
    { name: 'Dreadnought', link: '/showcase/grey-knights/dreadnought/' },
    { name: 'Purifiers', link: '/showcase/grey-knights/purifiers/' },
    { name: 'Interceptor Squad', link: '/showcase/grey-knights/interceptors/' },
    { name: 'Librarian', link: '/showcase/grey-knights/librarian/' },
    {
      name: 'Castellan Crowe',
      link: '/showcase/grey-knights/castellan-crowe/',
    },
    { name: 'Imperial Knight' },
    { name: 'Kaldor Draigo' },
    { name: 'Terminators Squad II' },
    { name: 'Paladins' },
    { name: 'Land Raider' },
    { name: 'Grand Master Voldus' },
    { name: 'Inquisitor Coteaz' },
  ];

  const darkAngels = [
    { name: 'Company Master' },
    { name: 'Librarian' },
    { name: 'Chaplain Seraphicus' },
    { name: 'Death Wing Terminators' },
    { name: 'Tactical Marines' },
    { name: 'Ravenwing Bikes' },
  ];

  const orks = [
    { name: 'Gretchin', link: '/showcase/orks/gretchin/' },
    { name: 'Grukk Face-Rippa' },
    { name: 'Nobz' },
    { name: 'Kans' },
    { name: 'Runtherd' },
    { name: 'Ghazghkull Thraka' },
    { name: 'Nobz II' },
    { name: 'Meganobz' },
    { name: 'Ammo Runt' },
    { name: 'Grot Oiler' },
  ];

  const harlequins = [
    { name: 'Solitaire' },
    { name: 'Shadowseer' },
    { name: 'Death Jester' },
  ];

  const deathGuard = [
    { name: 'Lord of Contagion' },
    { name: 'Plague Marines' },
    { name: 'Foetid Bloat-drone' },
    { name: 'Poxwalkers' },
    { name: 'Helbrute' },
    { name: 'Kranon the Relentless' },
    { name: "Chosen Draznicht's Ravagers" },
    { name: 'Cultists' },
    { name: 'Cultists II' },
  ];

  const gloomspiteGitz = [
    {
      name: 'Mangler Squigs',
      link: '/showcase/gloomspite-gitz/mangler-squigs/',
    },
    {
      name: 'Spearmen',
      link: '/showcase/gloomspite-gitz/spearmen/',
    },
    {
      name: 'Morglum Necksnapper',
      link: '/showcase/gloomspite-gitz/morglum-necksnapper/',
    },
    { name: 'Skragrott' },
    { name: 'Throgg' },
  ];

  const malignSorcery = [
    { name: 'Purple Sun of Shyish' },
    { name: 'Ravenak’s Gnashing Jaws' },
    { name: 'Suffocating Gravetide' },
    { name: 'Quicksilver Swords' },
    { name: 'Aethervoid Pendulun' },
    { name: 'Chronomantic Cogs' },
    { name: 'Umbral Spellportal' },
    { name: 'Soulsnare Shackles' },
    { name: 'Geminids of Uhl-Ghysh' },
    { name: 'Burning Head' },
    { name: 'Malevolent Maelstrom' },
    { name: 'Prismatic Palisade' },
    { name: 'Emerald Lifeswarm' },
  ];

  const objectives = [
    { name: 'Hallowed Tomb' },
    { name: 'Trove of Arcane Glory' },
    { name: 'Soul Stone' },
    { name: 'The Realm’s Ransom' },
    { name: 'Ensorcelled Armoury' },
    { name: 'Iconoclast Axe' },
    { name: 'Realmvault Key' },
    { name: 'Soulsnare Shackles' },
    { name: 'Geminids of Uhl-Ghysh' },
    { name: 'Burning Head' },
    { name: 'Malevolent Maelstrom' },
    { name: 'Prismatic Palisade' },
    { name: 'Emerald Lifeswarm' },
  ];

  const dreadfleet = [
    { name: 'Black Kraken' },
    { name: 'Bloody Reaver' },
    { name: 'Curse of Zandri' },
    { name: 'Flaming Scimitar' },
    { name: "Grimnir's Thunder" },
    { name: 'Heldenhammer' },
    { name: 'Seadrake' },
    { name: 'Shadewraith' },
    { name: 'Skabrus' },
    { name: 'Swordfysh' },
    { name: 'Auxiliaries' },
    { name: 'Components' },
    { name: 'Islands' },
    { name: 'Monsters' },
    { name: 'Shipwrecks' },
  ];

  const gorechosen = [
    { name: 'Exalted Deathbringer' },
    { name: 'Skullgrinder ' },
    { name: 'Slaughterpriest' },
    { name: 'Aspiring Deathbringer' },
    { name: 'Slaughterpriest' },
  ];

  const silverTower = [
    { name: 'Knight Questor ' },
    { name: 'Darkoeth Chieftan' },
    { name: 'Fyreslayer Doomseeker' },
    { name: 'Excelsior War Priest' },
    { name: 'Mistweaver Saith' },
    { name: 'Tenebrand Shard' },
    { name: 'Gaunt Summoner' },
    { name: 'Familiars' },
    { name: 'Ogroid Traumaturge' },
    { name: 'Skaven Deathrunners' },
    {
      name: 'Kairic Acolytes',
      link: '/showcase/board-games/silver-tower/kairic-acolytes/',
    },
    {
      name: 'Grot Scuttlings',
      link: '/showcase/board-games/silver-tower/grot-scuttlings/',
    },
    { name: 'Tzaangors' },
    { name: 'Pink Horrors' },
    { name: 'Blue Horrors' },
    {
      name: 'Brimstone Horrors',
      link: '/showcase/board-games/silver-tower/brimstone-horrors/',
    },
  ];

  const spaceHulk = [
    { name: 'Space Marine Terminators' },
    { name: 'Genestealers' },
    { name: 'Broodlord' },
    { name: 'Artefact' },
    { name: 'Dead Space Marine' },
    { name: 'C.A.T' },
  ];

  const executionForce = [
    { name: 'Callidus' },
    { name: 'Cullexus' },
    { name: 'Eversor' },
    { name: 'Vindicare' },
    { name: 'Chaos Terminator Lord' },
    { name: 'Chaos Space Marines' },
    { name: 'Chaos Cultists' },
  ];

  const deathwatchOverkill = [
    { name: 'Chaplain Cassius' },
    { name: 'Deathwatch Members' },
    { name: 'Patriarch' },
    { name: 'Magus' },
    { name: 'Primus' },
    { name: 'Familiars' },
    { name: 'Acolyte Hybrids' },
    { name: 'Neophyte Cultists' },
    { name: 'Genestealers' },
    { name: 'Genestealer Aberrants' },
  ];

  const lostPatrol = [
    { name: 'Space Marine Scouts' },
    { name: 'Genestealers' },
    { name: 'Infestations' },
  ];

  const underworlds = [
    { name: "Zarbag's Gitz" },
    { name: "Stormsire's Cursebreakers" },
    { name: 'Thorns of the Briar Queen' },
  ];

  const burningOfProspero = [
    { name: 'Ahzek Ahriman' },
    { name: 'Geigor Fell-Hand' },
    { name: 'Tartaros Terminators' },
    { name: 'Legion Veterans' },
    { name: 'Legion Veterans II' },
    { name: 'Legion Veterans III' },
    { name: 'Custodian Guard' },
    { name: 'Sisters of Silence' },
  ];

  const scenery = [
    { name: 'Skullvane Manse', link: '/showcase/scenery/skullvane/' },
    {
      name: 'Realm of Battle Boards',
      link: '/showcase/scenery/battle-boards/',
    },
    { name: 'Iron Battlefield' },
    { name: 'Aquila Strongpoint' },
    { name: 'Firestorm Redoubt' },
    { name: 'Firestorm Redoubt II' },
    { name: 'Vengeance Weapon Battery' },
    { name: 'Imperial Bunker' },
    { name: 'Imperial Defence Line' },
    { name: 'Imperial Defence Emplacement' },
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

      <h3>Death Guard</h3>
      <ul>{generateEntries(deathGuard)}</ul>

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

      <h3>Space Hulk</h3>
      <ul>{generateEntries(spaceHulk)}</ul>

      <h3>Execution Force</h3>
      <ul>{generateEntries(executionForce)}</ul>

      <h3>Deathwatch Overkill</h3>
      <ul>{generateEntries(deathwatchOverkill)}</ul>

      <h3>Lost Patrol</h3>
      <ul>{generateEntries(lostPatrol)}</ul>

      <h3>Underworlds</h3>
      <ul>{generateEntries(underworlds)}</ul>

      <h3>Burning of Prospero</h3>
      <ul>{generateEntries(burningOfProspero)}</ul>
    </Layout>
  );
};

export default BacklogPage;

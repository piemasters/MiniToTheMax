import { PaintDetailsCitadel } from '../types';

export const sprayCoraxWhite: PaintDetailsCitadel = {
  name: 'Corax White',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'white',
  hex: '#FFFFFF',
  stroke: '#6b6b6b',
  availability: 'discontinued',
  company: 'Citadel',
};

export const sprayChaosBlack: PaintDetailsCitadel = {
  name: 'Chaos Black',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'black',
  hex: '#000000',
  availability: 'available',
  company: 'Citadel',
};

export const sprayRetributorArmour: PaintDetailsCitadel = {
  name: 'Retributor Armour',
  category: 'Citadel Spray',
  type: ['spray', 'metallic'],
  color: 'gold',
  hex: '#89571D',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 50, color: 'rgb(235, 184, 84)' },
    { offset: 100, color: 'rgb(137, 87, 29)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const sprayMephistonRed: PaintDetailsCitadel = {
  name: 'Mephiston Red',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'red',
  hex: '#960C09',
  availability: 'available',
  company: 'Citadel',
};

export const sprayMacraggeBlue: PaintDetailsCitadel = {
  name: 'Macragge Blue',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'blue',
  hex: '#0F3D7C',
  availability: 'available',
  company: 'Citadel',
};

export const sprayZandriDust: PaintDetailsCitadel = {
  name: 'Zandri Dust',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'brown',
  hex: '#988E56',
  availability: 'available',
  company: 'Citadel',
};

export const sprayMechanicusStandardGrey: PaintDetailsCitadel = {
  name: 'Mechanicus Standard Grey',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'grey',
  hex: '#39484A',
  availability: 'available',
  company: 'Citadel',
};

export const sprayLeadbelcher: PaintDetailsCitadel = {
  name: 'Leadbelcher',
  category: 'Citadel Spray',
  type: ['spray', 'metallic'],
  color: 'silver',
  hex: '#151E24',
  gradient: [
    { offset: 0, color: 'rgb(240, 240, 240)' },
    { offset: 50, color: 'rgb(138, 138, 138)' },
    { offset: 100, color: 'rgb(21, 30, 36)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const sprayDeathGuardGreen: PaintDetailsCitadel = {
  name: 'Death Guard Green',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'green',
  hex: '#556229',
  availability: 'available',
  company: 'Citadel',
};

export const sprayMunitorumVarnish: PaintDetailsCitadel = {
  name: 'Munitorum Varnish',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'clear',
  hex: '#CCCCCC',
  gradient: [
    { offset: 30, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
  stroke: '#6b6b6b',
  availability: 'available',
  company: 'Citadel',
};

export const sprayWraithBone: PaintDetailsCitadel = {
  name: 'Wraithbone',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'bone',
  hex: '#DBD1B2',
  availability: 'available',
  company: 'Citadel',
};

export const sprayGreySeer: PaintDetailsCitadel = {
  name: 'Grey Seer',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'grey',
  hex: '#A2A5A7',
  availability: 'available',
  company: 'Citadel',
};

export const sprayRunelordBrass: PaintDetailsCitadel = {
  name: 'Runelord Brass',
  category: 'Citadel Spray',
  type: ['spray', 'metallic'],
  color: 'brass',
  hex: '#74624D',
  gradient: [
    { offset: 0, color: 'rgb(245, 237, 227)' },
    { offset: 50, color: 'rgb(116, 98, 77)' },
    { offset: 100, color: 'rgb(25, 14, 7)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const sprayWhiteScar: PaintDetailsCitadel = {
  name: 'White Scar',
  category: 'Citadel Spray',
  type: ['spray'],
  color: 'white',
  hex: '#FFFFFF',
  stroke: '#6b6b6b',
  availability: 'available',
  company: 'Citadel',
};

export const sprayPaints = [
  sprayCoraxWhite,
  sprayChaosBlack,
  sprayRetributorArmour,
  sprayMephistonRed,
  sprayMacraggeBlue,
  sprayZandriDust,
  sprayMechanicusStandardGrey,
  sprayLeadbelcher,
  sprayDeathGuardGreen,
  sprayMunitorumVarnish,
  sprayWraithBone,
  sprayGreySeer,
  sprayRunelordBrass,
  sprayWhiteScar,
];

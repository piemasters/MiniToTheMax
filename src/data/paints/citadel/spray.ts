import { PaintDetails } from '../../../types';

export const sprayCoraxWhite: PaintDetails = {
  name: 'Corax White',
  type: 'spray',
  color: 'white',
  hex: '#FFFFFF',
  stroke: '#6b6b6b',
  availability: 'discontinued',
  company: 'Citadel',
};

export const sprayChaosBlack: PaintDetails = {
  name: 'Chaos Black',
  type: 'spray',
  color: 'black',
  hex: '#000000',
  availability: 'available',
  company: 'Citadel',
};

export const sprayRetributorArmour: PaintDetails = {
  name: 'Retributor Armour',
  type: 'spray',
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

export const sprayMephistonRed: PaintDetails = {
  name: 'Mephiston Red',
  type: 'spray',
  color: 'red',
  hex: '#960C09',
  availability: 'available',
  company: 'Citadel',
};

export const sprayMacraggeBlue: PaintDetails = {
  name: 'Macragge Blue',
  type: 'spray',
  color: 'blue',
  hex: '#0F3D7C',
  availability: 'available',
  company: 'Citadel',
};

export const sprayZandriDust: PaintDetails = {
  name: 'Zandri Dust',
  type: 'spray',
  color: 'brown',
  hex: '#988E56',
  availability: 'available',
  company: 'Citadel',
};

export const sprayMechanicusStandardGrey: PaintDetails = {
  name: 'Mechanicus Standard Grey',
  type: 'spray',
  color: 'grey',
  hex: '#39484A',
  availability: 'available',
  company: 'Citadel',
};

export const sprayLeadbelcher: PaintDetails = {
  name: 'Leadbelcher',
  type: 'spray',
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

export const sprayDeathGuardGreen: PaintDetails = {
  name: 'Death Guard Green',
  type: 'spray',
  color: 'green',
  hex: '#556229',
  availability: 'available',
  company: 'Citadel',
};

export const sprayMunitorumVarnish: PaintDetails = {
  name: 'Munitorum Varnish',
  type: 'spray',
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

export const sprayWraithBone: PaintDetails = {
  name: 'Wraithbone',
  type: 'spray',
  color: 'bone',
  hex: '#DBD1B2',
  availability: 'available',
  company: 'Citadel',
};

export const sprayGreySeer: PaintDetails = {
  name: 'Grey Seer',
  type: 'spray',
  color: 'grey',
  hex: '#A2A5A7',
  availability: 'available',
  company: 'Citadel',
};

export const sprayRunelordBrass: PaintDetails = {
  name: 'Runelord Brass',
  type: 'spray',
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

export const sprayWhiteScar: PaintDetails = {
  name: 'White Scar',
  type: 'spray',
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

import { PaintDetailsCitadel } from '../../../types';

export enum TechnicalPaintImages {
  AgrellanBadland = 'AgrellanBadland',
  AgrellanEarth = 'AgrellanEarth',
  ArmageddonDunes = 'ArmageddonDunes',
  ArmageddonDust = 'ArmageddonDust',
  Astrogranite = 'Astrogranite',
  AstrograniteDebris = 'AstrograniteDebris',
  MartianIroncrust = 'MartianIroncrust',
  MartianIronearth = 'MartianIronearth',
  MordantEarth = 'MordantEarth',
  StirlandBattlemire = 'StirlandBattlemire',
  StirlandMud = 'StirlandMud',
  ValhallanBlizzard = 'ValhallanBlizzard',
}

export const technicalBloodForTheBloodGod: PaintDetailsCitadel = {
  name: 'Blood For The Blood God',
  category: 'Citadel All',
  type: 'technical',
  color: 'red',
  hex: '#600005',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(0, 0, 0)' },
    { offset: 100, color: 'rgb(96, 0, 5)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalNihilakhOxide: PaintDetailsCitadel = {
  name: 'Nihilakh Oxide',
  category: 'Citadel All',
  type: 'technical',
  color: 'green',
  hex: '#66B39A',
  availability: 'available',
  company: 'Citadel',
};

export const technicalNurglesRot: PaintDetailsCitadel = {
  name: 'Nurgles Rot',
  category: 'Citadel All',
  type: 'technical',
  color: 'green',
  hex: '#9D8B16',
  availability: 'available',
  company: 'Citadel',
};

export const technicalTyphusCorrosion: PaintDetailsCitadel = {
  name: 'Typhus Corrosion',
  category: 'Citadel All',
  type: 'technical',
  color: 'brown',
  hex: '#373A22',
  availability: 'available',
  company: 'Citadel',
};

export const technicalSpiritstoneRed: PaintDetailsCitadel = {
  name: 'Spiritstone Red',
  category: 'Citadel All',
  type: 'technical',
  color: 'red',
  hex: '#7C1100',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(218, 35, 8)' },
    { offset: 100, color: 'rgb(124, 17, 0)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalSoulstoneBlue: PaintDetailsCitadel = {
  name: 'Soulstone Blue',
  category: 'Citadel All',
  type: 'technical',
  color: 'blue',
  hex: '#01458F',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(1, 69, 143)' },
    { offset: 100, color: 'rgb(1, 21, 75)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalWaystoneGreen: PaintDetailsCitadel = {
  name: 'Waystone Green',
  category: 'Citadel All',
  type: 'technical',
  color: 'green',
  hex: '#007958',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(0, 121, 88)' },
    { offset: 100, color: 'rgb(0, 56, 31)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalMordantEarth: PaintDetailsCitadel = {
  name: 'Mordant Earth',
  category: 'Citadel All',
  type: 'technical',
  color: 'black',
  hex: '#4B4849',
  img: TechnicalPaintImages.MordantEarth,
  gradient: [
    { offset: 0, color: 'rgb(23, 19, 20)' },
    { offset: 100, color: 'rgb(75, 72, 73)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalAgrellanEarth: PaintDetailsCitadel = {
  name: 'Agrellan Earth',
  category: 'Citadel All',
  type: 'technical',
  color: 'brown',
  hex: '#948165',
  img: TechnicalPaintImages.AgrellanEarth,
  gradient: [
    { offset: 0, color: 'rgb(179, 158, 128)' },
    { offset: 100, color: 'rgb(148, 129, 101)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalAgrellanBadland: PaintDetailsCitadel = {
  name: 'Agrellan Badland',
  category: 'Citadel All',
  type: 'technical',
  color: 'brown',
  hex: '#948165',
  img: TechnicalPaintImages.AgrellanBadland,
  gradient: [
    { offset: 0, color: 'rgb(179, 158, 128)' },
    { offset: 100, color: 'rgb(148, 129, 101)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalMartianIronearth: PaintDetailsCitadel = {
  name: 'Martian Ironearth',
  category: 'Citadel All',
  type: 'technical',
  color: 'red',
  hex: '#9B5041',
  img: TechnicalPaintImages.MartianIronearth,
  gradient: [
    { offset: 0, color: 'rgb(207, 112, 93)' },
    { offset: 100, color: 'rgb(155, 80, 65)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalMartianIroncrust: PaintDetailsCitadel = {
  name: 'Martian Ironcrust',
  category: 'Citadel All',
  type: 'technical',
  color: 'red',
  hex: '#9B5041',
  img: TechnicalPaintImages.MartianIroncrust,
  gradient: [
    { offset: 0, color: 'rgb(207, 112, 93)' },
    { offset: 100, color: 'rgb(155, 80, 65)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalStirlandMud: PaintDetailsCitadel = {
  name: 'Stirland Mud',
  category: 'Citadel All',
  type: 'technical',
  color: 'brown',
  hex: '#482B00',
  img: TechnicalPaintImages.StirlandMud,
  gradient: [
    { offset: 0, color: 'rgb(112, 73, 13)' },
    { offset: 100, color: 'rgb(72, 43, 0)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalStirlandBattlemire: PaintDetailsCitadel = {
  name: 'Stirland Battlemire',
  category: 'Citadel All',
  type: 'technical',
  color: 'brown',
  hex: '#482B00',
  img: TechnicalPaintImages.StirlandBattlemire,
  gradient: [
    { offset: 0, color: 'rgb(112, 73, 13)' },
    { offset: 100, color: 'rgb(72, 43, 0)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalArmageddonDust: PaintDetailsCitadel = {
  name: 'Armageddon Dust',
  category: 'Citadel All',
  type: 'technical',
  color: 'brown',
  hex: '#D2AD00',
  img: TechnicalPaintImages.ArmageddonDust,
  gradient: [
    { offset: 0, color: 'rgb(232, 211, 111)' },
    { offset: 100, color: 'rgb(210, 173, 0)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalArmageddonDunes: PaintDetailsCitadel = {
  name: 'Armageddon Dunes',
  category: 'Citadel All',
  type: 'technical',
  color: 'brown',
  hex: '#E8D36F',
  img: TechnicalPaintImages.ArmageddonDunes,
  gradient: [
    { offset: 0, color: 'rgb(232, 211, 111)' },
    { offset: 100, color: 'rgb(210, 173, 0)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalAstrogranite: PaintDetailsCitadel = {
  name: 'Astrogranite',
  category: 'Citadel All',
  type: 'technical',
  color: 'grey',
  hex: '#9D9D9D',
  img: TechnicalPaintImages.Astrogranite,
  gradient: [
    { offset: 0, color: 'rgb(157, 157, 157)' },
    { offset: 100, color: 'rgb(118, 118, 117)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalAstrograniteDebris: PaintDetailsCitadel = {
  name: 'Astrogranite Debris',
  category: 'Citadel All',
  type: 'technical',
  color: 'grey',
  hex: '#9D9D9D',
  img: TechnicalPaintImages.AstrograniteDebris,
  gradient: [
    { offset: 0, color: 'rgb(157, 157, 157)' },
    { offset: 100, color: 'rgb(118, 118, 117)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalValhallanBlizzard: PaintDetailsCitadel = {
  name: 'Valhallan Blizzard',
  category: 'Citadel All',
  type: 'technical',
  color: 'white',
  hex: '#E1E1E1',
  img: TechnicalPaintImages.ValhallanBlizzard,
  gradient: [
    { offset: 0, color: 'rgb(225, 225, 225)' },
    { offset: 100, color: 'rgb(225, 225, 225)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalLahmianMedium: PaintDetailsCitadel = {
  name: 'Lahmian Medium',
  category: 'Citadel All',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalArdcoat: PaintDetailsCitadel = {
  name: 'Ardcoat',
  category: 'Citadel All',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalContrastMedium: PaintDetailsCitadel = {
  name: 'Contrast Medium',
  category: 'Citadel All',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalStormShield: PaintDetailsCitadel = {
  name: 'StormShield',
  category: 'Citadel All',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
  availability: 'available',
  company: 'Citadel',
};

export const technicalTesseractGlow: PaintDetailsCitadel = {
  name: 'Tesseract Glow',
  category: 'Citadel All',
  type: 'technical',
  color: 'green',
  hex: '#49AD33',
  availability: 'available',
  company: 'Citadel',
};

export const technicalPaints = [
  technicalBloodForTheBloodGod,
  technicalNihilakhOxide,
  technicalNurglesRot,
  technicalTyphusCorrosion,
  technicalSpiritstoneRed,
  technicalSoulstoneBlue,
  technicalWaystoneGreen,
  technicalMordantEarth,
  technicalAgrellanEarth,
  technicalAgrellanBadland,
  technicalMartianIronearth,
  technicalMartianIroncrust,
  technicalStirlandMud,
  technicalStirlandBattlemire,
  technicalArmageddonDust,
  technicalArmageddonDunes,
  technicalAstrogranite,
  technicalAstrograniteDebris,
  technicalValhallanBlizzard,
  technicalLahmianMedium,
  technicalArdcoat,
  technicalContrastMedium,
  technicalStormShield,
  technicalTesseractGlow,
];

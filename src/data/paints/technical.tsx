import { PaintDetails } from '../../types/app.types';
import AgrellanBadland from '../../../content/assets/svg/paints/technicalAgrellanBadland.svg';
import AgrellanEarth from '../../../content/assets/svg/paints/technicalAgrellanEarth.svg';
import ArmageddonDunes from '../../../content/assets/svg/paints/technicalArmageddonDunes.svg';
import ArmageddonDust from '../../../content/assets/svg/paints/technicalArmageddonDust.svg';
import Astrogranite from '../../../content/assets/svg/paints/technicalAstrogranite.svg';
import AstrograniteDebris from '../../../content/assets/svg/paints/technicalAstrograniteDebris.svg';
import MartianIroncrust from '../../../content/assets/svg/paints/technicalMartianIroncrust.svg';
import MartianIronearth from '../../../content/assets/svg/paints/technicalMartianIronearth.svg';
import MordantEarth from '../../../content/assets/svg/paints/technicalMordantEarth.svg';
import StirlandBattlemire from '../../../content/assets/svg/paints/technicalStirlandBattlemire.svg';
import StirlandMud from '../../../content/assets/svg/paints/technicalStirlandMud.svg';
import ValhallanBlizzard from '../../../content/assets/svg/paints/technicalValhallanBlizzard.svg';

import React from 'react';

export const technicalBloodForTheBloodGod: PaintDetails = {
  name: 'Blood For The Blood God',
  type: 'technical',
  color: 'red',
  hex: '#600005',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(0, 0, 0)' },
    { offset: 100, color: 'rgb(96, 0, 5)' },
  ],
};

export const technicalNihilakhOxide: PaintDetails = {
  name: 'Nihilakh Oxide',
  type: 'technical',
  color: 'green',
  hex: '#66B39A',
};

export const technicalNurglesRot: PaintDetails = {
  name: 'Nurgles Rot',
  type: 'technical',
  color: 'green',
  hex: '#9D8B16',
};

export const technicalTyphusCorrosion: PaintDetails = {
  name: 'Typhus Corrosion',
  type: 'technical',
  color: 'brown',
  hex: '#373A22',
};

export const technicalSpiritstoneRed: PaintDetails = {
  name: 'Spiritstone Red',
  type: 'technical',
  color: 'red',
  hex: '#7C1100',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(218, 35, 8)' },
    { offset: 100, color: 'rgb(124, 17, 0)' },
  ],
};

export const technicalSoulstoneBlue: PaintDetails = {
  name: 'Soulstone Blue',
  type: 'technical',
  color: 'blue',
  hex: '#01458F',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(1, 69, 143)' },
    { offset: 100, color: 'rgb(1, 21, 75)' },
  ],
};

export const technicalWaystoneGreen: PaintDetails = {
  name: 'Waystone Green',
  type: 'technical',
  color: 'green',
  hex: '#007958',
  gloss: true,
  gradient: [
    { offset: 0, color: 'rgb(0, 121, 88)' },
    { offset: 100, color: 'rgb(0, 56, 31)' },
  ],
};

export const technicalNighthauntGloom: PaintDetails = {
  name: 'Nighthaunt Gloom',
  type: 'technical',
  color: 'blue',
  hex: '#4C838A',
};

export const technicalHexwraithFlame: PaintDetails = {
  name: 'Hexwraith Flame',
  type: 'technical',
  color: 'green',
  hex: '#00A237',
};

export const technicalMordantEarth: PaintDetails = {
  name: 'Mordant Earth',
  type: 'technical',
  color: 'black',
  hex: '#4B4849',
  img: <MordantEarth />,
  gradient: [
    { offset: 0, color: 'rgb(23, 19, 20)' },
    { offset: 100, color: 'rgb(75, 72, 73)' },
  ],
};

export const technicalAgrellanEarth: PaintDetails = {
  name: 'Agrellan Earth',
  type: 'technical',
  color: 'brown',
  hex: '#948165',
  img: <AgrellanEarth />,
  gradient: [
    { offset: 0, color: 'rgb(179, 158, 128)' },
    { offset: 100, color: 'rgb(148, 129, 101)' },
  ],
};

export const technicalAgrellanBadland: PaintDetails = {
  name: 'Agrellan Badland',
  type: 'technical',
  color: 'brown',
  hex: '#948165',
  img: <AgrellanBadland />,
  gradient: [
    { offset: 0, color: 'rgb(179, 158, 128)' },
    { offset: 100, color: 'rgb(148, 129, 101)' },
  ],
};

export const technicalMartianIronearth: PaintDetails = {
  name: 'Martian Ironearth',
  type: 'technical',
  color: 'red',
  hex: '#9B5041',
  img: <MartianIronearth />,
  gradient: [
    { offset: 0, color: 'rgb(207, 112, 93)' },
    { offset: 100, color: 'rgb(155, 80, 65)' },
  ],
};

export const technicalMartianIroncrust: PaintDetails = {
  name: 'Martian Ironcrust',
  type: 'technical',
  color: 'red',
  hex: '#9B5041',
  img: <MartianIroncrust />,
  gradient: [
    { offset: 0, color: 'rgb(207, 112, 93)' },
    { offset: 100, color: 'rgb(155, 80, 65)' },
  ],
};

export const technicalStirlandMud: PaintDetails = {
  name: 'Stirland Mud',
  type: 'technical',
  color: 'brown',
  hex: '#482B00',
  img: <StirlandMud />,
  gradient: [
    { offset: 0, color: 'rgb(112, 73, 13)' },
    { offset: 100, color: 'rgb(72, 43, 0)' },
  ],
};

export const technicalStirlandBattlemire: PaintDetails = {
  name: 'Stirland Battlemire',
  type: 'technical',
  color: 'brown',
  hex: '#482B00',
  img: <StirlandBattlemire />,
  gradient: [
    { offset: 0, color: 'rgb(112, 73, 13)' },
    { offset: 100, color: 'rgb(72, 43, 0)' },
  ],
};

export const technicalArmageddonDust: PaintDetails = {
  name: 'Armageddon Dust',
  type: 'technical',
  color: 'brown',
  hex: '#D2AD00',
  img: <ArmageddonDust />,
  gradient: [
    { offset: 0, color: 'rgb(232, 211, 111)' },
    { offset: 100, color: 'rgb(210, 173, 0)' },
  ],
};

export const technicalArmageddonDunes: PaintDetails = {
  name: 'Armageddon Dunes',
  type: 'technical',
  color: 'brown',
  hex: '#E8D36F',
  img: <ArmageddonDunes />,
  gradient: [
    { offset: 0, color: 'rgb(232, 211, 111)' },
    { offset: 100, color: 'rgb(210, 173, 0)' },
  ],
};

export const technicalAstrogranite: PaintDetails = {
  name: 'Astrogranite',
  type: 'technical',
  color: 'grey',
  hex: '#9D9D9D',
  img: <Astrogranite />,
  gradient: [
    { offset: 0, color: 'rgb(157, 157, 157)' },
    { offset: 100, color: 'rgb(118, 118, 117)' },
  ],
};

export const technicalAstrograniteDebris: PaintDetails = {
  name: 'Astrogranite Debris',
  type: 'technical',
  color: 'grey',
  hex: '#9D9D9D',
  img: <AstrograniteDebris />,
  gradient: [
    { offset: 0, color: 'rgb(157, 157, 157)' },
    { offset: 100, color: 'rgb(118, 118, 117)' },
  ],
};

export const technicalValhallanBlizzard: PaintDetails = {
  name: 'Valhallan Blizzard',
  type: 'technical',
  color: 'white',
  hex: '#E1E1E1',
  img: <ValhallanBlizzard />,
  gradient: [
    { offset: 0, color: 'rgb(225, 225, 225)' },
    { offset: 100, color: 'rgb(225, 225, 225)' },
  ],
};

export const technicalLahmianMedium: PaintDetails = {
  name: 'Lahmian Medium',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
};

export const technicalArdcoat: PaintDetails = {
  name: 'Ardcoat',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
};

export const technicalContrastMedium: PaintDetails = {
  name: 'Contrast Medium',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
};

export const technicalStormShield: PaintDetails = {
  name: 'StormShield',
  type: 'technical',
  color: 'clear',
  hex: '#E1E1E1',
  stroke: '#6b6b6b',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(218, 218, 218)' },
  ],
};

export const technicalTesseractGlow: PaintDetails = {
  name: 'Tesseract Glow',
  type: 'technical',
  color: 'green',
  hex: '#49AD33',
};

export const technicalPaints = [
  technicalBloodForTheBloodGod,
  technicalNihilakhOxide,
  technicalNurglesRot,
  technicalTyphusCorrosion,
  technicalSpiritstoneRed,
  technicalSoulstoneBlue,
  technicalWaystoneGreen,
  technicalNighthauntGloom,
  technicalHexwraithFlame,
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

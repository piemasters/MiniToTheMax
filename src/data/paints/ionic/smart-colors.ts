import { PaintDetailsIonic } from '../types';

export const smartColorBrass: PaintDetailsIonic = {
  name: 'Brass',
  category: 'IONIC Smart Colors',
  type: ['metallic'],
  color: 'brass',
  hex: '#D9B73B',
  gradient: [
    { offset: 0, color: 'rgb(254, 245, 179)' },
    { offset: 50, color: 'rgb(188, 149, 42)' },
    { offset: 100, color: 'rgb(100, 73, 21)' },
  ],
  availability: 'available',
  company: 'Ionic',
};

export const smartColorBlack: PaintDetailsIonic = {
  name: 'Black',
  category: 'IONIC Smart Colors',
  type: ['core'],
  color: 'black',
  hex: '#000000',
  availability: 'available',
  company: 'Ionic',
};

export const smartColorSuperheroRed: PaintDetailsIonic = {
  name: 'Superhero Red',
  category: 'IONIC Smart Colors',
  type: ['core'],
  color: 'red',
  hex: '#E6002E',
  availability: 'available',
  company: 'Ionic',
};

export const smartColorPaints = [
  smartColorBrass,
  smartColorBlack,
  smartColorSuperheroRed,
];

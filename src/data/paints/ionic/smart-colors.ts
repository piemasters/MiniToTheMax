import { PaintDetailsIonic } from '../types';

export const smartColorBrass: PaintDetailsIonic = {
  name: 'Dead White',
  number: '72.001',
  category: 'IONIC Smart Colors',
  type: ['core'],
  color: 'white',
  hex: '#FFFFFF',
  availability: 'available',
  company: 'Ionic',
  stroke: '#6b6b6b',
};

export const smartColorBlack: PaintDetailsIonic = {
  name: 'Aluminium',
  number: '77.701',
  category: 'IONIC Smart Colors',
  type: ['metallic'],
  color: 'silver',
  hex: '#C8C7CC',
  gradient: [
    { offset: 0, color: 'rgb(224, 224, 226)' },
    { offset: 50, color: 'rgb(201, 200, 205)' },
    { offset: 100, color: 'rgb(161, 160, 166)' },
  ],
  availability: 'available',
  company: 'Ionic',
};

export const smartColorPaints = [smartColorBrass, smartColorBlack];

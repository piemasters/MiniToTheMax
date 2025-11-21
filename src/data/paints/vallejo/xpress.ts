import { PaintDetailsVallejo } from '../types';

export const xpressColorTemplarWhite: PaintDetailsVallejo = {
  name: 'Templar White',
  number: '72.401',
  category: 'Vallejo Xpress Color',
  type: ['one-coat'],
  color: 'white',
  hex: '#D0D3D2',
  gradient: [
    { offset: 0, color: 'rgb(255, 255, 255)' },
    { offset: 100, color: 'rgb(102, 124, 123)' },
  ],
  availability: 'available',
  company: 'Vallejo',
};

export const xpressColorSnakeGreen: PaintDetailsVallejo = {
  name: 'Snake Green',
  number: '72.417',
  category: 'Vallejo Xpress Color',
  type: ['one-coat'],
  color: 'green',
  hex: '#123C30',
  gradient: [
    { offset: 0, color: 'rgb(0, 106, 69)' },
    { offset: 100, color: 'rgb(16, 60, 48)' },
  ],
  availability: 'available',
  company: 'Vallejo',
};

export const xpressColorPaints = [
  xpressColorTemplarWhite,
  xpressColorSnakeGreen,
];

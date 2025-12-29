export const PaintCompanies = ['Citadel', 'Vallejo'] as const;
export type PaintCompany = (typeof PaintCompanies)[number];

// Categories defined in priority order so the correct paint is rendered for duplicate names
export const CitadelPaintCategories = [
  'Citadel Base',
  'Citadel Layer',
  'Citadel Contrast',
  'Citadel Air',
  'Citadel Dry',
  'Citadel Shade',
  'Citadel Spray',
  'Citadel Technical',
] as const;
export type CitadelPaintCategory = (typeof CitadelPaintCategories)[number];

export const VallejoPaintCategories = [
  'Vallejo Game Color',
  'Vallejo Model Color',
  'Vallejo Liquid Metal',
  'Vallejo Model Air',
  'Vallejo Metal Color',
  'Vallejo Game Air',
  'Vallejo Xpress Color',
] as const;
export type VallejoPaintCategory = (typeof VallejoPaintCategories)[number];

export const AllPaintCategories = [
  ...CitadelPaintCategories,
  ...VallejoPaintCategories,
];
export type PaintCategory = (typeof AllPaintCategories)[number];

export const PaintColors = [
  'black',
  'blue',
  'bone',
  'brass',
  'bronze',
  'brown',
  'clear',
  'copper',
  'flesh',
  'gold',
  'green',
  'grey',
  'orange',
  'pink',
  'purple',
  'red',
  'silver',
  'turquoise',
  'white',
  'yellow',
] as const;
export type PaintColor = (typeof PaintColors)[number];

export const PaintTypes = [
  'air',
  'core', // Citadel base/layer, Vallejo default
  'dry',
  'fluorescent',
  'ink',
  'intense',
  'metallic',
  'one-coat', // Citadel contrast, Vallejo xpress
  'spray',
  'technical', // Citadel technical, Vallejo special effects
  'wash', // Citadel shade, Vallejo wash
] as const;
export type PaintType = (typeof PaintTypes)[number];

export const PaintAvailabilities = ['available', 'discontinued'] as const;
export type PaintAvailability = (typeof PaintAvailabilities)[number];

export interface PaintGradient {
  offset: number;
  color: string;
  opacity?: number;
}

export interface PaintDetails {
  name: string;
  type: PaintType[];
  color: PaintColor;
  hex: string;
  gradient?: PaintGradient[];
  availability: PaintAvailability;
  company: string;
  category: PaintCategory;
  stroke?: string;
  gloss?: boolean;
  img?: string;
  number?: string;
}

export type CitadelTechnicalPaintImages =
  | 'AgrellanBadland'
  | 'AgrellanEarth'
  | 'ArmageddonDunes'
  | 'ArmageddonDust'
  | 'Astrogranite'
  | 'AstrograniteDebris'
  | 'MartianIroncrust'
  | 'MartianIronearth'
  | 'MordantEarth'
  | 'StirlandBattlemire'
  | 'StirlandMud'
  | 'ValhallanBlizzard';

export interface PaintDetailsCitadel extends PaintDetails {
  img?: CitadelTechnicalPaintImages;
  company: 'Citadel';
  category: CitadelPaintCategory;
}

export interface PaintDetailsVallejo extends PaintDetails {
  company: 'Vallejo';
  number: string;
  category: VallejoPaintCategory;
}

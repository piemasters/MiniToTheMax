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
  'Citadel Tone Pro',
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
  'Vallejo Mecha Color',
  'Vallejo True Metallic Metal',
] as const;
export type VallejoPaintCategory = (typeof VallejoPaintCategories)[number];

export const IonicPaintCategories = ['IONIC Smart Colors'] as const;
export type IonicPaintCategory = (typeof IonicPaintCategories)[number];

// Adding a brand: add its categories above and one entry here.
export const PaintCategoriesByCompany = {
  Citadel: CitadelPaintCategories,
  Vallejo: VallejoPaintCategories,
  Ionic: IonicPaintCategories,
} as const;

export type PaintCompany = keyof typeof PaintCategoriesByCompany;
export const PaintCompanies = Object.keys(
  PaintCategoriesByCompany
) as PaintCompany[];

export type PaintCategory =
  (typeof PaintCategoriesByCompany)[PaintCompany][number];
// In priority order: earlier categories win when paint names clash
export const AllPaintCategories: PaintCategory[] = Object.values(
  PaintCategoriesByCompany
).flat();

export const getCategoryCompany = (
  category: string
): PaintCompany | undefined =>
  PaintCompanies.find((company) =>
    (PaintCategoriesByCompany[company] as readonly string[]).includes(category)
  );

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
  'core', // Citadel base/layer, Vallejo default, Ionic smart colors
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
  company: PaintCompany;
  category: PaintCategory;
  stroke?: string;
  gloss?: boolean;
  img?: string;
  number?: string;
}

export const CitadelTechnicalPaintImageNames = [
  'AgrellanBadland',
  'AgrellanEarth',
  'ArmageddonDunes',
  'ArmageddonDust',
  'Astrogranite',
  'AstrograniteDebris',
  'MartianIroncrust',
  'MartianIronearth',
  'MordantEarth',
  'StirlandBattlemire',
  'StirlandMud',
  'ValhallanBlizzard',
] as const;
export type CitadelTechnicalPaintImages =
  (typeof CitadelTechnicalPaintImageNames)[number];

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

export interface PaintDetailsIonic extends PaintDetails {
  company: 'Ionic';
  category: IonicPaintCategory;
}

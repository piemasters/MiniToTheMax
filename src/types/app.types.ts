import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { AllMdx, MdxGroupConnection, MdxNode, Site } from './base.types';
import { TechnicalPaintImages } from '../data/paints/citadel/technical';

export interface Posts {
  posts: AllMdx;
}

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  img: IGatsbyImageData;
  excerpt: string;
}

export interface MdxPost {
  site: Site;
  post: MdxNode;
}

export interface Categories {
  categories: AllMdx;
}

export interface Showcase {
  boardGames: IGatsbyImageData;
  gloomspiteGitz: IGatsbyImageData;
  spaceWolves: IGatsbyImageData;
  greyKnights: IGatsbyImageData;
  orks: IGatsbyImageData;
  scenery: IGatsbyImageData;
}

export interface Tutorials {
  fortyThousand: IGatsbyImageData;
  bases: IGatsbyImageData;
  scenery: IGatsbyImageData;
  tools: IGatsbyImageData;
}

export interface Reviews {
  boardGames: IGatsbyImageData;
  books: IGatsbyImageData;
  tools: IGatsbyImageData;
}

export interface BattleReports {
  fortyThousand: IGatsbyImageData;
}

export type Category = MdxGroupConnection;

export interface Tags {
  tags: AllMdx;
}

export type Tag = MdxGroupConnection;

export interface TagLink {
  slug: string;
  title: string;
}

export interface PostLink extends TagLink {
  img: IGatsbyImageData;
}

export interface DisqusConfig {
  identifier: string;
  title: string;
  url: string;
}

export enum BadgeNames {
  tutorials = 'tutorials',
  showcase = 'showcase',
  build = 'build',
  battleReports = 'battleReports',
  reviews = 'reviews',
}

export interface PaintGradient {
  offset: number;
  color: string;
}
export type PaintCompany = 'Citadel' | 'Vallejo';
export type PaintColors =
  | 'black'
  | 'blue'
  | 'bone'
  | 'brass'
  | 'bronze'
  | 'brown'
  | 'clear'
  | 'copper'
  | 'flesh'
  | 'gold'
  | 'green'
  | 'grey'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'silver'
  | 'turquoise'
  | 'white'
  | 'yellow';

export interface PaintDetailsCitadel {
  name: string;
  type:
    | 'air'
    | 'base'
    | 'contrast'
    | 'dry'
    | 'layer'
    | 'shade'
    | 'spray'
    | 'technical';
  color: PaintColors;
  hex: string;
  gradient?: PaintGradient[];
  stroke?: string;
  gloss?: boolean;
  img?: TechnicalPaintImages;
  availability: string;
  company: 'Citadel';
}
export interface PaintDetailsVallejo {
  name: string;
  // type: 'default' | 'wash' | 'fluo' | 'ink' | 'metallic' | 'special fx' | ;
  type: 'layer' | 'shade' | 'contrast' | 'ink' | 'fluo';
  color: PaintColors;
  hex: string;
  availability: string;
  company: 'Vallejo';
  number: string;
  category?:
    | 'Game Color'
    | 'Model Color'
    | 'Liquid Metal'
    | 'Model Air'
    | 'Metal Color'
    | 'Game Air'
    | 'Xpress Color';
  stroke?: string;
}

export type PaintDetails = PaintDetailsCitadel | PaintDetailsVallejo;

export interface PaintDetailsComponent extends Omit<PaintDetails, 'img'> {
  img?: JSX.Element;
}

export interface NavLink {
  name: string;
  url: string;
}

export interface BacklogEntry {
  name: string;
  link?: string;
}

export interface PaintFilters {
  [key: string]: boolean;
}

export interface AllPaintFilters {
  [key: string]: PaintFilters;
}

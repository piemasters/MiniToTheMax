import type { IGatsbyImageData } from 'gatsby-plugin-image';

import { AllMdx, MdxGroupConnection, MdxNode, Site } from './base.types';
import { TechnicalPaintImages } from '../data/paints/technical';

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

export interface PaintDetails {
  [key: string]: string | boolean | PaintGradient[] | JSX.Element | undefined;
  name: string;
  type: string;
  color: string;
  hex: string;
  gradient?: PaintGradient[];
  stroke?: string;
  gloss?: boolean;
  img?: TechnicalPaintImages;
  availability: string;
}
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

import { AllMdx, MdxGroupConnection, MdxNode, MdxFrontmatterGalleryImage, Site } from './base.types';
import {FluidObject} from "gatsby-image";

export interface Posts {
  posts: AllMdx;
}

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  img: FluidObject;
  excerpt: string;
  timeToRead: number;
}

export interface MdxPost {
  site: Site;
  post: MdxNode;
}

export interface Categories {
  categories: AllMdx;
}

export interface Showcase {
  boardGames: MdxFrontmatterGalleryImage;
  gloomspiteGitz: MdxFrontmatterGalleryImage;
  spaceWolves: MdxFrontmatterGalleryImage;
  greyKnights: MdxFrontmatterGalleryImage;
  orks: MdxFrontmatterGalleryImage;
  scenery: MdxFrontmatterGalleryImage;
}

export interface Tutorials {
  fortyThousand: MdxFrontmatterGalleryImage;
  bases: MdxFrontmatterGalleryImage;
  scenery: MdxFrontmatterGalleryImage;
  tools: MdxFrontmatterGalleryImage;
}

export interface Reviews {
  boardGames: MdxFrontmatterGalleryImage;
  books: MdxFrontmatterGalleryImage;
  tools: MdxFrontmatterGalleryImage;
}

export interface BattleReports {
  fortyThousand: MdxFrontmatterGalleryImage;
}

export interface Category extends MdxGroupConnection {}

export interface Tags {
  tags: AllMdx;
}

export interface Tag extends MdxGroupConnection {}

export interface TagLink {
  slug: string;
  title: string;
}

export interface PostLink extends TagLink {
  img: FluidObject;
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
  name: string;
  type: string;
  color: string;
  hex: string;
  gradient?: PaintGradient[];
  stroke?: string;
  gloss?: boolean;
  img?: JSX.Element;
}

// export interface PaintColorFilters {
//   [key: string]: boolean;
//   black: boolean;
//   blue: boolean;
//   bone: boolean;
//   brass: boolean;
//   bronze: boolean;
//   brown: boolean;
//   clear: boolean;
//   copper: boolean;
//   flesh: boolean;
//   gold: boolean;
//   green: boolean;
//   grey: boolean;
//   orange: boolean;
//   pink: boolean;
//   purple: boolean;
//   red: boolean;
//   silver: boolean;
//   turquoise: boolean;
//   white: boolean;
//   yellow: boolean;
// }
//
// export interface PaintTypeFilters {
//   [key: string]: boolean;
//   air: boolean;
//   base: boolean;
//   contrast: boolean;
//   dry: boolean;
//   layer: boolean;
//   shade: boolean;
//   spray: boolean;
//   technical: boolean;
// }
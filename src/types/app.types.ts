import {
  AllMdx,
  MdxGroupConnection,
  MdxNode,
  MdxFrontmatterImage,
  Site,
} from './base.types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface Posts {
  posts: AllMdx;
}

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  img: IGatsbyImageData;
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
  boardGames: MdxFrontmatterImage;
  gloomspiteGitz: MdxFrontmatterImage;
  spaceWolves: MdxFrontmatterImage;
  greyKnights: MdxFrontmatterImage;
  orks: MdxFrontmatterImage;
  scenery: MdxFrontmatterImage;
}

export interface Tutorials {
  fortyThousand: MdxFrontmatterImage;
  bases: MdxFrontmatterImage;
  scenery: MdxFrontmatterImage;
  tools: MdxFrontmatterImage;
}

export interface Reviews {
  boardGames: MdxFrontmatterImage;
  books: MdxFrontmatterImage;
  tools: MdxFrontmatterImage;
}

export interface BattleReports {
  fortyThousand: MdxFrontmatterImage;
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
  img?: JSX.Element;
}

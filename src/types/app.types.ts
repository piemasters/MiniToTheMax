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

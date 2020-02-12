import { AllMdx, MdxGroupConnection, MdxNode, Site } from './base.types';

export interface Posts {
  posts: AllMdx;
}

export interface MdxPost {
  site: Site;
  post: MdxNode;
}

export interface Categories {
  categories: AllMdx;
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

export interface DisqusConfig {
  identifier: string;
  title: string;
  url: string;
}

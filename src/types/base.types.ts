import type { IGatsbyImageData } from 'gatsby-plugin-image';

export type SiteSiteMetadata = {
  title: string;
  author: string;
  description: string;
  siteUrl: string;
  image: string;
};

export interface Site {
  id: string;
  parent: BaseNode;
  children: [BaseNode];
  internal: Internal;
  siteMetadata: SiteSiteMetadata;
  port: number;
  host: string;
  polyfill: boolean;
  pathPrefix: string;
  buildTime: string;
}

export interface MdxNode {
  rawBody: string;
  fileAbsolutePath: string;
  frontmatter: MdxFrontmatter;
  body: string;
  excerpt: string;
  headings: [MdxHeadingMdx];
  html: string;
  mdxAST: JSON;
  tableOfContents: JSON;
  wordCount: MdxWordCount;
  fields: MdxFields;
  id: string;
  parent: BaseNode;
  children: [BaseNode];
  internal: Internal;
}

export type MdxHeadingMdx = {
  value: string;
  depth: number;
};

export type MdxWordCount = {
  paragraphs: number;
  sentences: number;
  words: number;
};

export type MdxFields = {
  slug: string;
};

export type Internal = {
  content: string;
  contentDigest: string;
  description: string;
  fieldOwners: [string];
  ignoreType: boolean;
  mediaType: string;
  owner: string;
  type: string;
};

export interface BaseNode {
  id: string;
  parent: BaseNode;
  children: [BaseNode];
  internal: Internal;
}

export type PageInfo = {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  itemCount: number;
  pageCount: number;
  perPage: number;
};

export type MdxGroupConnection = {
  totalCount: number;
  edges: [MdxEdge];
  nodes: [MdxNode];
  pageInfo: PageInfo;
  field: string;
  fieldValue: string;
};

export interface MdxEdge {
  next: MdxNode;
  node: MdxNode;
  previous: MdxNode;
}

export interface AllMdx {
  totalCount: number;
  edges: [MdxEdge];
  nodes: [MdxNode];
  pageInfo: PageInfo;
  distinct: [string];
  group: [MdxGroupConnection];
}

export interface ImageProp {
  full: IGatsbyImageData;
  thumb: IGatsbyImageData;
  thumbAlt?: string;
  title?: string;
  caption?: string;
}

export interface MdxFrontmatterGalleryImage {
  publicURL: string;
  childImageSharp: ImageProp;
}

export interface MdxFrontmatter {
  title: string;
  date: string;
  categories: [string];
  tags: [string];
  featuredImage: {
    publicURL?: string;
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  gallery: [MdxFrontmatterGalleryImage];
  published: boolean;
}

import { FluidObject } from 'gatsby-image';

export interface SharpFluidObject extends FluidObject {
  presentationWidth: number;
  presentationHeight: number;
}

export interface Theme {
  colors: {
    text: string;
    muted: string;
  };
}

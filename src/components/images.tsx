import React from 'react';
import Img, { FluidObject, GatsbyImageProps } from 'gatsby-image';

export const safeFluid = (f: FluidQuery | FluidObject | null): FluidObject => {
  return {
    aspectRatio: f ? f.aspectRatio || 1 : 1,
    sizes: f ? f.sizes || '' : '',
    src: f ? f.src || '' : '',
    srcSet: f ? f.srcSet || '' : '',
    tracedSVG: f ? f.tracedSVG || '' : '',
  };
};

export const MDXSharpImg = ({
  classes,
  width,
  fluid,
  align,
}: MDXSharpImgProps) => {
  return (
    <span style={{ width: width || '40%' }}>
      <Img fluid={fluid} />
    </span>
  );
};

interface BaseProps {
  align: 'left' | 'right' | 'center';
  width?: string;
}

interface MDXSrcImgProps extends BaseProps {
  src: string;
}

interface MDXSharpImgProps extends BaseProps, GatsbyImageProps {}

export const MDXSrcImg = ({ src, width, align }: MDXSrcImgProps) => {
  return <img style={{ width: width || '40%' }} src={src} />;
};

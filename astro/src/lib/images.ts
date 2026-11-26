import { getImage } from 'astro:assets';
import type { ResponsiveImage } from '../../../src/types/image.types';

/** A cover image in the sizes needed to fill the reading column. */
export const coverImage = async (
  source: ImageMetadata
): Promise<ResponsiveImage> => {
  const { src, srcSet, attributes } = await getImage({
    src: source,
    width: Math.min(source.width, 750),
    layout: 'constrained',
  });
  return {
    src,
    srcSet: srcSet.attribute,
    sizes: attributes.sizes,
    width: attributes.width,
    height: attributes.height,
  };
};

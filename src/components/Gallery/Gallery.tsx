import type { FC } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Gallery as Photoswipe, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

export interface GatsbyGalleryImage {
  full: IGatsbyImageData;
  thumb: IGatsbyImageData;
  title?: string;
  alt?: string;
}

export interface GalleryProps {
  gallery: GatsbyGalleryImage[];
}
/**
 * The Badge component is a combination of an image and text used to represent a category of posts
 */
export const Gallery: FC<GalleryProps> = ({ gallery }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Photoswipe options={{}}>
        {gallery.map((photo: GatsbyGalleryImage) => (
          <Item
            original={photo.full.images.fallback?.src}
            thumbnail={photo.thumb.images.fallback?.src}
            key={photo.thumb.images.fallback?.src}
            height={photo.full.height}
            width={photo.full.width}
          >
            {({ ref, open }) => (
              <div
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                onClick={open}
                aria-hidden="true"
              >
                <GatsbyImage
                  onClick={open}
                  image={photo.thumb}
                  alt="Gallery Image"
                  style={{ margin: '0.25rem', cursor: 'pointer' }}
                />
              </div>
            )}
          </Item>
        ))}
      </Photoswipe>
    </div>
  );
};

export default Gallery;

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
  console.log(gallery);
  // originalSrcset={photo.full.images.fallback?.srcSet}

  return (
    <div
      style={{
        cursor: 'pointer',
        display: 'flex',
        overflow: 'hidden',
        marginBottom: '2rem',
      }}
    >
      <Photoswipe withCaption options={{}}>
        {gallery.map((photo: GatsbyGalleryImage) => (
          <Item
            originalSrcset={
              photo.thumb.images?.sources
                ? photo.thumb.images.sources[0].srcSet
                : ''
            }
            thumbnail={photo.thumb.images.fallback?.src}
            key={photo.thumb.images.fallback?.src}
            width={2000}
            height={900}
            caption={photo.title}
            alt={photo.alt}
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
                  style={{ margin: '0.25rem' }}
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

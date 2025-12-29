import { FC } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Gallery as Photoswipe, Item } from 'react-photoswipe-gallery';

export type GatsbyGalleryImage = {
  full: IGatsbyImageData;
  thumb: IGatsbyImageData;
  title?: string;
  alt?: string;
};

/**
 * The Badge component is a combination of an image and text used to represent a category of posts
 */
export const Gallery: FC<{
  gallery: GatsbyGalleryImage[];
}> = ({ gallery }) => {
  return (
    <div className="flex flex-wrap" data-testid="gallery">
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
              <div ref={ref} onClick={open} aria-hidden="true">
                <GatsbyImage
                  onClick={open}
                  image={photo.thumb}
                  alt="Gallery Image"
                  className="m-1 cursor-pointer"
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

import { FC } from 'react';
import { Gallery as Photoswipe, Item } from 'react-photoswipe-gallery';
import { placeholderStyle } from '../../util/placeholderStyle';

export type GalleryImage = {
  /** The square shown on the page. */
  thumb: string;
  /** The image opened from it, with its size. */
  full: string;
  width: number;
  height: number;
  /** Shown blurred until the thumbnail loads. */
  placeholder?: string;
};

/** Thumbnails which open a full screen, swipeable view of each image. */
export const Gallery: FC<{
  gallery: GalleryImage[];
}> = ({ gallery }) => {
  return (
    <div className="flex flex-wrap" data-testid="gallery">
      <Photoswipe>
        {gallery.map((image, index) => (
          <Item<HTMLImageElement>
            original={image.full}
            thumbnail={image.thumb}
            width={image.width}
            height={image.height}
            key={image.full}
          >
            {({ ref, open }) => (
              <button
                type="button"
                onClick={open}
                className="p-0 m-1! border-0 cursor-pointer"
              >
                <img
                  ref={ref}
                  src={image.thumb}
                  alt={`Gallery image ${index + 1}`}
                  width={169}
                  height={169}
                  style={placeholderStyle(image.placeholder)}
                  loading="lazy"
                />
              </button>
            )}
          </Item>
        ))}
      </Photoswipe>
    </div>
  );
};

export default Gallery;

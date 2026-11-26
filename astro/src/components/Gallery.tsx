import 'photoswipe/dist/photoswipe.css';
import { Gallery as Photoswipe, Item } from 'react-photoswipe-gallery';

export interface GalleryImage {
  thumb: string;
  full: string;
  width: number;
  height: number;
}

export const Gallery = ({ images }: { images: GalleryImage[] }) => (
  <div className="flex flex-wrap" data-testid="gallery">
    <Photoswipe>
      {images.map((image, index) => (
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
              className="p-0 m-1 border-0 cursor-pointer"
            >
              <img
                ref={ref}
                src={image.thumb}
                alt={`Gallery image ${index + 1}`}
                width={169}
                height={169}
                loading="lazy"
              />
            </button>
          )}
        </Item>
      ))}
    </Photoswipe>
  </div>
);

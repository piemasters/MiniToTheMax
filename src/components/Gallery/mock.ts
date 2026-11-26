import type { GalleryImage } from './Gallery';

export const mockGallery: GalleryImage[] = [1, 2, 3, 4, 5].map((number) => ({
  thumb: `/images/example-cover.jpg?thumb=${number}`,
  full: `/images/example-cover.jpg?full=${number}`,
  width: 1800,
  height: 900,
}));

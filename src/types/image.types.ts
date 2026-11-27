/**
 * An image ready to put on a page. The site fills this in from Astro's image
 * processing, so the components don't depend on any framework.
 */
export type ResponsiveImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
  /** Shown blurred until the image loads. */
  placeholder?: string;
};

import type { CSSProperties } from 'react';

/** Fills an image's space with its placeholder until the image covers it. */
export const placeholderStyle = (
  placeholder?: string
): CSSProperties | undefined =>
  placeholder
    ? {
        backgroundImage: `url(${placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

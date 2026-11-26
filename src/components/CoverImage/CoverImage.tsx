import { FC } from 'react';
import type { ResponsiveImage } from '../../types';

export const CoverImage: FC<{
  image: ResponsiveImage;
  title: string;
  tall?: boolean;
  /** Loads straight away: for the image at the top of a page. */
  priority?: boolean;
}> = ({ image, title, tall = false, priority = false }) => {
  return (
    <div className="relative" data-testid="cover-image">
      <img
        {...image}
        alt={title}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className="w-full h-auto"
      />
      <h2
        className={`px-4! py-1! absolute right-4 text-lg! bg-black/70 text-gray-200! ${tall ? 'bottom-5' : 'bottom-0'}`}
      >
        {title}
      </h2>
    </div>
  );
};

export default CoverImage;

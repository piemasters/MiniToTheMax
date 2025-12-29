import React, { FC } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

export const CoverImage: FC<{
  image: IGatsbyImageData;
  title: string;
  tall?: boolean;
}> = ({ image, title, tall = false }) => {
  return (
    <div className="relative" data-testid="cover-image">
      <GatsbyImage alt={title} image={image} />
      <h2
        className={`px-4! py-1! absolute right-4 text-lg! bg-black/70 text-gray-200! ${tall ? 'bottom-5' : 'bottom-0'}`}
      >
        {title}
      </h2>
    </div>
  );
};

export default CoverImage;

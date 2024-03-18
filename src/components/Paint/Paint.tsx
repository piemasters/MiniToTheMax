import React, { FC } from 'react';

import { PaintDetails } from '../../types';
import { getSVG } from './helpers';

export interface PaintProps {
  paint: PaintDetails;
  size?: number;
}

export const Paint: FC<PaintProps> = ({ paint, size = 60 }) => {
  const { name, type, color, hex, gradient, stroke, gloss, img, availability } =
    paint;

  return (
    <div data-testid="paint" className="inline-block m-1 w-[60px]">
      <div className="flex flex-col justify-center">
        <div className="mb-2">
          {getSVG({
            name,
            type,
            color,
            hex,
            gradient,
            stroke,
            gloss,
            img,
            availability,
          })}
        </div>
        <div className="flex-1 text-[0.6rem] leading-4 text-center max-w-full">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Paint;

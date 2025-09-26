import React from 'react';
import { PaintGradient } from '../../../types';

export const getShape = ({
  gradient,
  type,
  hex,
  stroke,
}: {
  gradient?: PaintGradient[];
  type: string | string[];
  hex: string;
  stroke?: string;
}) => {
  const d =
    'M37 51c0-7-6-7-6-7-2 0-2-1-2-2l1-1h2v-2h-3v-2h3l-1-19-1-3s-4-3-4-5l-3-9-4-1-5 1-3 9c0 2-4 5-4 5l-1 3-1 19a413 413 0 0 1 3 2H5v2h2l1 1c0 1 0 2-2 2 0 0-6 0-6 7 0 19 37 19 37 0Zm0 0';
  const paintType = Array.isArray(type) ? type[0] : type;
  if (stroke) {
    return (
      <path
        d={d}
        fill={
          gradient ? `url(#${paintType}_gradient_${hex.substring(1, 7)})` : hex
        }
        stroke={stroke}
        strokeWidth={1}
        strokeMiterlimit={5}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        shapeRendering={'#geometricPrecision'}
      />
    );
  } else {
    return (
      <path
        d={d}
        fill={
          gradient ? `url(#${paintType}_gradient_${hex.substring(1, 7)})` : hex
        }
      />
    );
  }
};

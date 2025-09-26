import React from 'react';

import { PaintGradient } from '../../../types';
import { getColorByBgColor } from './getColorByBgColor';

export const getText = ({
  category,
  hex,
  gradient,
}: {
  category: string;
  hex: string;
  gradient?: PaintGradient[];
}) => {
  if (category === 'Vallejo Game Color') {
    return (
      <g transform="translate(5 41)">
        <text
          x="0"
          y="15"
          fontFamily="sans-serif"
          fontSize="9"
          fill={getColorByBgColor(hex)}
        >
          GAME
        </text>
      </g>
    );
  } else {
    return null;
  }
};

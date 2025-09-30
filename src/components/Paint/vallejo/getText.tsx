import React from 'react';

import { getColorByBgColor } from '../../../util/getColorByBgColor';

export const getText = ({
  category,
  hex,
}: {
  category: string;
  hex: string;
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

import React, { FC } from 'react';

import { PaintDetailsVallejo } from '../../../types';
import { getShape } from './getShape';
import { getGradients } from './getGradients';
import { getText } from './getText';

export const getSVG: FC<PaintDetailsVallejo> = ({
  name,
  category,
  type,
  hex,
  gradient,
  stroke,
  gloss,
  img,
}) => {
  return (
    <svg
      viewBox="0 0 37 70"
      xmlns="http://www.w3.org/2000/svg"
      height={71}
      width={57}
    >
      {getShape({ hex, stroke, type, gradient })}
      {getGradients({ gradient, type, hex, name, gloss })}
      {getText({ category, hex, gradient })}
    </svg>
  );
};

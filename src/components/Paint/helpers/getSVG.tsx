import type { FC } from 'react';

import { PaintDetails } from '../../../types';
import { getGloss } from './getGloss';
import { getGradients } from './getGradients';
import { getShape } from './getShape';
import { getText } from './getText';

export const getSVG: FC<PaintDetails> = ({
  name,
  type,
  hex,
  gradient,
  stroke,
  gloss,
  img,
}) => {
  if (img) {
    return img;
  } else {
    return (
      <svg viewBox="-1 0 52 62" xmlns="http://www.w3.org/2000/svg">
        {getShape({ gradient, type, hex, stroke })}
        {getGradients({ gradient, type, hex, name, gloss })}
        {getGloss({ type, hex, gloss })}
        {getText({ type, hex, gradient })}
      </svg>
    );
  }
};

import React from 'react';

import { PaintGradient } from '../../../types';
import { getStopGradients } from './getStopGradients';

export const getGradients = ({
  gradient,
  type,
  hex,
  name,
  gloss,
}: {
  gradient: PaintGradient[] | undefined;
  type: string | string[];
  hex: string;
  name: string;
  gloss: boolean | undefined;
}) => {
  const paintType = Array.isArray(type) ? type[0] : type;
  if (gradient) {
    const gradients: JSX.Element[] = [];
    if (paintType === 'shade') {
      gradients.push(
        <linearGradient
          y1="100%"
          x1="0%"
          x2="0%"
          y2="0%"
          id={`${paintType}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${paintType}`}
        >
          {getStopGradients(gradient)}
        </linearGradient>
      );
    } else if (paintType === 'technical') {
      gradients.push(
        <linearGradient
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          id={`${paintType}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${paintType}`}
        >
          {getStopGradients(gradient)}
        </linearGradient>
      );
    } else {
      gradients.push(
        <radialGradient
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(18 45) scale(30)"
          id={`${paintType}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${paintType}`}
        >
          {getStopGradients(gradient)}
        </radialGradient>
      );
    }
    if (gloss) {
      // Add gloss effect
    }
    return <defs>{gradients}</defs>;
  } else {
    return null;
  }
};

import { ReactElement } from 'react';
import { textToId } from '../util/textToId';
import type { CitadelPaintCategory, PaintGradient } from '../types';

export const getGradients = ({
  gradient,
  hex,
  name,
  gloss,
  category,
}: {
  gradient?: PaintGradient[];
  hex: string;
  name: string;
  gloss?: boolean;
  category: CitadelPaintCategory;
}) => {
  if (!gradient) return null;

  const gradients: JSX.Element[] = [];

  if (category === 'Citadel Contrast') {
    gradients.push(
      <linearGradient
        y1="0%"
        x1="100%"
        x2="0%"
        y2="0%"
        id={`${textToId(category)}_gradient_${hex.substring(1, 7)}`}
        key={`${textToId(name)}_${textToId(category)}`}
      >
        {getStopGradients(gradient)}
      </linearGradient>
    );
  } else if (category === 'Citadel Shade' || category === 'Citadel Technical') {
    gradients.push(
      <linearGradient
        y1="100%"
        x1="0%"
        x2="0%"
        y2="0%"
        id={`${textToId(category)}_gradient_${hex.substring(1, 7)}`}
        key={`${textToId(name)}_${textToId(category)}`}
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
        gradientTransform="translate(25 32) scale(39)"
        id={`${textToId(category)}_gradient_${hex.substring(1, 7)}`}
        key={`${textToId(name)}_${textToId(category)}`}
      >
        {getStopGradients(gradient)}
      </radialGradient>
    );
  }
  if (gloss) {
    gradients.push(
      <radialGradient
        id={`${textToId(category)}_gloss_gradient_${hex.substring(1, 7)}`}
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(14.5226 43.0942) rotate(25.9038) scale(62.7474 27.1872)"
        key={`${textToId(name)}_${textToId(category)}_gloss`}
      >
        <stop stopColor="white" stopOpacity="0.35" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </radialGradient>
    );
  }
  return <defs>{gradients}</defs>;
};

export const getStopGradients = (gradient: PaintGradient[]) => {
  const gradients: ReactElement[] = [];
  if (gradient) {
    for (const g of gradient) {
      gradients.push(
        <stop
          offset={`${g.offset}%`}
          stopColor={g.color}
          stopOpacity={`${g.opacity || 1}`}
          key={g.offset}
        />
      );
    }
    return gradients;
  }
};

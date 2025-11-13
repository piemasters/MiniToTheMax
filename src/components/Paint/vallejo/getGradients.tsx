import { ReactElement } from 'react';
import { PaintGradient, VallejoPaintCategory } from '../types';
import { textToId } from '../util/textToId';

export const getGradients = ({
  category,
  gradient,
  type,
  hex,
  name,
}: {
  category: VallejoPaintCategory;
  gradient: PaintGradient[] | undefined;
  type: string | string[];
  hex: string;
  name: string;
}) => {
  if (gradient) {
    const gradients: JSX.Element[] = [];
    if (type.includes('shade')) {
      gradients.push(
        <linearGradient
          y1="100%"
          x1="0%"
          x2="0%"
          y2="0%"
          id={`${textToId(category)}_gradient_${hex.substring(1, 7)}`}
          key={`${textToId(name)}_shade`}
        >
          {getStopGradients(gradient)}
        </linearGradient>
      );
    } else if (type.includes('technical')) {
      gradients.push(
        <linearGradient
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          id={`${textToId(category)}_gradient_${hex.substring(1, 7)}`}
          key={`${textToId(name)}_technical`}
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
          id={`${textToId(category)}_gradient_${hex.substring(1, 7)}`}
          key={`${textToId(name)}_default`}
        >
          {getStopGradients(gradient)}
        </radialGradient>
      );
    }
    return <defs>{gradients}</defs>;
  } else {
    return null;
  }
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

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
  type: string;
  hex: string;
  name: string;
  gloss: boolean | undefined;
}) => {
  if (gradient) {
    const gradients: JSX.Element[] = [];
    if (type === 'contrast') {
      gradients.push(
        <linearGradient
          y1="0%"
          x1="100%"
          x2="0%"
          y2="0%"
          id={`${type}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${type}`}
        >
          {getStopGradients(gradient)}
        </linearGradient>
      );
    } else if (type === 'shade' || type === 'technical') {
      gradients.push(
        <linearGradient
          y1="100%"
          x1="0%"
          x2="0%"
          y2="0%"
          id={`${type}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${type}`}
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
          id={`${type}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${type}`}
        >
          {getStopGradients(gradient)}
        </radialGradient>
      );
    }
    if (gloss) {
      gradients.push(
        <radialGradient
          id={`${type}_gloss_gradient_${hex.substring(1, 7)}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(14.5226 43.0942) rotate(25.9038) scale(62.7474 27.1872)"
          key={`${name}_${type}_gloss`}
        >
          <stop stopColor="white" stopOpacity="0.35" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      );
    }
    return <defs>{gradients}</defs>;
  } else {
    return null;
  }
};

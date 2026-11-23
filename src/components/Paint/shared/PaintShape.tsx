import type { PaintDetails } from '../../../types';
import { gradientId } from './gradientId';

export const PaintShape = ({
  d,
  paint: { category, gradient, hex, stroke },
}: {
  d: string;
  paint: PaintDetails;
}) => (
  <path
    d={d}
    fill={gradient ? `url(#${gradientId(category, hex)})` : hex}
    stroke={stroke || undefined}
    strokeWidth={stroke ? 1 : undefined}
    strokeMiterlimit={stroke ? 5 : undefined}
    strokeLinecap={stroke ? 'round' : undefined}
    strokeLinejoin={stroke ? 'round' : undefined}
    shapeRendering={stroke ? 'geometricPrecision' : undefined}
  />
);

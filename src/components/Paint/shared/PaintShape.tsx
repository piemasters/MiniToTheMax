import type { PaintDetails } from '../../../types';

export const PaintShape = ({
  d,
  gradientId,
  paint: { gradient, hex, stroke },
}: {
  d: string;
  gradientId: string;
  paint: PaintDetails;
}) => (
  <path
    d={d}
    fill={gradient ? `url(#${gradientId})` : hex}
    stroke={stroke || undefined}
    strokeWidth={stroke ? 1 : undefined}
    strokeMiterlimit={stroke ? 5 : undefined}
    strokeLinecap={stroke ? 'round' : undefined}
    strokeLinejoin={stroke ? 'round' : undefined}
    shapeRendering={stroke ? 'geometricPrecision' : undefined}
  />
);

import type { PaintGradient, VallejoPaintCategory } from '../types';
import { textToId } from '../util/textToId';

const potShapePath =
  'M37 51c0-7-6-7-6-7-2 0-2-1-2-2l1-1h2v-2h-3v-2h3l-1-19-1-3s-4-3-4-5l-3-9-4-1-5 1-3 9c0 2-4 5-4 5l-1 3-1 19a413 413 0 0 1 3 2H5v2h2l1 1c0 1 0 2-2 2 0 0-6 0-6 7 0 19 37 19 37 0Zm0 0';

export const getShape = ({
  gradient,
  category,
  hex,
  stroke,
}: {
  gradient?: PaintGradient[];
  category: VallejoPaintCategory;
  hex: string;
  stroke?: string;
}) => {
  return (
    <path
      d={potShapePath}
      fill={
        gradient
          ? `url(#${textToId(category)}_gradient_${hex.substring(1, 7)})`
          : hex
      }
      stroke={stroke ? stroke : undefined}
      strokeWidth={stroke ? 1 : undefined}
      strokeMiterlimit={stroke ? 5 : undefined}
      strokeLinecap={stroke ? 'round' : undefined}
      strokeLinejoin={stroke ? 'round' : undefined}
      shapeRendering={stroke ? '#geometricPrecision' : undefined}
    />
  );
};

import type { IonicPaintCategory, PaintGradient } from '../types';
import { textToId } from '../util/textToId';

const potShapePath =
  'M18.5 4C16.567 4 15 5.567 15 7.5V22.5H13.5C12.9477 22.5 12.5 22.9477 12.5 23.5V25.5C12.5 26.0523 12.9477 26.5 13.5 26.5H14.5V67H52.5V26.5H53.5C54.0523 26.5 54.5 26.0523 54.5 25.5V23.5C54.5 22.9477 54.0523 22.5 53.5 22.5H52V7.5C52 5.567 50.433 4 48.5 4H18.5Z';
export const getShape = ({
  gradient,
  category,
  hex,
  stroke,
}: {
  gradient?: PaintGradient[];
  category: IonicPaintCategory;
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

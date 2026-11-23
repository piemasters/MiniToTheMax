import { FC } from 'react';
import { textToId } from './util/textToId';
import type { PaintCompany, PaintDetails } from './types';
import { brands } from './brands';
import { gradientId } from './shared/gradientId';
import { PaintGradient } from './shared/PaintGradient';
import { PaintShape } from './shared/PaintShape';
import { potViewBox, SWATCH_HEIGHT, SWATCH_WIDTH } from './shared/potViewBox';

export const Paint: FC<{ paint: PaintDetails }> = ({ paint }) => {
  const brand = brands[paint.company as PaintCompany];
  if (!brand) return null;

  const { category, company, gradient, hex, name } = paint;

  return (
    <div
      data-testid={`paint_${textToId(company)}_${textToId(name)}_${textToId(category)}`}
      className="inline-block m-1 w-15"
    >
      <div className="flex flex-col justify-center">
        <div className="mb-2">
          {brand.image?.(paint) || (
            <svg
              viewBox={potViewBox(brand.bounds(paint))}
              xmlns="http://www.w3.org/2000/svg"
              height={SWATCH_HEIGHT}
              width={SWATCH_WIDTH}
            >
              <PaintShape d={brand.shapePath(paint)} paint={paint} />
              {gradient && (
                <defs>
                  <PaintGradient
                    id={gradientId(category, hex)}
                    spec={brand.gradient(paint)}
                    stops={gradient}
                  />
                  {brand.defs?.(paint)}
                </defs>
              )}
              {brand.overlay?.(paint)}
            </svg>
          )}
        </div>
        <div className="flex-1 text-[0.6rem] leading-4 text-center max-w-full">
          {brand.label?.(paint) ?? name}
        </div>
      </div>
    </div>
  );
};

export default Paint;

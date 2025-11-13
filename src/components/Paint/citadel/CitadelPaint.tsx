import { FC } from 'react';
import { textToId } from '../util/textToId';
import type { PaintDetailsCitadel } from '../types';
import { getImage } from './getImage';
import { getShape } from './getShape';
import { getGradients } from './getGradients';
import { getGloss } from './getGloss';
import { getText } from './getText';

export const CitadelPaint: FC<PaintDetailsCitadel> = ({
  availability,
  category,
  color,
  company,
  gloss,
  gradient,
  hex,
  img,
  name,
  stroke,
  type,
}) => {
  return (
    <div
      data-testid={`paint_${textToId(company)}_${textToId(name)}_${textToId(category)}`}
      className="inline-block m-1 w-[60px]"
    >
      <div className="flex flex-col justify-center">
        <div className="mb-2">
          {img ? (
            getImage(img)
          ) : (
            <svg
              viewBox="-1 0 52 62"
              xmlns="http://www.w3.org/2000/svg"
              height={71}
              width={57}
            >
              {getShape({ category, gradient, hex, stroke })}
              {getGradients({ category, gradient, hex, name, gloss })}
              {getGloss({ category, hex, gloss })}
              {getText({ category, hex, gradient })}
            </svg>
          )}
        </div>
        <div className="flex-1 text-[0.6rem] leading-4 text-center max-w-full">
          {name}
        </div>
      </div>
    </div>
  );
};

export default CitadelPaint;

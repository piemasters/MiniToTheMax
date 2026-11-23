import { FC } from 'react';
import { textToId } from '../util/textToId';
import type { PaintDetailsIonic } from '../types';
import { getShape } from './getShape';
import { getGradients } from './getGradients';
import { getText } from './getText';

export const IonicPaint: FC<PaintDetailsIonic> = ({
  // availability,
  category,
  // color,
  company,
  //gloss,
  gradient,
  hex,
  //img,
  name,
  stroke,
  type,
}) => {
  return (
    <div
      data-testid={`paint_${textToId(company)}_${textToId(name)}_${textToId(category)}`}
      className="inline-block m-1 w-15"
    >
      <div className="flex flex-col justify-center">
        <div className="mb-2">
          <svg
            viewBox="-5 0 67 71"
            xmlns="http://www.w3.org/2000/svg"
            height={71}
            width={57}
          >
            {getShape({ category, gradient, hex, stroke })}
            {getGradients({ category, gradient, type, hex, name })}
            {getText({ category, hex })}
          </svg>
        </div>
        <div className="flex-1 text-[0.6rem] leading-4 text-center max-w-full">
          {name}
        </div>
      </div>
    </div>
  );
};

export default IonicPaint;

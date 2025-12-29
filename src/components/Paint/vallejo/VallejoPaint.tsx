import { FC } from 'react';
import { textToId } from '../util/textToId';
import { PaintDetailsVallejo } from '../types';
import { getShape } from './getShape';
import { getGradients } from './getGradients';
import { getText } from './getText';

export const VallejoPaint: FC<PaintDetailsVallejo> = ({
  availability,
  category,
  color,
  company,
  gloss,
  gradient,
  hex,
  img,
  name,
  number,
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
          <svg
            viewBox="0 0 37 70"
            xmlns="http://www.w3.org/2000/svg"
            height={71}
            width={57}
          >
            {getShape({ category, hex, stroke, gradient })}
            {getGradients({ category, gradient, type, hex, name })}
            {getText({ category, hex })}
          </svg>
        </div>
        <div className="flex-1 text-[0.6rem] leading-4 text-center max-w-full">
          {name} {`(${number})`}
        </div>
      </div>
    </div>
  );
};

export default VallejoPaint;

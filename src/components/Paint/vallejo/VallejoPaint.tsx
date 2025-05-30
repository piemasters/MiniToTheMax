import React, { FC } from 'react';

import { getSVG } from './getSVG';
import { PaintDetailsVallejo } from '../../../types';

export interface PaintProps {
  paint: PaintDetailsVallejo;
}

export const VallejoPaint: FC<PaintProps> = ({ paint }) => {
  const { name, type, color, hex, availability, company, number, category } =
    paint;

  return (
    <div data-testid="paint" className="inline-block m-1 w-[60px]">
      <div className="flex flex-col justify-center">
        <div className="mb-2">{getSVG(paint)}</div>
        <div className="flex-1 text-[0.6rem] leading-4 text-center max-w-full">
          {name} {`(${number})`}
        </div>
      </div>
    </div>
  );
};

export default VallejoPaint;

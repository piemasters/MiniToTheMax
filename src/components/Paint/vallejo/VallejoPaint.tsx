import React, { FC } from 'react';

import { getSVG } from './getSVG';
import { PaintDetailsVallejo } from '../../../types';

export const VallejoPaint: FC<{ paint: PaintDetailsVallejo }> = ({ paint }) => {
  return (
    <div
      data-testid={`paint_${paint.name}_${paint.type.toString()}`}
      className="inline-block m-1 w-[60px]"
    >
      <div className="flex flex-col justify-center">
        <div className="mb-2">{getSVG(paint)}</div>
        <div className="flex-1 text-[0.6rem] leading-4 text-center max-w-full">
          {paint.name} {`(${paint.number})`}
        </div>
      </div>
    </div>
  );
};

export default VallejoPaint;

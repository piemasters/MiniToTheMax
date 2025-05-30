import React, { FC } from 'react';

import { PaintDetailsVallejo } from '../../../types';
import { getShape } from './getShape';

export const getSVG: FC<PaintDetailsVallejo> = ({ hex, stroke }) => {
  return (
    <svg
      viewBox="0 0 37 70"
      xmlns="http://www.w3.org/2000/svg"
      height={71}
      width={57}
    >
      {getShape({ hex, stroke })}
    </svg>
  );
};

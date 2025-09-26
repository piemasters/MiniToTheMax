import React, { ReactElement } from 'react';

import { PaintGradient } from '../../../types';

export const getStopGradients = (gradient: PaintGradient[]) => {
  const gradients: ReactElement[] = [];
  if (gradient) {
    for (const g of gradient) {
      gradients.push(
        <stop
          offset={`${g.offset}%`}
          stopColor={g.color}
          stopOpacity={`${g.opacity || 1}`}
          key={g.offset}
        />
      );
    }
    return gradients;
  }
};

import React, { FC } from 'react';

import { PaintDetails } from '../../types';
import VallejoPaint from './vallejo/VallejoPaint';
import CitadelPaint from './citadel/CitadelPaint';

export interface PaintProps {
  paint: PaintDetails;
}

export const Paint: FC<PaintProps> = ({ paint }) => {
  if (paint.company === 'Citadel') {
    return <CitadelPaint paint={paint} />;
  }

  if (paint.company === 'Vallejo') {
    return <VallejoPaint paint={paint} />;
  }
};

export default Paint;

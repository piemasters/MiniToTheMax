import React, { FC } from 'react';

import {
  PaintDetails,
  PaintDetailsVallejo,
  PaintDetailsCitadel,
} from '../../types';
import VallejoPaint from './vallejo/VallejoPaint';
import CitadelPaint from './citadel/CitadelPaint';

export const Paint: FC<{ paint: PaintDetails }> = ({ paint }) => {
  if (paint.company === 'Vallejo') {
    return <VallejoPaint paint={paint as PaintDetailsVallejo} />;
  }
  return <CitadelPaint paint={paint as PaintDetailsCitadel} />;
};

export default Paint;

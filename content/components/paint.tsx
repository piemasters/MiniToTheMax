import React from 'react';
import BasePaint from '../../src/components/paint';
import { airPaints } from '../../src/data/paints/air';
import { basePaints } from '../../src/data/paints/base';
import { contrastPaints } from '../../src/data/paints/contrast';
import { dryPaints } from '../../src/data/paints/dry';
import { layerPaints } from '../../src/data/paints/layer';
import { shadePaints } from '../../src/data/paints/shade';
import { sprayPaints } from '../../src/data/paints/spray';
import { technicalPaints } from '../../src/data/paints/technical';
import { PaintDetails } from '../../src/types/app.types';

const allPaints = [
  ...basePaints,
  ...layerPaints,
  ...shadePaints,
  ...contrastPaints,
  ...dryPaints,
  ...sprayPaints,
  ...technicalPaints,
  ...airPaints,
];

const Paint = ({
  name,
  type,
}: {
  name: string;
  type?: string;
}): React.ReactNode => {
  const paintMatches: PaintDetails[] = allPaints.filter(
    (paint) => paint.name === name
  );

  if (!paintMatches.length) {
    console.error('Incorrect Paint Name: ', name);
  }

  const paint: PaintDetails = type
    ? paintMatches.filter((paint) => paint.type === type)[0]
    : paintMatches[0];

  return (
    <div style={{ display: 'inline-block', marginBottom: '12px' }}>
      <BasePaint paint={paint} />
    </div>
  );
};

export default Paint;

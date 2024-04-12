import React from 'react';

import { Paint as BasePaint } from '../../src/components';
import { PaintDetails } from '../../src/types';
import { getAllSortedPaints } from '../../src/util';

const allPaints = getAllSortedPaints();
const typePriority = {
  base: 1,
  layer: 2,
  contrast: 3,
  air: 4,
  dry: 5,
  shade: 6,
  spray: 7,
  technical: 8,
};

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

  let paint: PaintDetails;

  if (paintMatches.length === 1) {
    paint = paintMatches[0];
  } else if (type) {
    paint = paintMatches.filter((paint) => paint.type === type)[0];
  } else {
    paint = paintMatches.sort(
      (a, b) => typePriority[a.type] - typePriority[b.type]
    )[0];
  }

  if (!paint) {
    console.error('Incorrect Paint Name: ', name);
  }

  return (
    <div className="inline-block mb-3">
      <BasePaint paint={paint} />
    </div>
  );
};

export default Paint;

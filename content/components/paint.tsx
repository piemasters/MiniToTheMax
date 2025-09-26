import React from 'react';

import { Paint as BasePaint } from '../../src/components';
import { PaintDetails } from '../../src/types';
import { getAllSortedPaints } from '../../src/util';

const allPaints = getAllSortedPaints();
const typePriority: Record<string, number> = {
  base: 1,
  layer: 2,
  contrast: 3,
  air: 4,
  dry: 5,
  shade: 6,
  spray: 7,
  technical: 8,
  metallic: 9,
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

  let paint: PaintDetails | undefined;

  if (paintMatches.length === 1) {
    paint = paintMatches[0];
  } else if (type) {
    // Handle case where `paint.type` can be an array
    paint = paintMatches.find(
      (paint) =>
        Array.isArray(paint.type)
          ? paint.type.includes(type) // Check if the array includes the `type`
          : paint.type === type // Compare directly if it's a string
    );
  } else {
    // Handle sorting when `paint.type` can be an array
    paint = paintMatches.sort((a, b) => {
      const aPriority = Array.isArray(a.type)
        ? Math.min(...a.type.map((t) => typePriority[t] || Infinity)) // Use the lowest priority in the array
        : typePriority[a.type] || Infinity;

      const bPriority = Array.isArray(b.type)
        ? Math.min(...b.type.map((t) => typePriority[t] || Infinity)) // Use the lowest priority in the array
        : typePriority[b.type] || Infinity;

      return aPriority - bPriority;
    })[0];
  }

  if (!paint) {
    console.error('Incorrect Paint Name: ', name);
  }

  return (
    <div className="inline-block mb-3">
      {paint && <BasePaint paint={paint} />}
    </div>
  );
};

export default Paint;

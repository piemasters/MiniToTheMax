import React from 'react';

import { Paint as BasePaint } from '../../src/components';
import { PaintDetails } from '../../src/types';
import { getAllSortedPaints } from '../../src/util';

const allPaints = getAllSortedPaints();

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
    <div className="inline-block mb-3">
      <BasePaint paint={paint} />
    </div>
  );
};

export default Paint;

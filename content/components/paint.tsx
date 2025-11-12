import React from 'react';

import { Paint as BasePaint } from '../../src/components/Paint/Paint';
import { getPaint } from '../../src/util/getPaint';
import { PaintCategory } from '../../src/types';

const Paint = ({
  name,
  category,
}: {
  name: string;
  category?: PaintCategory;
}): React.ReactNode => {
  const { paint, type, error } = getPaint(name, category);

  if (error) {
    console.error(error, type);
    return <div className="inline-block mb-3" />;
  }

  if (!paint) {
    console.error('No match found');
    return <div className="inline-block mb-3" />;
  }

  return <div className="inline-block mb-3">{<BasePaint paint={paint} />}</div>;
};

export default Paint;

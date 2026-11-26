import React from 'react';

import { Paint as BasePaint } from '../../src/components/Paint/Paint';
import { getPaint } from '../../src/util/paints/getPaint';
import { PaintCategory } from '../../src/types';

const Paint = ({
  name,
  category,
}: {
  name: string;
  category?: PaintCategory;
}): React.ReactNode => {
  const { paint, error, type } = getPaint(name, category);

  if (!paint) {
    const message = `<Paint>: ${error} "${type}"`;
    if (process.env.NODE_ENV === 'development') throw new Error(message);
    console.error(message);
  }

  return (
    <div className="inline-block mb-3">
      {paint && <BasePaint paint={paint} />}
    </div>
  );
};

export default Paint;

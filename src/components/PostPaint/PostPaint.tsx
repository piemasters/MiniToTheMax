import React from 'react';

import { Paint as BasePaint } from '../Paint/Paint';
import { getPaint } from '../../util/paints/getPaint';
import { PaintCategory } from '../../types';

/**
 * `<Paint name="..." />` as written in posts, which don't need to import it:
 * the post page supplies it.
 */
const PostPaint = ({
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

export default PostPaint;

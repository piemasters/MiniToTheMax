import React, { FC } from 'react';

import { BadgeNames } from '../../types';
import { allBadges } from '../../data';

export interface BadgeProps {
  type: BadgeNames;
}
/**
 * The Badge component is a combination of an image and text used to represent a category of posts
 */
export const Badge: FC<BadgeProps> = ({ type }) => {
  return (
    <div className="flex flex-col justify-end w-36" data-testid="badge">
      <img
        src={allBadges[type]}
        alt=""
        className="w-9/12 opacity-90 mx-auto mb-2 hover:opacity-100"
      />
      <p className="text-center capitalize">
        {type.replace(/([A-Z])/g, ' $1').trim()}
      </p>
    </div>
  );
};

export default Badge;

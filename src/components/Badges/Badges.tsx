import React, { FC } from 'react';
import kebabCase from 'lodash.kebabcase';

import { Badge } from '../Badge';
import { PageLink } from '../PageLink';
import { BadgeNames } from '../../types';

/**
 * The Badges component is collection of badges with the most popular categories to display on the homepage.
 */
export const Badges: FC = () => {
  const badges: BadgeNames[] = [
    BadgeNames.showcase,
    BadgeNames.tutorials,
    BadgeNames.reviews,
    BadgeNames.battleReports,
    //BadgeNames.build,
  ];

  return (
    <div
      className="flex flex-row flex-wrap justify-center"
      data-testid="badges"
    >
      {badges.map((badge: BadgeNames) => {
        return (
          <PageLink
            to={kebabCase(badge)}
            key={badge}
            className="flex flex-col no-underline opacity-90 hover:opacity-100"
            type={'cover'}
            direction={'up'}
          >
            <Badge type={badge} />
          </PageLink>
        );
      })}
    </div>
  );
};

export default Badges;

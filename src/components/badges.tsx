import React from 'react';
import Badge from './badge';
import { BadgeNames } from '../types/app.types';

const Badges = (): JSX.Element => {
  const badges: BadgeNames[] = [
    BadgeNames.showcase,
    BadgeNames.tutorials,
    BadgeNames.reviews,
    BadgeNames.battleReports,
    //BadgeNames.build,
  ];

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      data-testid="badges"
    >
      {badges.map((badge: BadgeNames) => {
        return <Badge type={badge} key={badge} />;
      })}
    </div>
  );
};

export default Badges;

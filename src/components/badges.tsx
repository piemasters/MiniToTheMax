import React from 'react';
import { css } from '@emotion/react';
import Badge from './badge';
import { BadgeNames } from '../types/app.types';

const Badges = (): JSX.Element => {
  const badgeContainerStyles = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `;

  const badges: BadgeNames[] = [
    BadgeNames.showcase,
    BadgeNames.tutorials,
    BadgeNames.reviews,
    BadgeNames.battleReports,
    //BadgeNames.build,
  ];

  return (
    <div css={badgeContainerStyles} data-testid="badges">
      {badges.map((badge: BadgeNames) => {
        return <Badge type={badge} key={badge} />;
      })}
    </div>
  );
};

export default Badges;

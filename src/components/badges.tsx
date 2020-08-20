import React from 'react';
import { Theme } from '../styles/theme';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import Badge from './badge';
import { BadgeNames } from '../types/app.types';

const Badges = () => {
  const theme: Theme = useTheme();

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

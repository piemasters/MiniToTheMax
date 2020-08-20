import React from 'react';
import { Theme } from '../styles/theme';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import { BadgeNames } from '../types/app.types';

import tutorials from '../../content/assets/images/tutorials-badge.png';
import showcase from '../../content/assets/images/showcase-badge.png';
import battleReports from '../../content/assets/images/battle-reports-badge.png';
import reviews from '../../content/assets/images/reviews-badge.png';
import build from '../../content/assets/images/build-badge.png';

const Badges = ({ type }: { type: BadgeNames }) => {
  const theme: Theme = useTheme();

  const badgeImages: any = {
    [BadgeNames.showcase]: showcase,
    [BadgeNames.tutorials]: tutorials,
    [BadgeNames.reviews]: reviews,
    [BadgeNames.battleReports]: battleReports,
    [BadgeNames.build]: build,
  };

  const badgeStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 9rem; // 7rem for 5
  `;

  const badgeImageStyles = css`
    margin: 0 auto;
    margin-bottom: 1rem;
    width: 60%; // 75% for 5
  `;

  const badgeTextStyles = css`
    text-align: center;
    text-transform: capitalize;
  `;

  return (
    <div css={badgeStyles} data-testid="badge">
      <img src={badgeImages[type]} alt="" css={badgeImageStyles} />
      <p css={badgeTextStyles}>{type.replace(/([A-Z])/g, ' $1').trim()}</p>
    </div>
  );
};

export default Badges;

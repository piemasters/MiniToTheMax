import type { FC } from 'react';
import { css } from '@emotion/react';

import { BadgeNames } from '../../types';
import { allBadges } from '../../data';

export interface BadgeProps {
  type: BadgeNames;
}

export const Badge: FC<BadgeProps> = ({ type }) => {
  const badgeStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 9rem; // 7rem for 5
  `;

  const badgeImageStyles = css`
    margin: 0 auto 0.4rem;
    width: 75%;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  `;

  const badgeTextStyles = css`
    text-align: center;
    text-transform: capitalize;
  `;

  return (
    <div css={badgeStyles} data-testid="badge">
      <img src={allBadges[type]} alt="" css={badgeImageStyles} />
      <p css={badgeTextStyles}>{type.replace(/([A-Z])/g, ' $1').trim()}</p>
    </div>
  );
};

export default Badge;

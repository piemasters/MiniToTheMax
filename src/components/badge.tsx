import React from 'react';
import { Theme } from '../styles/theme';
import { css, useTheme } from '@emotion/react';
import { BadgeNames } from '../types/app.types';
import PageLink from './page-link';
import kebabCase from 'lodash.kebabcase';
import tutorials from '../../content/assets/images/tutorials-badge.png';
import showcase from '../../content/assets/images/showcase-badge.png';
import battleReports from '../../content/assets/images/battle-reports-badge.png';
import reviews from '../../content/assets/images/reviews-badge.png';
import build from '../../content/assets/images/build-badge.png';

const Badge = ({ type }: { type: BadgeNames }): JSX.Element => {
  const theme = useTheme() as Theme;

  const badgeImages: { [key: string]: string } = {
    [BadgeNames.showcase]: showcase,
    [BadgeNames.tutorials]: tutorials,
    [BadgeNames.reviews]: reviews,
    [BadgeNames.battleReports]: battleReports,
    [BadgeNames.build]: build,
  };

  const linkStyles = css`
    color: ${theme.colors.textSecondary};
    display: flex;
    text-decoration: none;
    flex-direction: column;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  `;

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
      <PageLink
        to={kebabCase(type)}
        type={'cover'}
        direction={'up'}
        linkStyle={linkStyles}
      >
        <img src={badgeImages[type]} alt="" css={badgeImageStyles} />
        <p css={badgeTextStyles}>{type.replace(/([A-Z])/g, ' $1').trim()}</p>
      </PageLink>
    </div>
  );
};

export default Badge;

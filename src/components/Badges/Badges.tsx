import type { FC } from 'react';
import { css, useTheme } from '@emotion/react';
import kebabCase from 'lodash.kebabcase';

import { Badge } from '../Badge';
import { PageLink } from '../PageLink';
import { BadgeNames } from '../../types';
import { Theme } from '../../styles/theme';

/**
 * The Badges component is collection of badges with the most popular categories to display on the homepage.
 */
export const Badges: FC = () => {
  const theme = useTheme() as Theme;

  const badges: BadgeNames[] = [
    BadgeNames.showcase,
    BadgeNames.tutorials,
    BadgeNames.reviews,
    BadgeNames.battleReports,
    //BadgeNames.build,
  ];

  const wrapperStyles = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `;

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

  return (
    <div css={wrapperStyles} data-testid="badges">
      {badges.map((badge: BadgeNames) => {
        return (
          <PageLink
            to={kebabCase(badge)}
            type={'cover'}
            direction={'up'}
            linkStyle={linkStyles}
            key={badge}
          >
            <Badge type={badge} />
          </PageLink>
        );
      })}
    </div>
  );
};

export default Badges;

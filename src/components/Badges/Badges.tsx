import { FC } from 'react';
import kebabCase from 'lodash.kebabcase';
import tutorials from '../../assets/images/tutorials-badge.webp?url';
import showcase from '../../assets/images/showcase-badge.webp?url';
import battleReports from '../../assets/images/battle-reports-badge.webp?url';
import reviews from '../../assets/images/reviews-badge.webp?url';
import build from '../../assets/images/build-badge.webp?url';
import { PageLink } from '../PageLink/PageLink';
import { Badge } from './Badge/Badge';

export enum BadgeNames {
  tutorials = 'tutorials',
  showcase = 'showcase',
  build = 'build',
  battleReports = 'battleReports',
  reviews = 'reviews',
}

export const badgeImages: { [key: string]: string } = {
  [BadgeNames.showcase]: showcase,
  [BadgeNames.tutorials]: tutorials,
  [BadgeNames.reviews]: reviews,
  [BadgeNames.battleReports]: battleReports,
  [BadgeNames.build]: build,
};

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
            to={`/${kebabCase(badge)}`}
            key={badge}
            className="flex flex-col no-underline opacity-90 hover:opacity-100"
          >
            <Badge type={badge} />
          </PageLink>
        );
      })}
    </div>
  );
};

export default Badges;

import { BadgeNames } from '../../types';
import tutorials from '../../../content/assets/images/tutorials-badge.webp';
import showcase from '../../../content/assets/images/showcase-badge.webp';
import battleReports from '../../../content/assets/images/battle-reports-badge.webp';
import reviews from '../../../content/assets/images/reviews-badge.webp';
import build from '../../../content/assets/images/build-badge.webp';

export const allBadges: { [key: string]: string } = {
  [BadgeNames.showcase]: showcase,
  [BadgeNames.tutorials]: tutorials,
  [BadgeNames.reviews]: reviews,
  [BadgeNames.battleReports]: battleReports,
  [BadgeNames.build]: build,
};

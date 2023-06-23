import { BadgeNames } from '../../types';
import tutorials from '../../../content/assets/images/tutorials-badge.png';
import showcase from '../../../content/assets/images/showcase-badge.png';
import battleReports from '../../../content/assets/images/battle-reports-badge.png';
import reviews from '../../../content/assets/images/reviews-badge.png';
import build from '../../../content/assets/images/build-badge.png';

export const allBadges: { [key: string]: string } = {
  [BadgeNames.showcase]: showcase,
  [BadgeNames.tutorials]: tutorials,
  [BadgeNames.reviews]: reviews,
  [BadgeNames.battleReports]: battleReports,
  [BadgeNames.build]: build,
};

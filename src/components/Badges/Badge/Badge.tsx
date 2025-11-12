import { FC } from 'react';
import { badgeImages, BadgeNames } from '../Badges';

/**
 * The Badge component is a combination of an image and text used to represent a category of posts
 */
export const Badge: FC<{
  type: BadgeNames;
}> = ({ type }) => {
  return (
    <div className="flex flex-col justify-end w-36" data-testid="badge">
      <img
        src={badgeImages[type]}
        height="120px"
        width="120px"
        alt=""
        className="mx-auto mb-2 opacity-90 hover:opacity-100"
        fetchPriority="high"
      />
      <p className="text-center capitalize">
        {type.replace(/([A-Z])/g, ' $1').trim()}
      </p>
    </div>
  );
};

export default Badge;

import { FC, ReactNode } from 'react';
import { Link } from 'gatsby-link';

type AnimationTypes = 'paintDrip' | 'fade' | 'swipe' | 'cover';

export const PageLink: FC<{
  children: ReactNode;
  type?: AnimationTypes;
  to: string;
  linkActiveStyle?: string;
  direction?: string;
  disabled?: boolean;
  className?: string;
}> = ({
  children,
  type,
  to,
  linkActiveStyle,
  direction,
  disabled,
  className,
}) => {
  const baseClasses =
    className ||
    'text-blue-500 visited:text-blue-500 hover:text-blue-700 no-underline';

  if (disabled) {
    return <div className="text-gray-700">{children}</div>;
  }

  return (
    <Link
      data-testid="page-link"
      to={to}
      className={baseClasses}
      activeClassName={linkActiveStyle}
      partiallyActive={to !== '/'}
    >
      {children}
    </Link>
  );

  // if (type === 'paintDrip') {
  //   return (
  //     <AniLink
  //       data-testid="page-link-paint"
  //       paintDrip
  //       hex={hex ? hex : '#eb1d23'}
  //       to={to}
  //       duration={duration}
  //       css={activeStyle}
  //       activeStyle={linkActiveStyle}
  //       partiallyActive={to !== '/'}
  //     >
  //       {children}
  //     </AniLink>
  //   );
  // } else if (type === 'fade') {
  //   return (
  //     <AniLink
  //       data-testid="page-link-fade"
  //       fade={type === 'fade'}
  //       to={to}
  //       duration={duration}
  //       css={activeStyle}
  //       activeStyle={linkActiveStyle}
  //       partiallyActive={to !== '/'}
  //     >
  //       {children}
  //     </AniLink>
  //   );
  // } else if (type === 'swipe') {
  //   return (
  //     <AniLink
  //       data-testid="page-link-swipe"
  //       swipe
  //       direction={direction ? direction : 'up'}
  //       top={top ? top : 'exit'}
  //       entryOffset={entryOffset ? entryOffset : 100}
  //       hex={hex ? hex : '#eb1d23'}
  //       to={to}
  //       duration={duration}
  //       css={activeStyle}
  //       activeStyle={linkActiveStyle}
  //       partiallyActive={to !== '/'}
  //     >
  //       {children}
  //     </AniLink>
  //   );
  // } else if (type === 'cover') {
  //   return (
  //     <AniLink
  //       data-testid="page-link-cover"
  //       cover
  //       to={to}
  //       direction={direction ? direction : 'up'}
  //       bg={bg ? bg : '#eb1d23'}
  //       duration={duration ? duration : 1}
  //       css={activeStyle}
  //       activeStyle={linkActiveStyle}
  //       partiallyActive={to !== '/'}
  //     >
  //       {children}
  //     </AniLink>
  //   );
  // } else {
  //   return (
  //     <TransitionLink
  //       data-testid="page-link"
  //       to={to}
  //       css={activeStyle}
  //       activeStyle={linkActiveStyle}
  //       partiallyActive={to !== '/'}
  //     >
  //       {children}
  //     </TransitionLink>
  //   );
  // }
};

export default PageLink;

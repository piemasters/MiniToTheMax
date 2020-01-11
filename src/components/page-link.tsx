import React from 'react';
// @ts-ignore
import AniLink from 'gatsby-plugin-transition-link/AniLink';
// @ts-ignore
import TransitionLink from 'gatsby-plugin-transition-link';

type AnimationTypes = 'paintDrip' | 'fade' | 'swipe' | 'cover';

interface PageLinkProps {
  children: any;
  type?: AnimationTypes;
  to: string;
  linkStyle?: any;
  linkActiveStyle?: any;
  direction?: string;
  top?: string;
  entryOffset?: number;
  hex?: string;
  bg?: string;
  duration?: string;
}

const PageLink = ({
  children,
  type,
  to,
  linkStyle,
  linkActiveStyle,
  direction,
  top,
  entryOffset,
  hex,
  bg,
  duration,
}: PageLinkProps) => {
  if (type === 'paintDrip') {
    return (
      <AniLink
        data-testid="page-link-paint"
        paintDrip
        hex={hex ? hex : '#eb1d23'}
        to={to}
        duration={duration}
        css={linkStyle}
        activeStyle={linkActiveStyle}
        partiallyActive={to !== '/'}
      >
        {children}
      </AniLink>
    );
  } else if (type === 'fade') {
    return (
      <AniLink
        data-testid="page-link-fade"
        fade={type === 'fade'}
        to={to}
        duration={duration}
        css={linkStyle}
        activeStyle={linkActiveStyle}
        partiallyActive={to !== '/'}
      >
        {children}
      </AniLink>
    );
  } else if (type === 'swipe') {
    return (
      <AniLink
        data-testid="page-link-swipe"
        swipe
        direction={direction ? direction : 'up'}
        top={top ? top : 'exit'}
        entryOffset={entryOffset ? entryOffset : 100}
        hex={hex ? hex : '#eb1d23'}
        to={to}
        duration={duration}
        css={linkStyle}
        activeStyle={linkActiveStyle}
        partiallyActive={to !== '/'}
      >
        {children}
      </AniLink>
    );
  } else if (type === 'cover') {
    return (
      <AniLink
        data-testid="page-link-cover"
        cover
        to={to}
        direction={direction ? direction : 'up'}
        bg={bg ? bg : '#eb1d23'}
        duration={duration ? duration : 1}
        css={linkStyle}
        activeStyle={linkActiveStyle}
        partiallyActive={to !== '/'}
      >
        {children}
      </AniLink>
    );
  } else {
    return (
      <TransitionLink
        data-testid="page-link"
        to={to}
        css={linkStyle}
        activeStyle={linkActiveStyle}
        partiallyActive={to !== '/'}
      >
        {children}
      </TransitionLink>
    );
  }
};

export default PageLink;

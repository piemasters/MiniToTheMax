import React from 'react';
import { css } from '@emotion/core';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
// import TransitionLink from 'gatsby-plugin-transition-link';

type AnimationTypes = 'paintDrip' | 'fade' | 'swipe' | 'cover';

interface Props {
  children: any;
  type: AnimationTypes;
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
}: Props) => {
  return (
    <AniLink
      paintDrip={type === 'paintDrip'}
      fade={type === 'fade'}
      swipe={type === 'swipe'}
      cover={type === 'cover'}
      direction={direction}
      top={top}
      entryOffset={entryOffset ? entryOffset : 100}
      hex={hex ? hex : '#eb1d23'}
      bg={bg ? bg : '#eb1d23'}
      to={to}
      duration={duration}
      css={linkStyle}
      activeStyle={linkActiveStyle}
    >
      {children}
    </AniLink>
  );
};

export default PageLink;

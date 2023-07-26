import React, { FC } from 'react';
import { css, SerializedStyles, useTheme } from '@emotion/react';
import type * as CSS from 'csstype';
// @ts-expect-error: AniLink doesn't use TypeScript
import AniLink from 'gatsby-plugin-transition-link/AniLink';
// @ts-expect-error: TransitionLink doesn't use TypeScript
import TransitionLink from 'gatsby-plugin-transition-link';

import { Theme } from '../../styles/theme';

type AnimationTypes = 'paintDrip' | 'fade' | 'swipe' | 'cover';

export interface PageLinkProps {
  children: React.ReactNode;
  type?: AnimationTypes;
  to: string;
  linkStyle?: CSS.Properties | SerializedStyles;
  linkActiveStyle?: CSS.Properties | SerializedStyles;
  direction?: string;
  top?: string;
  entryOffset?: number;
  hex?: string;
  bg?: string;
  duration?: number;
  disabled?: boolean;
}

export const PageLink: FC<PageLinkProps> = ({
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
  disabled,
}) => {
  const theme = useTheme() as Theme;

  const baseStyle = css`
    color: ${theme.colors.hyperlink};
    text-decoration: none;
    &:visited {
      color: ${theme.colors.hyperlink};
    }
    &:hover {
      color: ${theme.colors.hyperlinkActive};
    }
  `;

  const disabledStyle = css`
    color: grey;
  `;

  const activeStyle = linkStyle ? linkStyle : baseStyle;

  if (disabled) {
    return <div css={disabledStyle}>{children}</div>;
  }

  if (type === 'paintDrip') {
    return (
      <AniLink
        data-testid="page-link-paint"
        paintDrip
        hex={hex ? hex : '#eb1d23'}
        to={to}
        duration={duration}
        css={activeStyle}
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
        css={activeStyle}
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
        css={activeStyle}
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
        css={activeStyle}
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
        css={activeStyle}
        activeStyle={linkActiveStyle}
        partiallyActive={to !== '/'}
      >
        {children}
      </TransitionLink>
    );
  }
};

export default PageLink;

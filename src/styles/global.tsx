import { css, SerializedStyles } from '@emotion/react';

import { Theme } from './theme';
import { resetStyles } from './reset';

export const globalStyles = (
  theme: Theme
): [SerializedStyles, SerializedStyles, SerializedStyles] => {
  return [resetStyles, gatsby(), blockquote(theme)];
};

const blockquote = (theme: Theme) => css`
  blockquote {
    background: ${theme.colors.lightgrey};
    border-left: 0.7rem solid ${theme.colors.primary};
    border-radius: 5px;
    margin: 1rem;
    padding: 0.8rem;
    quotes: '\\201C''\\201D''\\2018''\\2019';
    &:before {
      color: ${theme.colors.textSecondary};
      content: open-quote;
      font-size: 3rem;
      line-height: 0.1rem;
      margin-right: 1rem;
      vertical-align: -0.4em;
    }
    p {
      color: ${theme.colors.textSecondary};
      display: block;
      font-size: 0.8rem;
      font-style: italic;
      margin-top: 1rem;
      &:first-of-type {
        display: inline;
      }
    }
  }
`;

const gatsby = () => css`
  .gatsby-resp-image-wrapper {
    width: 100%;
  }
`;

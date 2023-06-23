import type { FC } from 'react';
import { css, useTheme } from '@emotion/react';

import { Theme } from '../../styles/theme';
import { Facebook, Instagram, Youtube } from '../../data/icons';

export interface FooterProps {
  author: string;
}

export const Footer: FC<FooterProps> = ({ author }) => {
  const theme = useTheme() as Theme;

  const footerStyle = css`
    margin-top: 3rem;
    background-color: ${theme.colors.lightgrey};
    padding: 2rem 0;
  `;

  const footerContentsStyle = css`
    align-items: center;
    display: flex;
    font-size: 0.8rem;
    justify-content: flex-end;
    margin: 0 auto;
    max-width: 750px;
    padding: 0 1rem;
    a {
      color: ${theme.colors.hyperlink};
      text-decoration: none;
      &:hover {
        color: ${theme.colors.hyperlinkActive};
      }
    }
  `;

  const iconContainerStyles = css`
    margin: 0.2rem 0 0 0.8rem;
  `;

  const iconStyles = css`
    fill: ${theme.colors.primary};
    margin: 0 0.3rem;
    opacity: 0.6;
    transition: 0.6s;
    width: 1.8rem;
    &:hover {
      opacity: 1;
    }
  `;

  return (
    <footer data-testid="footer" css={footerStyle}>
      <div css={footerContentsStyle}>
        <a href="https://davidnorton.app/" target="_blank" rel="noreferrer">
          © {new Date().getFullYear()} {author}
        </a>
        &nbsp;| All Rights Reserved
        <div css={iconContainerStyles}>
          <a
            href="https://www.facebook.com/minitothemax"
            target={'_blank'}
            rel="noreferrer"
          >
            <Facebook css={iconStyles} />
          </a>
          <a
            href="https://www.instagram.com/minitothemax/"
            target={'_blank'}
            rel="noreferrer"
          >
            <Instagram css={iconStyles} />
          </a>
          <a
            href="https://www.youtube.com/user/piemasters29"
            target={'_blank'}
            rel="noreferrer"
          >
            <Youtube css={iconStyles} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

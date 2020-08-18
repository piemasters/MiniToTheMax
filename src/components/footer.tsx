import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../styles/theme';
// @ts-ignore
import Facebook from '../../content/assets/svg/facebook.svg';
// @ts-ignore
import Instagram from '../../content/assets/svg/instagram.svg';
// @ts-ignore
import Youtube from '../../content/assets/svg/youtube.svg';

interface FooterProps {
  author: string;
}

export const PureFooter = ({ author }: FooterProps) => {
  const theme: Theme = useTheme();

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
        <a href="https://davidnorton.app/" target="_blank">
          © {new Date().getFullYear()} {author}
        </a>
        &nbsp;| All Rights Reserved
        <div css={iconContainerStyles}>
          <a href="https://www.facebook.com/minitothemax" target={'_blank'}>
            <Facebook css={iconStyles} />
          </a>
          <a href="https://www.instagram.com/minitothemax/" target={'_blank'}>
            <Instagram css={iconStyles} />
          </a>
          <a href="https://www.youtube.com/user/piemasters29" target={'_blank'}>
            <Youtube css={iconStyles} />
          </a>
        </div>
      </div>
    </footer>
  );
};

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  return <PureFooter author={data.site.siteMetadata.author} />;
};

export default Footer;

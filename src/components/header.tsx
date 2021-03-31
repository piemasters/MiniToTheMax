import { Theme } from '../styles/theme';
import { css, useTheme } from '@emotion/react';
import PageLink from './page-link';
import React from 'react';

interface NavLink {
  name: string;
  url: string;
}

interface HeaderProps {
  title: string;
  logo: string;
  pages: NavLink[];
}

const Header = ({ title, logo, pages }: HeaderProps): JSX.Element => {
  const theme = useTheme() as Theme;

  const NavHeader = css`
    background-color: ${theme.colors.lightgrey};
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  `;

  const navContainerStyles = css`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 750px;
  `;

  const titleLinkStyle = css`
    align-items: center;
    color: ${theme.colors.text};
    display: flex;
    padding-bottom: 1rem;
    text-decoration: none;
  `;

  const titleStyle = css`
    margin: 0 0 0 1rem;
  `;

  const navListStyle = css`
    display: flex;
    list-style-type: none;
    margin: 0;
  `;

  const navItemStyle = css`
    color: ${theme.colors.textSecondary};
    font-size: 0.9rem;
    font-weight: bold;
    margin-right: 1.3rem;
    text-decoration: none;
    &:hover {
      color: ${theme.colors.primary};
    }
  `;

  return (
    <div css={NavHeader} data-testid="nav-header">
      <nav css={navContainerStyles}>
        <PageLink type={'paintDrip'} to={'/'} linkStyle={titleLinkStyle}>
          <img src={logo} alt="Logo" width={60 + 'px'} />
          <h1 css={titleStyle}>{title}</h1>
        </PageLink>
        <div css={navListStyle}>
          {pages.map((link: NavLink) => {
            return (
              <PageLink
                type={'cover'}
                linkActiveStyle={{ color: theme.colors.primary }}
                to={link.url}
                linkStyle={navItemStyle}
                key={link.name}
              >
                {link.name}
              </PageLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Header;

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import PageLink from './page-link';
import { Theme } from '../styles/theme';

interface NavLink {
  name: string;
  url: string;
}

interface HeaderProps {
  title: string;
  logo: string;
  pages: NavLink[];
}

export const PureHeader = ({ title, logo, pages }: HeaderProps) => {
  const theme: Theme = useTheme();

  const NavHeader = css`
    padding: 1rem 0 3rem;
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
      <nav>
        <PageLink type={'paintDrip'} to={'/'} linkStyle={titleLinkStyle}>
          <img src={logo} alt="Logo" width={60 + 'px'} />
          <h1 css={titleStyle}>{title} </h1>
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

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      file(name: { eq: "logo" }) {
        size
        relativeDirectory
        publicURL
      }
    }
  `);

  const pages: NavLink[] = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Showcase', url: '/showcase' },
    { name: 'Backlog', url: '/backlog' },
  ];

  return (
    <PureHeader
      title={data.site.siteMetadata.title}
      logo={data.file.publicURL}
      pages={pages}
    />
  );
};

export default Header;

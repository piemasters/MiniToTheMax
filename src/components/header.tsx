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

  const NavTitle = css`
    a {
      color: ${theme.colors.text};
      font-size: 3rem;
      text-decoration: none;
    }
  `;

  const NavList = css`
    display: flex;
    list-style-type: none;
    margin: 0;
  `;

  const NavItem = css`
    a {
      color: ${theme.colors.muted};
      font-size: 0.9rem;
      margin-right: 1.3rem;
      text-decoration: none;
      &:hover {
        color: #666666;
      }
    }
  `;

  return (
    <div css={NavHeader} data-testid="nav-header">
      <nav>
        <h1>
          <div css={NavTitle}>
            <PageLink type={'paintDrip'} to={'/'}>
              <img src={logo} alt="Logo" width={60 + 'px'} />
              {title}
            </PageLink>
          </div>
        </h1>
        <div css={NavList}>
          {pages.map((link: NavLink) => {
            return (
              <div css={NavItem} key={link.name}>
                <PageLink
                  type={'cover'}
                  linkActiveStyle={{ color: '#333333' }}
                  to={link.url}
                >
                  {link.name}
                </PageLink>
              </div>
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

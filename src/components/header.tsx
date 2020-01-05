import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PageLink from './page-link';
import styled from '@emotion/styled';

interface Page {
  name: string;
  url: string;
}

interface HeaderProps {
  title: string;
  logo: string;
  pages: Page[];
}

export const PureHeader = ({ title, logo, pages }: HeaderProps) => {
  const NavHeader = styled.header`
    padding: 1rem 0 3rem;
  `;

  const NavTitle = styled.div`
    a {
      color: #000000;
      font-size: 3rem;
      text-decoration: none;
    }
  `;

  const NavList = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
  `;

  const NavItem = styled.li`
    a {
      color: #999999;
      font-size: 0.9rem;
      margin-right: 1.3rem;
      text-decoration: none;
      &:hover {
        color: #666666;
      }
    }
  `;

  return (
    <NavHeader data-testid="nav-header">
      <nav>
        <h1>
          <NavTitle>
            <PageLink type={'paintDrip'} to={'/'}>
              <img src={logo} alt="Logo" width={60 + 'px'} />
              {title}
            </PageLink>
          </NavTitle>
        </h1>
        <NavList>
          {pages.map(page => {
            return (
              <NavItem key={page.name}>
                <PageLink
                  type={'paintDrip'}
                  linkActiveStyle={{ color: '#333333' }}
                  to={page.url}
                >
                  {page.name}
                </PageLink>
              </NavItem>
            );
          })}
        </NavList>
      </nav>
    </NavHeader>
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

  const pages = [
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

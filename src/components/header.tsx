import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import PageLink from './page-link';

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

  const headerStyle = css`
    padding: 1rem 0 3rem;
  `;

  const titleStyle = css`
    color: #000000;
    font-size: 3rem;
    text-decoration: none;
  `;

  const navListStyle = css`
    display: flex;
    list-style-type: none;
    margin: 0;
  `;

  const navItemStyle = css`
    color: #999999;
    font-size: 0.9rem;
    margin-right: 1.3rem;
    text-decoration: none;
    &:hover {
      color: #666666;
    }
  `;

  const pages = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Blog',
      url: '/blog',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Contact',
      url: '/contact',
    },
  ];

  return (
    <header css={headerStyle}>
      <nav>
        <h1>
          <PageLink type={'paintDrip'} linkStyle={titleStyle} to={'/'}>
            <img src={data.file.publicURL} alt="Logo" width={60 + 'px'} />
            {data.site.siteMetadata.title}
          </PageLink>
        </h1>
        <ul css={navListStyle}>
          {pages.map(page => {
            return (
              <li key={page.name}>
                <PageLink
                  type={'paintDrip'}
                  linkStyle={navItemStyle}
                  linkActiveStyle={{ color: '#333333' }}
                  to={page.url}
                >
                  {page.name}
                </PageLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

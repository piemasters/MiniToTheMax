import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
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
          <Link css={titleStyle} to={'/'}>
            {data.site.siteMetadata.title}
          </Link>
        </h1>
        <ul css={navListStyle}>
          {pages.map(page => {
            return (
              <li key={page.name}>
                <Link
                  css={navItemStyle}
                  activeStyle={{ color: '#333333' }}
                  to={page.url}
                >
                  {page.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

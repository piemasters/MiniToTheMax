import React, { FC } from 'react';

import { PageLink } from '../PageLink';
import type { NavLink } from '../../types';

export interface HeaderProps {
  title: string;
  logo: string;
  pages: NavLink[];
}

export const Header: FC<HeaderProps> = ({ title, logo, pages }) => {
  return (
    <div className="px-4 py-8 mb-8 bg-gray-100" data-testid="nav-header">
      <nav className="flex flex-col max-w-3xl mx-auto">
        <PageLink
          type={'paintDrip'}
          to={'/'}
          className="flex items-center pb-4 text-gray-900 no-underline"
        >
          <img src={logo} alt="Logo" width={60 + 'px'} />
          <h1 className="mb-0! pl-4!">{title}</h1>
        </PageLink>
        <div className="flex m-0 list-none">
          {pages.map((link: NavLink) => {
            return (
              <PageLink
                to={link.url}
                className="mr-5 text-sm font-bold text-gray-500 no-underline hover:text-red-500"
                key={link.name}
                linkActiveStyle="text-red-500!"
                type={'cover'}
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

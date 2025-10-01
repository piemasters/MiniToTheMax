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
    <nav className="p-4 mb-8 bg-gray-100" data-testid="nav-header">
      <div className="flex flex-col max-w-3xl mx-auto">
        <PageLink
          type="paintDrip"
          to="/"
          className="flex items-center py-2 mb-2 text-gray-900 no-underline"
        >
          <img src={logo} alt="Logo" width="60px" />
          <h1 className="mb-0! pl-4!">{title}</h1>
        </PageLink>

        <div className="flex gap-4 pl-12 m-0 list-none">
          {pages.map((link: NavLink) => {
            return (
              <PageLink
                key={link.name}
                to={link.url}
                className="p-2 font-bold text-gray-600 no-underline text-md hover:text-red-700"
                linkActiveStyle="text-red-700!"
                type="cover"
              >
                {link.name}
              </PageLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Header;

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
    <div className="bg-gray-100 px-4 py-8 mb-8" data-testid="nav-header">
      <nav className="flex flex-col mx-auto max-w-3xl">
        <PageLink
          type={'paintDrip'}
          to={'/'}
          className="flex items-center text-gray-900 pb-4 no-underline"
        >
          <img src={logo} alt="Logo" width={60 + 'px'} />
          <h1 className="ml-4 mb-0">{title}</h1>
        </PageLink>
        <div className="flex list-none m-0">
          {pages.map((link: NavLink) => {
            return (
              <PageLink
                to={link.url}
                className="text-gray-500 text-sm font-bold mr-5 no-underline hover:text-red-500"
                key={link.name}
                linkActiveStyle="!text-red-500"
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

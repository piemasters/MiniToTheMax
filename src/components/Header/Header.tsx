import { FC } from 'react';
import { PageLink } from '../PageLink/PageLink';

export type NavLink = {
  name: string;
  url: string;
};

export const Header: FC<{
  title: string;
  logo: string;
  pages: NavLink[];
}> = ({ title, logo, pages }) => {
  return (
    <nav className="p-2 mb-8 bg-gray-100 md:p-4" data-testid="nav-header">
      <div className="flex flex-col max-w-3xl mx-auto">
        <PageLink
          type="paintDrip"
          to="/"
          className="flex items-center py-2 mb-2 text-gray-900 no-underline"
        >
          <img src={logo} alt="Logo" height="60px" width="60px" />
          <h1 className="mb-0! pl-4! text-2xl! md:text-3xl! lg:text-4xl! ">
            {title}
          </h1>
        </PageLink>

        <div className="flex gap-2 m-0 list-none md:gap-4 md:pl-12">
          {pages.map((link: NavLink) => {
            return (
              <PageLink
                key={link.name}
                to={link.url}
                className="p-1 text-sm font-bold text-gray-600 no-underline md:p-2 lg:p-2 md:text-md hover:text-red-700"
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

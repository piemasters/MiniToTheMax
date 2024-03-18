import React, { FC, ReactNode } from 'react';

import { StatefulFooter, StatefulHeader } from '../components';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <StatefulHeader />
      <div className="max-w-3xl px-4 mx-auto w-full flex-grow">
        <div>{children}</div>
      </div>
      <StatefulFooter />
    </div>
  );
};

export default Layout;

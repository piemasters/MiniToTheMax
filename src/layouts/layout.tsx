import { FC, ReactNode } from 'react';
import { StatefulFooter } from '../components/stateful/StatefulFooter/StatefulFooter';
import { StatefulHeader } from '../components/stateful/StatefulHeader/StatefulHeader';

export const Layout: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <StatefulHeader />
      <main className="w-full max-w-3xl px-4 mx-auto grow">
        <div>{children}</div>
      </main>
      <StatefulFooter />
    </div>
  );
};

export default Layout;

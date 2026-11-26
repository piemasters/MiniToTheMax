import { FC, ReactNode } from 'react';
import { StatefulFooter } from '../components/stateful/StatefulFooter/StatefulFooter';
import { StatefulHeader } from '../components/stateful/StatefulHeader/StatefulHeader';
import { clsx } from '../util/clsx';

export const Layout: FC<{
  children?: ReactNode;
  /** Use the full page width instead of the narrow reading column. */
  wide?: boolean;
}> = ({ children, wide }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <StatefulHeader />
      <main
        className={clsx(
          'w-full px-4 mx-auto grow',
          wide ? 'max-w-7xl' : 'max-w-3xl'
        )}
      >
        <div>{children}</div>
      </main>
      <StatefulFooter />
    </div>
  );
};

export default Layout;

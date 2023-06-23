import React, { FC, ReactNode } from 'react';
import { Global, ThemeProvider } from '@emotion/react';

import { StatefulFooter, StatefulHeader } from '../components';
import { appTheme } from '../styles/theme';
import { globalStyles } from '../styles/global';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={appTheme}>
      <Global styles={globalStyles(appTheme)} />
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <StatefulHeader />
        <div
          style={{
            flexGrow: '1',
            margin: '0 auto',
            maxWidth: '750px',
            padding: ' 0 1rem',
            width: ' 100%',
          }}
        >
          <div>{children}</div>
        </div>
        <StatefulFooter />
      </div>
    </ThemeProvider>
  );
};

export default Layout;

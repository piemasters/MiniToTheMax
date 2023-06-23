import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Header } from './Header';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

describe('Header', () => {
  test('renders correctly', () => {
    const data = {
      site: {
        siteMetadata: {
          title: 'MiniToTheMax',
        },
      },
      file: {
        publicURL: '/static/logo-37f736b45fa7360612c71ff66ce83af8.png',
      },
    };

    const pages = [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: 'Showcase', url: '/showcase' },
      { name: 'Backlog', url: '/backlog' },
    ];

    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <Header
          title={data.site.siteMetadata.title}
          logo={data.file.publicURL}
          pages={pages}
        />
      </ThemeProvider>
    );

    expect(
      getByTestId(container as HTMLElement, 'nav-header')
    ).toHaveTextContent('MiniToTheMax');

    expect(container).toMatchSnapshot();
  });
});

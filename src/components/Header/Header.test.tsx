import { getByTestId, render } from '@testing-library/react';
import { Header } from './Header';

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

    const { container } = render(
      <Header
        title={data.site.siteMetadata.title}
        logo={data.file.publicURL}
        pages={pages}
      />
    );

    expect(
      getByTestId(container as HTMLElement, 'nav-header')
    ).toHaveTextContent('MiniToTheMax');

    expect(container).toMatchSnapshot();
  });
});

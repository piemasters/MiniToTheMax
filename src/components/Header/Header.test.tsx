import { getByTestId, render, screen } from '@testing-library/react';
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
        currentPath="/"
      />
    );

    expect(
      getByTestId(container as HTMLElement, 'nav-header')
    ).toHaveTextContent('MiniToTheMax');

    expect(container).toMatchSnapshot();
  });

  test('highlights the section being shown', () => {
    render(
      <Header
        title="MiniToTheMax"
        logo="logo.png"
        pages={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
        currentPath="/blog/2/"
      />
    );

    expect(screen.getByRole('link', { name: 'Blog' })).toHaveClass(
      'text-red-700!'
    );
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass(
      'text-red-700!'
    );
  });
});

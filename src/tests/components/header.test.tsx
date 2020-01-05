import React from 'react';
import { PureHeader as Header } from '../../components/header';
import { render, getByTestId } from '@testing-library/react';

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

    expect(getByTestId(container, 'nav-header')).toHaveTextContent(
      'MiniToTheMax'
    );

    expect(container.querySelector(`header`)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import { PageLink } from './PageLink';

const renderLink = (to: string, currentPath?: string) => {
  render(
    <PageLink to={to} currentPath={currentPath} linkActiveStyle="active">
      Link
    </PageLink>
  );
  return screen.getByRole('link');
};

describe('PageLink', () => {
  test('renders correctly', () => {
    const { container } = render(<PageLink to={'/'}>Default</PageLink>);

    expect(screen.getByTestId('page-link')).toHaveTextContent('Default');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    expect(container).toMatchSnapshot();
  });

  test('marks the current page, with or without a trailing slash', () => {
    const link = renderLink('/blog', '/blog/');

    expect(link).toHaveClass('active');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  test('highlights the section of the current page', () => {
    const link = renderLink('/showcase', '/showcase/orks/gretchin/');

    expect(link).toHaveClass('active');
    expect(link).not.toHaveAttribute('aria-current');
  });

  test.each([
    ['/', '/blog/'],
    ['/blog', '/blogging/'],
    ['/blog', undefined],
  ])('leaves a link to %s plain on %s', (to, currentPath) => {
    expect(renderLink(to, currentPath)).not.toHaveClass('active');
  });

  test.each([
    ['/', '/'],
    ['/blog', '/blog/'],
    ['/blog/2', '/blog/2/'],
    ['/blog/', '/blog/'],
    ['/ads.txt', '/ads.txt'],
    ['/paints?q=red', '/paints?q=red'],
    ['https://example.com/page', 'https://example.com/page'],
  ])('links %s as %s', (to, href) => {
    expect(renderLink(to)).toHaveAttribute('href', href);
  });

  test('is only text when disabled', () => {
    render(
      <PageLink to="/" disabled>
        Off
      </PageLink>
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

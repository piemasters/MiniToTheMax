import { render, screen } from '@testing-library/react';
import { greyKnights } from '../../data/backlog';
import { Backlog } from './Backlog';

describe('Backlog', () => {
  test('lists each game under its heading', () => {
    render(<Backlog />);

    expect(
      screen.getByRole('heading', { name: 'Warhammer 40,000' })
    ).toBeInTheDocument();
    expect(screen.getByText('Grey Knights')).toBeInTheDocument();
  });

  test('ticks and links the painted miniatures only', () => {
    render(<Backlog />);
    const painted = greyKnights.find((entry) => 'link' in entry)!;

    // Closed sections are hidden from assistive technology, so look by text
    const link = screen.getAllByText(painted.name)[0].closest('a')!;

    expect(link).toHaveAttribute('href', (painted as { link: string }).link);
    expect(link.closest('label')!.querySelector('input')).toBeChecked();
  });

  test('only links to addresses on this site', () => {
    const { container } = render(<Backlog />);
    const links = [...container.querySelectorAll('a')];

    expect(links.length).toBeGreaterThan(0);
    expect(
      links
        .map((link) => link.getAttribute('href')!)
        .filter((href) => !/^\/(showcase|reviews|tutorials)\//.test(href))
    ).toEqual([]);
  });
});

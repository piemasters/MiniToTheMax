import { fireEvent, render, screen } from '@testing-library/react';
import type { PaintDetails } from '../../types';
import { getPaint } from '../../util/paints/getPaint';
import { ColorSchemesSection } from './ColorSchemesSection';

const paintNamed = (name: string) => getPaint(name).paint as PaintDetails;
const red = paintNamed('Mephiston Red');

const setup = (
  paint = red,
  { allBrands = false, onSelectPaint = jest.fn() } = {}
) => {
  render(
    <ColorSchemesSection
      paint={paint}
      allBrands={allBrands}
      headingId="schemes"
      onSelectPaint={onSelectPaint}
    />
  );
  return { onSelectPaint };
};

describe('ColorSchemesSection', () => {
  it('offers the six schemes as tabs, starting with complementary', () => {
    setup();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      'Triadic',
      'Complementary',
      'Split-complementary',
      'Analogous',
      'Tetradic',
      'Monochromatic',
    ]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Triadic');
  });

  it('lists the base and the paints that fill the scheme', () => {
    setup();
    fireEvent.click(screen.getByRole('tab', { name: 'Triadic' }));

    const rows = screen.getAllByRole('listitem');
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveTextContent('Primary');
    expect(rows[0]).toHaveTextContent('Mephiston Red');
    expect(rows[1]).toHaveTextContent('Secondary');
    expect(rows[2]).toHaveTextContent('Tertiary');
    expect(rows[0]).toHaveTextContent('ΔE 0.0');
  });

  it('moves between tabs with the arrow keys', () => {
    setup();
    const first = screen.getByRole('tab', { name: 'Triadic' });
    first.focus();

    fireEvent.keyDown(first, { key: 'ArrowRight' });
    const second = screen.getByRole('tab', { name: 'Complementary' });
    expect(second).toHaveAttribute('aria-selected', 'true');
    expect(second).toHaveFocus();
    // Only the selected tab is in the tab order
    expect(first).toHaveAttribute('tabindex', '-1');

    fireEvent.keyDown(second, { key: 'ArrowLeft' });
    fireEvent.keyDown(first, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: 'Monochromatic' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Triadic' }), {
      key: 'Home',
    });
    expect(first).toHaveFocus();
  });

  it('switches to a suggested paint when its row is chosen', () => {
    const { onSelectPaint } = setup();
    const [, accent] = screen.getAllByRole('listitem');
    fireEvent.click(accent.querySelector('button') as HTMLButtonElement);
    expect(onSelectPaint).toHaveBeenCalledWith(
      expect.objectContaining({ company: 'Citadel' })
    );
    expect(onSelectPaint).not.toHaveBeenCalledWith(red);
  });

  it('draws a dot on the wheel for each paint', () => {
    const { container } = render(
      <ColorSchemesSection
        paint={red}
        allBrands={false}
        headingId="s"
        onSelectPaint={jest.fn()}
      />
    );
    fireEvent.click(
      container.ownerDocument.querySelector(
        '[role="tab"]:nth-child(3)'
      ) as HTMLElement
    );
    expect(container.querySelectorAll('svg circle')).toHaveLength(3);
  });

  it('is left out for a paint with no hue', () => {
    const { container } = render(
      <ColorSchemesSection
        paint={paintNamed('Corvus Black')}
        allBrands={false}
        headingId="s"
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

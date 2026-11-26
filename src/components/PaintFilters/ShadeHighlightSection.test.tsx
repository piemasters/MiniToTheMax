import { act, render, screen, within } from '@testing-library/react';
import type { PaintDetails } from '../../types';
import { getShadeHighlight } from '../../util/color/shadeHighlight';
import { getPaint } from '../../util/paints/getPaint';
import { paintId } from '../../util/paints/paintId';
import { useCollection } from '../../util/paints/useCollection';
import { ShadeHighlightSection } from './ShadeHighlightSection';

const base = getPaint('Mephiston Red').paint as PaintDetails;
const { shades, highlights } = getShadeHighlight(base);
const [shade] = shades;
const [highlight] = highlights;

let setStatus: ReturnType<typeof useCollection>['setStatus'];
const Harness = () => {
  ({ setStatus } = useCollection());
  return (
    <ShadeHighlightSection
      paint={base}
      allBrands={false}
      headingId="blend"
      onSelectPaint={jest.fn()}
    />
  );
};

const swatch = (paint: PaintDetails) =>
  within(screen.getByTestId(`paint_${paintId(paint)}`)).getByRole('button');

beforeEach(() => window.localStorage.clear());

describe('ShadeHighlightSection', () => {
  it('shows which of its paints are owned or wanted', () => {
    window.localStorage.setItem(
      'paint-collection',
      JSON.stringify({
        [paintId(base)]: 'owned',
        [paintId(shade)]: 'wishlist',
      })
    );
    render(<Harness />);

    expect(swatch(base)).toHaveTextContent(', owned');
    expect(swatch(shade)).toHaveTextContent(', on wishlist');
    expect(swatch(highlight)).not.toHaveTextContent(/owned|wishlist/);
  });

  it('keeps up with changes made while it is showing', () => {
    render(<Harness />);
    act(() => setStatus(paintId(highlight), 'owned'));
    expect(swatch(highlight)).toHaveTextContent(', owned');
    act(() => setStatus(paintId(highlight), null));
    expect(swatch(highlight)).not.toHaveTextContent('owned');
  });
});

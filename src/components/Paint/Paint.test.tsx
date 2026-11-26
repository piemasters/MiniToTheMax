import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import { baseRetributorArmour } from '../../data/paints/citadel/base';
import {
  gameColorPolishedGold,
  gameColorSepiaWash,
} from '../../data/paints/vallejo/game';
import { smartColorBrass } from '../../data/paints/ionic/smart-colors';
import type { PaintDetails } from '../../types';
import { getPaint } from '../../util/paints/getPaint';
import { Paint } from './Paint';

describe('Paint', () => {
  test.each<[string, PaintDetails, string]>([
    [
      'Citadel',
      baseRetributorArmour,
      'paint_citadel_retributor_armour_citadel_base',
    ],
    [
      'Vallejo',
      gameColorPolishedGold,
      'paint_vallejo_polished_gold_vallejo_game_color',
    ],
    [
      'Vallejo wash',
      gameColorSepiaWash,
      'paint_vallejo_sepia_wash_vallejo_game_color',
    ],
    ['Ionic', smartColorBrass, 'paint_ionic_brass_ionic_smart_colors'],
  ])('renders %s correctly', (_brand, paint, testId) => {
    const { container } = render(<Paint paint={paint} />);

    expect(getByTestId(container as HTMLElement, testId)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('uses a vertical linear gradient for Vallejo washes', () => {
    const { container } = render(<Paint paint={gameColorSepiaWash} />);

    expect(container.querySelector('linearGradient')).toBeTruthy();
    expect(container.querySelector('radialGradient')).toBeNull();
  });

  describe('SVG ids', () => {
    const ids = (root: Element) =>
      [...root.querySelectorAll('[id]')].map((el) => el.id);

    // These two share a category and hex but have different gradients, so
    // ids built from those used to collide and one drew with the other's colors
    it('gives paints that share a category and hex their own gradient', () => {
      const brass = getPaint('Brass Scorpion').paint as PaintDetails;
      const bronze = getPaint('Castellax Bronze').paint as PaintDetails;
      expect(brass.hex).toBe(bronze.hex);
      expect(brass.category).toBe(bronze.category);

      const { container } = render(
        <>
          <Paint paint={brass} />
          <Paint paint={bronze} />
        </>
      );
      const [first, second] = [...container.querySelectorAll('svg')];
      const idOf = (svg: Element) => svg.querySelector('[id]')?.id;
      expect(idOf(first)).toBeTruthy();
      expect(idOf(first)).not.toBe(idOf(second));
      for (const svg of [first, second]) {
        expect(svg.querySelector('path')?.getAttribute('fill')).toBe(
          `url(#${idOf(svg)})`
        );
      }
    });

    it('keeps ids unique even when the same paint appears twice', () => {
      const { container } = render(
        <>
          <Paint paint={baseRetributorArmour} />
          <Paint paint={baseRetributorArmour} />
        </>
      );
      const all = ids(container);
      expect(all.length).toBeGreaterThan(0);
      expect(new Set(all).size).toBe(all.length);
    });

    it('gives Citadel Dry and Air lettering their own clip path ids', () => {
      const dry = getPaint('Praxeti White', 'Citadel Dry')
        .paint as PaintDetails;
      const { container } = render(
        <>
          <Paint paint={dry} />
          <Paint paint={dry} />
        </>
      );
      const clips = [...container.querySelectorAll('clipPath')].map(
        (el) => el.id
      );
      expect(clips).toHaveLength(2);
      expect(clips[0]).not.toBe(clips[1]);
    });
  });

  describe('as a button', () => {
    it('is not interactive unless given onSelect', () => {
      render(<Paint paint={gameColorPolishedGold} />);
      expect(screen.queryByRole('button')).toBeNull();
    });

    it('is named by its visible label, then the hex, and calls onSelect with the paint', () => {
      const onSelect = jest.fn();
      render(<Paint paint={gameColorPolishedGold} onSelect={onSelect} />);

      const button = screen.getByRole('button', {
        name: `Polished Gold (${gameColorPolishedGold.number}) Hex ${gameColorPolishedGold.hex.toUpperCase()}`,
      });
      expect(button).toHaveAttribute('title');
      fireEvent.click(button);
      expect(onSelect).toHaveBeenCalledWith(gameColorPolishedGold);
    });

    it('contains only phrasing content, which is valid inside a button', () => {
      const { container } = render(
        <Paint paint={gameColorPolishedGold} onSelect={jest.fn()} />
      );
      expect(container.querySelector('button div')).toBeNull();
    });
  });

  describe('as an owned toggle', () => {
    const button = (status?: 'owned' | 'wishlist') => {
      render(
        <Paint
          paint={baseRetributorArmour}
          onSelect={jest.fn()}
          status={status}
          selectOwned
        />
      );
      return screen.getByRole('button');
    };

    it('is not pressed without a status, and opens no dialog', () => {
      const toggle = button();
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
      expect(toggle).not.toHaveAttribute('aria-haspopup');
    });

    it('is pressed when owned, without saying owned twice', () => {
      const toggle = button('owned');
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
      expect(toggle).not.toHaveTextContent(', owned');
    });

    it('is not pressed for a wishlist paint, and still says so', () => {
      const toggle = button('wishlist');
      expect(toggle).toHaveAttribute('aria-pressed', 'false');
      expect(toggle).toHaveTextContent('on wishlist');
    });
  });

  describe('collection status', () => {
    it('shows no marker without a status', () => {
      const { container } = render(<Paint paint={gameColorPolishedGold} />);
      expect(container.textContent).not.toMatch(/[✓★]/);
    });

    it.each([
      ['owned', '✓', 'owned'],
      ['wishlist', '★', 'on wishlist'],
    ] as const)(
      'marks a %s paint, and says so in its name',
      (status, mark, said) => {
        const { container } = render(
          <Paint
            paint={gameColorPolishedGold}
            onSelect={jest.fn()}
            status={status}
          />
        );
        expect(container.textContent).toContain(mark);
        expect(screen.getByRole('button').textContent).toContain(said);
      }
    );
  });
});

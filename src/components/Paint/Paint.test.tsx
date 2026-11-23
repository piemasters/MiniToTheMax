import { getByTestId, render } from '@testing-library/react';
import { baseRetributorArmour } from '../../data/paints/citadel/base';
import {
  gameColorPolishedGold,
  gameColorSepiaWash,
} from '../../data/paints/vallejo/game';
import { smartColorBrass } from '../../data/paints/ionic/smart-colors';
import type { PaintDetails } from './types';
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
});

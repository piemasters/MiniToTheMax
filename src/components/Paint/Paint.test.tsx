import { getByTestId, render } from '@testing-library/react';

import { Paint } from './Paint';
import { baseRetributorArmour } from '../../data/paints/citadel/base';

describe('Paint', () => {
  test('renders correctly', () => {
    const { container } = render(<Paint paint={baseRetributorArmour} />);

    expect(
      getByTestId(
        container as HTMLElement,
        'paint_citadel_retributor_armour_citadel_base'
      )
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

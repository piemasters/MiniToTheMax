import { getByTestId, render } from '@testing-library/react';

import { Badge } from './Badge';
import { BadgeNames } from '../../types';

describe('Badge', () => {
  test('renders correctly', () => {
    const { container } = render(<Badge type={BadgeNames.showcase} />);

    expect(getByTestId(container, 'badge')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

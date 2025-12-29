import { getByTestId, render } from '@testing-library/react';
import { BadgeNames } from '../Badges';
import { Badge } from './Badge';

describe('Badge', () => {
  test('renders correctly', () => {
    const { container } = render(<Badge type={BadgeNames.showcase} />);

    expect(getByTestId(container, 'badge')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

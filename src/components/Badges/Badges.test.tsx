import { getByTestId, render } from '@testing-library/react';

import { Badges } from './Badges';

describe('Badges', () => {
  test('renders correctly', () => {
    const { container } = render(<Badges />);

    expect(getByTestId(container as HTMLElement, 'badges')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

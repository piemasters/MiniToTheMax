import { getByTestId, render } from '@testing-library/react';
import { Video } from './Video';

describe('Video', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Video videoId="qcWaykRRDfM" title="Grey Knight Stormraven" />
    );
    expect(getByTestId(container as HTMLElement, 'video')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

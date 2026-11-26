import { getByTestId, render } from '@testing-library/react';
import { CoverImage } from './CoverImage';

describe('CoverImage', () => {
  test('renders correctly', () => {
    const { container } = render(
      <CoverImage
        image={{
          src: 'cover.jpeg',
          width: 1800,
          height: 900,
        }}
        title={'Demo Post Title'}
      />
    );

    expect(getByTestId(container, 'cover-image')).toHaveTextContent(
      'Demo Post Title'
    );
    expect(container).toMatchSnapshot();
  });
});

import { getByTestId, render } from '@testing-library/react';
import { CoverImage } from './CoverImage';

describe('CoverImage', () => {
  test('renders correctly', () => {
    const { container } = render(
      <CoverImage
        image={{
          layout: 'constrained',
          width: 1800,
          height: 900,
          backgroundColor: '#282828',
          images: {
            fallback: {
              src: 'cover.jpeg',
            },
          },
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

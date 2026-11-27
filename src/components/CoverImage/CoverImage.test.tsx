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

  test('shows a placeholder behind the image until it loads', () => {
    const { getByRole } = render(
      <CoverImage
        image={{
          src: 'cover.jpeg',
          width: 1800,
          height: 900,
          placeholder: 'data:image/webp;base64,tiny',
        }}
        title={'Demo Post Title'}
      />
    );

    const image = getByRole('img');
    expect(image.style.backgroundImage).toContain('base64,tiny');
    expect(image).not.toHaveAttribute('placeholder');
  });
});

import { getByTestId, render } from '@testing-library/react';
import { CoverCategory } from './CoverCategory';

describe('CoverCategory', () => {
  test('renders correctly', () => {
    const { container } = render(
      <CoverCategory
        img={{
          src: 'cover.jpeg',
          width: 1800,
          height: 900,
        }}
        slug={'/showcase/board-games'}
        title={'Board Games'}
      />
    );

    expect(getByTestId(container, 'cover-category')).toHaveTextContent(
      'Board Games'
    );
    expect(container).toMatchSnapshot();
  });
});

import { getByTestId, render } from '@testing-library/react';
import { PostTag } from './PostTag';

describe('PostTag', () => {
  test('renders correctly', () => {
    const { container } = render(<PostTag name={'Tag'} type={'tag'} />);

    expect(getByTestId(container as HTMLElement, 'post-tag')).toHaveTextContent(
      'Tag'
    );
    expect(container).toMatchSnapshot();
  });
});

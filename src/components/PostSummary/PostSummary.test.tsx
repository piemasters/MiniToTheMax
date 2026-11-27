import { getByTestId, render } from '@testing-library/react';
import { PostSummary } from './PostSummary';

describe('PostSummary', () => {
  test('renders correctly', () => {
    const { container } = render(
      <PostSummary
        date={'11/01/2019'}
        img={{
          src: 'cover.jpeg',
          width: 1800,
          height: 900,
        }}
        slug={'/slug/'}
        title={'Demo Post Title'}
        excerpt={'A test sentence'}
      />
    );

    expect(
      getByTestId(container as HTMLElement, 'post-summary')
    ).toHaveTextContent('Demo Post Title');
    expect(container).toMatchSnapshot();
  });
});

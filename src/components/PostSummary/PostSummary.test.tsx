import { getByTestId, render } from '@testing-library/react';
import { PostSummary } from './PostSummary';

describe('PostSummary', () => {
  test('renders correctly', () => {
    const { container } = render(
      <PostSummary
        date={'11/01/2019'}
        img={{
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
        slug={'slug'}
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

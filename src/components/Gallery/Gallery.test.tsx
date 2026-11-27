import { render, getByTestId } from '@testing-library/react';
import { Gallery } from './Gallery';
import { mockGallery } from './mock';

describe('Gallery', () => {
  it('renders correctly', () => {
    const { container } = render(<Gallery gallery={[]} />);
    expect(getByTestId(container as HTMLElement, 'gallery')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('renders the correct number of images', () => {
    const { container, getAllByRole } = render(
      <Gallery gallery={mockGallery} />
    );
    expect(getAllByRole('img')).toHaveLength(5);
    expect(getAllByRole('button')).toHaveLength(5);
    expect(container).toMatchSnapshot();
  });
});

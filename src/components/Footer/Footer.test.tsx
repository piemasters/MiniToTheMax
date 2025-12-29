import { render, getByTestId } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('renders correctly', () => {
    const data = {
      site: {
        siteMetadata: {
          author: 'David Norton',
        },
      },
    };

    const { container } = render(
      <Footer author={data.site.siteMetadata.author} />
    );

    expect(getByTestId(container as HTMLElement, 'footer')).toHaveTextContent(
      'David Norton'
    );
    expect(container).toMatchSnapshot();
  });
});

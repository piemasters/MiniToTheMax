import { render } from '@testing-library/react';
import { Seo } from './Seo';

describe('Seo', () => {
  test('renders correctly', () => {
    const data = {
      site: {
        siteMetadata: {
          title: 'MiniToTheMax',
          description: 'An Aspiring Hobby & Painting Blog',
          siteUrl: 'https://minitothemax.app',
          image: `content/assets/images/logo.webp`,
        },
      },
    };

    const { container } = render(
      <Seo
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        image={data.site.siteMetadata.image}
        siteUrl={data.site.siteMetadata.siteUrl}
      />
    );

    expect(container).toMatchSnapshot();
  });
});

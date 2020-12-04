import React from 'react';
import Seo from '../../components/seo';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';

describe('Seo', () => {
  test('renders correctly', () => {
    const data = {
      site: {
        siteMetadata: {
          title: 'MiniToTheMax',
          description: 'An Aspiring Hobby & Painting Blog',
          siteUrl: 'https://minitothemax.app',
          image: `content/assets/images/logo.png`,
        },
      },
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Seo
          title={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
          image={data.site.siteMetadata.image}
          siteUrl={data.site.siteMetadata.siteUrl}
        />
      </ThemeProvider>
    );

    expect(container).toMatchSnapshot();
  });
});

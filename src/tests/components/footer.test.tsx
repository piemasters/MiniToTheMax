import React from 'react';
import Footer from '../../components/footer';
import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';

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
      <ThemeProvider theme={theme}>
        <Footer author={data.site.siteMetadata.author} />
      </ThemeProvider>
    );

    expect(getByTestId(container as HTMLElement, 'footer')).toHaveTextContent(
      'David Norton'
    );
    expect(container).toMatchSnapshot();
  });
});

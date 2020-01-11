import React from 'react';
import { PureFooter as Footer } from '../../components/footer';
import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
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

    expect(getByTestId(container, 'footer')).toHaveTextContent('David Norton');
    expect(container).toMatchSnapshot();
  });
});

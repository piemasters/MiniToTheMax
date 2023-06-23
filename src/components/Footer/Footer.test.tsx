import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Footer } from './Footer';
import { appTheme } from '../../styles/theme';

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
      <ThemeProvider theme={appTheme}>
        <Footer author={data.site.siteMetadata.author} />
      </ThemeProvider>
    );

    expect(getByTestId(container as HTMLElement, 'footer')).toHaveTextContent(
      'David Norton'
    );
    expect(container).toMatchSnapshot();
  });
});

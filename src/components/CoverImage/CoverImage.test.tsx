import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { CoverImage } from './CoverImage';
import { appTheme } from '../../styles/theme';
import { renderWithTransitionProvider } from '../../util';

describe('CoverImage', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={appTheme}>
        <CoverImage
          image={{
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
          title={'Demo Post Title'}
        />
      </ThemeProvider>
    );

    expect(getByTestId(container, 'cover-image')).toHaveTextContent(
      'Demo Post Title'
    );
    expect(container).toMatchSnapshot();
  });
});

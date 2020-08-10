import React from 'react';
import CoverImage from '../../components/cover-image';
import { getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';
import { renderWithTransitionProvider } from '../util/transition-provider';

describe('CoverImage', () => {
  test('renders correctly', () => {
    const { container } = renderWithTransitionProvider(
      <ThemeProvider theme={theme}>
        <CoverImage
          image={{
            aspectRatio: 1,
            src: 'cover.jpeg',
            srcSet: '',
            sizes: '(max-width: 800px) 100vw, 800px',
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

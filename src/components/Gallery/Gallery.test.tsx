import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import { Gallery } from './Gallery';
import { appTheme } from '../../styles/theme';
import { mockGallery } from './mock';

describe('Gallery', () => {
  it('renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <Gallery gallery={[]} />
      </ThemeProvider>
    );
    expect(getByTestId(container as HTMLElement, 'gallery')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('renders the correct number of images', () => {
    const { container, getAllByRole } = render(
      <ThemeProvider theme={appTheme}>
        <Gallery gallery={mockGallery} />
      </ThemeProvider>
    );
    expect(getAllByRole('img', { hidden: true })).toHaveLength(10);
    expect(container).toMatchSnapshot();
  });
});

import React from 'react';
import PageLink from '../../components/page-link';
import { render, getByTestId } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../styles/theme';

describe('PageLink', () => {
  test('renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageLink to={'/'}>Default</PageLink>
      </ThemeProvider>
    );

    // expect(getByTestId(container, 'page-link')).toHaveTextContent('Default');
    // expect(container).toMatchSnapshot();
  });

  test('paintDrip renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageLink type={'paintDrip'} to={'/'}>
          Paint Drip
        </PageLink>
      </ThemeProvider>
    );

    // expect(getByTestId(container, 'page-link-paint')).toHaveTextContent(
    //   'Paint Drip'
    // );
    // expect(container).toMatchSnapshot();
  });

  test('fade renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageLink type={'fade'} to={'/'}>
          Fade
        </PageLink>
      </ThemeProvider>
    );

    // expect(getByTestId(container, 'page-link-fade')).toHaveTextContent('Fade');
    // expect(container).toMatchSnapshot();
  });

  test('swipe renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageLink type={'swipe'} to={'/'}>
          Swipe
        </PageLink>
      </ThemeProvider>
    );

    // expect(getByTestId(container, 'page-link-swipe')).toHaveTextContent(
    //   'Swipe'
    // );
    // expect(container).toMatchSnapshot();
  });

  test('cover renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageLink type={'cover'} to={'/'}>
          Cover
        </PageLink>
      </ThemeProvider>
    );

    // expect(getByTestId(container, 'page-link-cover')).toHaveTextContent(
    //   'Cover'
    // );
    // expect(container).toMatchSnapshot();
  });
});

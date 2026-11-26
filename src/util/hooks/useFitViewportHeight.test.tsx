import { act, render } from '@testing-library/react';
import { useRef } from 'react';
import { useFitViewportHeight } from './useFitViewportHeight';

let top = 250;

const Sidebar = ({ enabled = true }: { enabled?: boolean }) => {
  const ref = useRef<HTMLElement>(null);
  useFitViewportHeight(ref, enabled);
  // jsdom reads `top` from the inline style, like a sticky `top-4` (16px)
  return <aside ref={ref} style={{ top: '16px' }} data-testid="sidebar" />;
};

const sidebar = (container: HTMLElement) =>
  container.querySelector('aside') as HTMLElement;

const scrollTo = async (newTop: number) => {
  top = newTop;
  await act(async () => {
    window.dispatchEvent(new Event('scroll'));
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
};

describe('useFitViewportHeight', () => {
  beforeEach(() => {
    top = 250;
    window.innerHeight = 800;
    jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(() => ({ top }) as DOMRect);
  });
  afterEach(() => jest.restoreAllMocks());

  it('leaves room below the window for where the element currently starts', () => {
    const { container } = render(<Sidebar />);
    // 800 window - 250 start - 16 bottom gap
    expect(sidebar(container).style.maxHeight).toBe('534px');
  });

  it('grows as the page scrolls, up to the full window once stuck', async () => {
    const { container } = render(<Sidebar />);

    await scrollTo(100);
    expect(sidebar(container).style.maxHeight).toBe('684px');

    await scrollTo(16); // stuck at its `top` gap
    expect(sidebar(container).style.maxHeight).toBe('768px');
  });

  it('does not shrink below the gap when the page pushes it up', async () => {
    const { container } = render(<Sidebar />);
    await scrollTo(-200);
    expect(sidebar(container).style.maxHeight).toBe('768px');
  });

  it('follows window resizes', async () => {
    const { container } = render(<Sidebar />);
    window.innerHeight = 600;
    await act(async () => {
      window.dispatchEvent(new Event('resize'));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });
    expect(sidebar(container).style.maxHeight).toBe('334px');
  });

  it('does nothing while disabled', () => {
    const { container } = render(<Sidebar enabled={false} />);
    expect(sidebar(container).style.maxHeight).toBe('');
  });

  it('removes its cap on unmount of the hook', () => {
    const { container, rerender } = render(<Sidebar />);
    expect(sidebar(container).style.maxHeight).not.toBe('');
    rerender(<Sidebar enabled={false} />);
    expect(sidebar(container).style.maxHeight).toBe('');
  });
});

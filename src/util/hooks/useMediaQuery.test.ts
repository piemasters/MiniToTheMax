import { act, renderHook } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

const mockMatchMedia = (initial: boolean) => {
  let matches = initial;
  const listeners = new Set<() => void>();
  window.matchMedia = jest.fn().mockImplementation(() => ({
    get matches() {
      return matches;
    },
    addEventListener: (_: string, fn: () => void) => listeners.add(fn),
    removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
  }));
  return {
    listeners,
    set: (next: boolean) => {
      matches = next;
      listeners.forEach((fn) => fn());
    },
  };
};

describe('useMediaQuery', () => {
  it('reports whether the query currently matches', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 64rem)'));
    expect(result.current).toBe(true);
  });

  it('updates when the query starts or stops matching', () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 64rem)'));
    expect(result.current).toBe(false);

    act(() => media.set(true));
    expect(result.current).toBe(true);
  });

  it('stops listening on unmount', () => {
    const media = mockMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 64rem)'));
    expect(media.listeners.size).toBe(1);
    unmount();
    expect(media.listeners.size).toBe(0);
  });
});

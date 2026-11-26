import { act, renderHook } from '@testing-library/react';
import { useCollection } from './useCollection';

const KEY = 'paint-collection';

beforeEach(() => window.localStorage.clear());

describe('useCollection', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useCollection());
    expect(result.current.collection).toEqual({});
  });

  it('saves changes to localStorage and shares them between components', () => {
    const first = renderHook(() => useCollection());
    const second = renderHook(() => useCollection());

    act(() => first.result.current.setStatus('a', 'owned'));
    expect(second.result.current.collection).toEqual({ a: 'owned' });
    expect(JSON.parse(window.localStorage.getItem(KEY) as string)).toEqual({
      a: 'owned',
    });

    act(() => first.result.current.setStatus('a', null));
    expect(second.result.current.collection).toEqual({});
  });

  it('picks up what an earlier visit saved', () => {
    window.localStorage.setItem(KEY, '{"b":"wishlist"}');
    const { result } = renderHook(() => useCollection());
    expect(result.current.collection).toEqual({ b: 'wishlist' });
  });

  it('follows changes made in another tab', () => {
    const { result } = renderHook(() => useCollection());
    act(() => {
      window.localStorage.setItem(KEY, '{"c":"owned"}');
      window.dispatchEvent(new StorageEvent('storage', { key: KEY }));
    });
    expect(result.current.collection).toEqual({ c: 'owned' });
  });

  it('keeps a stable object while nothing changes', () => {
    const { result, rerender } = renderHook(() => useCollection());
    const before = result.current.collection;
    rerender();
    expect(result.current.collection).toBe(before);
  });
});

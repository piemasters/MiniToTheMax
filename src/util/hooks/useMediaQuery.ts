import { useCallback, useSyncExternalStore } from 'react';

/**
 * Tracks a CSS media query. `serverValue` is used while rendering on the server
 * and during hydration, so pick whichever answer your CSS already assumes.
 */
export const useMediaQuery = (query: string, serverValue = false) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
};

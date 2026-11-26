import { type RefObject, useLayoutEffect } from 'react';

/**
 * Caps a sticky element's height to the part of the window below it, so all of
 * its (scrollable) content can be reached without scrolling the page.
 *
 * A fixed `max-height: 100vh - gaps` is only right once the element has stuck
 * to the top. Before that it starts further down the page, so its bottom would
 * sit off-screen. This measures where it actually is, and the cap grows as the
 * page scrolls until the element sticks, at which point it fills the window.
 *
 * The gap above and below is taken from the element's own `top` (e.g. `top-4`).
 */
export const useFitViewportHeight = (
  ref: RefObject<HTMLElement | null>,
  enabled = true
) => {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const gap = parseFloat(getComputedStyle(element).top) || 0;
      const top = Math.max(element.getBoundingClientRect().top, gap);
      element.style.maxHeight = `${Math.max(window.innerHeight - top - gap, 0)}px`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      element.style.maxHeight = '';
    };
  }, [ref, enabled]);
};

import type { AnchorHTMLAttributes } from 'react';

/**
 * Stands in for the "gatsby" package in the shared components Astro renders.
 * They only need links, which here are ordinary ones.
 */
export const Link = ({
  to,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
  <a {...props} href={to} />
);

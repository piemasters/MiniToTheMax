import { AnchorHTMLAttributes, FC } from 'react';
import { clsx } from '../../util/clsx';

const trim = (path: string) => path.replace(/\/+$/, '') || '/';

/** Whether a link leads to the current page, or to the section containing it. */
const isActive = (to: string, currentPath: string) => {
  const target = trim(to);
  const path = trim(currentPath);
  return target === '/'
    ? path === '/'
    : path === target || path.startsWith(`${target}/`);
};

/**
 * Pages are served at addresses ending in a slash, so link to those rather than
 * being redirected. Files, other sites, queries and anchors are left alone.
 */
const toPageAddress = (to: string) =>
  /^\/(?!\/)[^?#]*$/.test(to) && !/(\/|\.\w+)$/.test(to) ? `${to}/` : to;

export const PageLink: FC<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string;
    /** The address of the page being shown, to highlight links leading to it. */
    currentPath?: string;
    linkActiveStyle?: string;
    disabled?: boolean;
  }
> = ({
  children,
  to,
  currentPath,
  linkActiveStyle,
  disabled,
  className,
  ...props
}) => {
  const baseClasses =
    className ||
    'text-blue-500 visited:text-blue-500 hover:text-blue-700 no-underline';

  if (disabled) {
    return <div className="text-gray-700">{children}</div>;
  }

  const current = currentPath !== undefined;

  return (
    <a
      data-testid="page-link"
      href={toPageAddress(to)}
      aria-current={
        current && trim(to) === trim(currentPath) ? 'page' : undefined
      }
      className={clsx(
        baseClasses,
        current && isActive(to, currentPath) && linkActiveStyle
      )}
      {...props}
    >
      {children}
    </a>
  );
};

export default PageLink;

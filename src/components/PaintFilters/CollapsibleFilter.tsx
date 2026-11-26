import { type ReactNode, useId, useState } from 'react';
import { clsx } from '../../util/clsx';
import { textToId } from '../../util/textToId';

export type HeadingLevel = 2 | 3;

/** A titled filter group that can be opened and closed. */
export const CollapsibleFilter = ({
  title,
  summary,
  headingLevel,
  defaultCollapsed = false,
  children,
}: {
  title: string;
  /** Present when the group is narrowed, e.g. "4 of 33". */
  summary?: string | null;
  headingLevel: HeadingLevel;
  defaultCollapsed?: boolean;
  children: ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const contentId = useId();
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <div data-testid={`filter-group-${textToId(title)}`} className="border-b">
      <Heading className="m-0! text-base!">
        <button
          type="button"
          className="flex items-center justify-between w-full gap-2 px-2 py-3 font-bold text-left cursor-pointer hover:bg-gray-50"
          aria-expanded={!isCollapsed}
          aria-controls={contentId}
          onClick={() => setIsCollapsed((collapsed) => !collapsed)}
        >
          <span className="flex items-center gap-2">
            {title}
            {summary && (
              <>
                <span
                  aria-hidden="true"
                  className="inline-block w-2 h-2 bg-red-700 rounded-full"
                />
                <span className="sr-only">(filtered)</span>
              </>
            )}
          </span>
          <span className="flex items-center gap-3">
            {isCollapsed && summary && (
              <span className="text-xs font-normal text-gray-600">
                {summary}
              </span>
            )}
            <span
              aria-hidden="true"
              className={clsx(
                isCollapsed ? 'border-b-2 border-r-2' : 'border-t-2 border-l-2',
                'w-2 h-2 transform rotate-45 border-gray-600'
              )}
            />
          </span>
        </button>
      </Heading>
      <div id={contentId} className="p-2" hidden={isCollapsed}>
        {children}
      </div>
    </div>
  );
};

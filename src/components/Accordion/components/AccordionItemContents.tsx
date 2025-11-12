import { HTMLProps, useContext, useRef } from 'react';
import { clsx } from '../../util';
import { AccordionContext, AccordionSelectedType } from '../Accordion';

export const AccordionItemContents = ({
  value,
  children,
  className,
}: HTMLProps<HTMLDivElement> & { value: AccordionSelectedType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion.Contents must be used within an Accordion');
  }
  const { name, selected } = context;
  const open = selected === value;
  return (
    <div
      id={`accordion-panel-${name}-${value}`}
      aria-labelledby={`accordion-item-header-${name}-${value}`}
      data-testid="accordion-item-content"
      className={clsx(
        'overflow-y-hidden transition-all',
        open ? 'open' : 'closed',
        className
      )}
      style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
      aria-hidden={!open}
    >
      <div className="p-4" ref={ref}>
        {children}
      </div>
    </div>
  );
};

import { HTMLProps, useContext } from 'react';
import { ChevronDown } from './ChevronDown';
import { clsx } from '../../util';
import { AccordionContext, AccordionSelectedType } from '../Accordion';

export const AccordionItemHeader = ({
  value,
  children,
  className,
}: HTMLProps<HTMLDivElement> & {
  value: AccordionSelectedType;
}) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion.Header must be used within an Accordion');
  }
  const { name, selected } = context;
  const open = selected === value;
  return (
    <div
      id={`accordion-item-header-${name}-${value}`}
      aria-controls={`accordion-panel-${name}-${value}`}
      data-testid="accordion-item-header"
      className={clsx(
        'flex items-center justify-between p-8 font-medium cursor-pointer bg-neutral-100 hover:bg-neutral-200',
        className
      )}
    >
      {children}
      <ChevronDown
        className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
      />
    </div>
  );
};

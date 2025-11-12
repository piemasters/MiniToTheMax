import { HTMLProps, useContext } from 'react';
import { clsx } from '../../util';
import { AccordionContext } from '../Accordion';

export const AccordionItemWrapper = ({
  children,
  value,
  ...props
}: HTMLProps<HTMLLIElement>) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion.Wrapper must be used within an Accordion');
  }
  const { selected, setSelected } = context;
  const open = selected === value;

  return (
    <li
      data-testid="accordion-item"
      className={clsx('list-none! bg-white border-b', props.className)}
      onClick={() => setSelected(open ? undefined : value)}
      onKeyDown={() => setSelected(open ? undefined : value)}
      role="menuitem"
      {...props}
    >
      {children}
    </li>
  );
};

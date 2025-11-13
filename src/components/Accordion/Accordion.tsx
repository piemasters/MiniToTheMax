import {
  createContext,
  useEffect,
  useState,
  HTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';
import { clsx } from '../util';
import { AccordionItemHeader } from './components/AccordionHeader';
import { AccordionItemContents } from './components/AccordionItemContents';
import { AccordionItemWrapper } from './components/AccordionItemWrapper';
import { AccordionItemDefault } from './components/AccordionItemDefault';

export type AccordionSelectedType =
  | string
  | number
  | readonly string[]
  | undefined;

export const AccordionContext = createContext<
  | {
      name: string;
      selected: AccordionSelectedType;
      setSelected: Dispatch<SetStateAction<AccordionSelectedType>>;
    }
  | undefined
>(undefined);

const Accordion = ({
  children,
  name,
  value,
  onChange,
  className,
  ...props
}: HTMLProps<HTMLUListElement> & {
  value?: AccordionSelectedType;
  onChange?: (value: AccordionSelectedType) => void;
}) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <ul
      data-testid="accordion"
      role="menu"
      className={clsx('m-0!', className)}
      {...props}
    >
      <AccordionContext.Provider
        value={{ name: name || 'default', selected, setSelected }}
      >
        {children}
      </AccordionContext.Provider>
    </ul>
  );
};

Accordion.Wrapper = AccordionItemWrapper;
Accordion.Header = AccordionItemHeader;
Accordion.Contents = AccordionItemContents;
Accordion.Item = AccordionItemDefault;

export { Accordion };

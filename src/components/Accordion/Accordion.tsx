import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  HTMLProps,
  ReactNode,
} from 'react';

const AccordionContext = createContext<
  | {
      selected: string | number | readonly string[] | undefined;
      setSelected: React.Dispatch<
        React.SetStateAction<string | number | readonly string[] | undefined>
      >;
    }
  | undefined
>(undefined);

type AccordionType = HTMLProps<HTMLUListElement> & {
  value?: string | number | readonly string[];
  onChange?: (value: string | number | readonly string[] | undefined) => void;
};

export const Accordion = ({
  children,
  value,
  onChange,
  ...props
}: AccordionType) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <ul data-testid="accordion" {...props} className="m-0!">
      <AccordionContext.Provider value={{ selected, setSelected }}>
        {children}
      </AccordionContext.Provider>
    </ul>
  );
};

type AccordionItemType = HTMLProps<HTMLLIElement> & {
  trigger: ReactNode;
};

export const AccordionItem = ({
  children,
  value,
  trigger,
  ...props
}: AccordionItemType) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  const { selected, setSelected } = context;
  const open = selected === value;

  const ref = useRef<HTMLDivElement>(null);

  return (
    <li
      data-testid="accordion-item"
      className="list-none! bg-white border-b"
      {...props}
    >
      <header
        role="button"
        tabIndex={!isNaN(Number(value)) ? Number(value) : 0}
        onClick={() => setSelected(open ? undefined : value)}
        onKeyDown={() => setSelected(open ? undefined : value)}
        className="flex items-center justify-between p-4 font-medium cursor-pointer bg-neutral-100 hover:bg-neutral-200"
      >
        <div
          data-testid="accordion-item-trigger"
          className="flex items-center justify-between p-4 font-medium"
        >
          {trigger}

          <ChevronDown
            className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </header>
      <div
        data-testid="accordion-item-content"
        className={`overflow-y-hidden transition-all ${open ? 'open' : 'closed'}`}
        style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
      >
        <div className="p-4" ref={ref}>
          {children}
        </div>
      </div>
    </li>
  );
};

type ChevronDownType = HTMLProps<HTMLDivElement> & {};

const ChevronDown = ({ className }: ChevronDownType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

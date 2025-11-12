import { HTMLProps, ReactNode, useContext } from 'react';
import { AccordionContext } from '../Accordion';
import { AccordionItemWrapper } from './AccordionItemWrapper';
import { AccordionItemHeader } from './AccordionHeader';
import { AccordionItemContents } from './AccordionItemContents';

export const AccordionItemDefault = ({
  children,
  value,
  trigger,
  ...props
}: HTMLProps<HTMLLIElement> & {
  trigger: ReactNode;
}) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion.Item must be used within an Accordion');
  }

  return (
    <AccordionItemWrapper value={value} {...props}>
      <AccordionItemHeader value={value}>{trigger}</AccordionItemHeader>
      <AccordionItemContents value={value}>{children}</AccordionItemContents>
    </AccordionItemWrapper>
  );
};

import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { Chip } from './Chip';

const setup = (props: Partial<ComponentProps<typeof Chip>> = {}) => {
  const onRemove = jest.fn();
  const view = render(
    <Chip
      label="Citadel"
      ariaLabel="Remove filter Citadel"
      onRemove={onRemove}
      {...props}
    />
  );
  return { ...view, onRemove, button: screen.getByRole('button') };
};

describe('Chip', () => {
  it('shows the label', () => {
    const { button } = setup();
    expect(button).toHaveTextContent('Citadel');
  });

  it('is named by the aria label', () => {
    const { button } = setup();
    expect(button).toHaveAccessibleName('Remove filter Citadel');
  });

  it('calls onRemove when clicked', () => {
    const { button, onRemove } = setup();
    expect(onRemove).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('does not submit a surrounding form', () => {
    const { button } = setup();
    expect(button).toHaveAttribute('type', 'button');
  });

  // ActiveFilters finds chips by this attribute to move focus after a removal
  it('is marked as a chip', () => {
    const { button } = setup();
    expect(button).toHaveAttribute('data-chip');
  });

  it('hides the remove symbol from assistive technology', () => {
    setup();
    expect(screen.getByText('✕')).toHaveAttribute('aria-hidden', 'true');
  });

  it('puts the prefix before the label', () => {
    const { button } = setup({ prefix: <span data-testid="prefix" /> });
    expect(button.firstChild).toBe(screen.getByTestId('prefix'));
  });
});

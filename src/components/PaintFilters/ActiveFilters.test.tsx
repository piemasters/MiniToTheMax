import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import type { ActiveFilter } from '../../util/filtering/activeFilters';
import { ActiveFilters } from './ActiveFilters';

const chips: ActiveFilter[] = [
  { id: 'search', kind: 'search', label: 'Search “red”' },
  { id: 'company', kind: 'group', field: 'company', label: 'Citadel' },
  { id: 'type', kind: 'group', field: 'type', label: 'Vallejo' },
];

const Harness = ({ focusWhenEmpty }: { focusWhenEmpty: () => void }) => {
  const [filters, setFilters] = useState(chips);
  return (
    <ActiveFilters
      filters={filters}
      onRemove={(f) => setFilters((all) => all.filter((x) => x.id !== f.id))}
      onClearAll={() => setFilters([])}
      focusWhenEmpty={focusWhenEmpty}
    />
  );
};

describe('ActiveFilters focus', () => {
  it('moves focus to the chip that takes the removed one’s place', () => {
    render(<Harness focusWhenEmpty={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Citadel/ }));
    expect(screen.getByRole('button', { name: /Vallejo/ })).toHaveFocus();
  });

  it('falls back to the previous chip when the last one is removed', () => {
    render(<Harness focusWhenEmpty={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Vallejo/ }));
    expect(screen.getByRole('button', { name: /Citadel/ })).toHaveFocus();
  });

  it('hands focus on once no chips remain', () => {
    const focusWhenEmpty = jest.fn();
    render(<Harness focusWhenEmpty={focusWhenEmpty} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(focusWhenEmpty).toHaveBeenCalledTimes(1);
  });
});

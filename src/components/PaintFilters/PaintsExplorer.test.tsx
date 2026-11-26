import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { PaintsExplorer } from './PaintsExplorer';

// Drawing ~900 real SVG swatches per render makes these tests crawl, so use a
// light stand-in that honours the same contract: the test id, and a button
// named "<label>, <HEX>" when given onSelect. The real component has its own
// tests (including this contract) in Paint.test.tsx.
jest.mock('../Paint/Paint', () => {
  const { paintId } = jest.requireActual('../../util/paints/paintId');
  return {
    Paint: ({
      paint,
      onSelect,
      status,
      selectOwned,
    }: {
      paint: { name: string; number?: string; hex: string };
      onSelect?: (paint: unknown) => void;
      status?: string;
      selectOwned?: boolean;
    }) => {
      const label = paint.number
        ? `${paint.name} (${paint.number})`
        : paint.name;
      return (
        <div data-testid={`paint_${paintId(paint)}`}>
          {onSelect ? (
            <button
              type="button"
              aria-label={`${label}, ${paint.hex.toUpperCase()}`}
              aria-pressed={selectOwned ? status === 'owned' : undefined}
              onClick={() => onSelect(paint)}
            >
              {label}
            </button>
          ) : (
            label
          )}
        </div>
      );
    },
  };
});

// A sample of the real data: every sixth paint, plus the ones searched for below.
// Still spans every company and category group, but renders far faster.
jest.mock('../../data/paints', () => {
  const actual = jest.requireActual('../../data/paints');
  return {
    ...actual,
    allPaints: actual.allPaints.filter(
      (paint: { name: string }, index: number) =>
        index % 6 === 0 || /mephiston|gold/i.test(paint.name)
    ),
  };
});

const setViewport = (desktop: boolean) => {
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: desktop,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
};

// The page mirrors its filters in the URL, and jsdom keeps the URL between
// tests, so start each one from a clean address
const setUrl = (search = '') =>
  window.history.replaceState(null, '', `/paints${search}`);

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = jest.fn(function (
    this: HTMLDialogElement
  ) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = jest.fn(function (
    this: HTMLDialogElement
  ) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  });
});

beforeEach(() => {
  setUrl();
  setViewport(true);
});
afterEach(() => {
  setUrl();
  delete (window as unknown as { EyeDropper?: unknown }).EyeDropper;
  delete (navigator as unknown as { clipboard?: unknown }).clipboard;
});

// Queries are scoped wherever possible: the page holds ~900 swatch buttons,
// which makes unscoped role queries slow
const sidebar = () =>
  screen.getByRole('complementary', { name: 'Paint filters' });
const group = (name: string) => screen.getByTestId(`filter-group-${name}`);
const activeFilters = () => screen.queryByLabelText('Active filters');
const chips = () => within(screen.getByLabelText('Active filters'));
const swatches = (container: HTMLElement) => [
  ...container.querySelectorAll<HTMLElement>('[data-testid^="paint_"]'),
];
const search = () => screen.getByLabelText('Search') as HTMLInputElement;
const sort = () => screen.getByLabelText('Sort by') as HTMLSelectElement;
const typeSearch = (value: string) =>
  fireEvent.change(search(), { target: { value } });

const hideVallejo = () =>
  fireEvent.click(within(group('company')).getByLabelText('Vallejo'));

// "Name (72.057), #AABBCC" or "Name, #AABBCC" -> "Name"
const paintName = (swatch: HTMLElement) => {
  const label =
    swatch.querySelector('button')?.getAttribute('aria-label') ?? '';
  return label.replace(/(?: \([\d.]+\))?, #[0-9A-F]{6}$/, '');
};

describe('paints page', () => {
  describe('on a large screen', () => {
    it('has a page heading', () => {
      render(<PaintsExplorer />);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Paints' })
      ).toBeInTheDocument();
    });

    it('shows the filters in a sidebar, with no drawer', () => {
      const { container } = render(<PaintsExplorer />);
      expect(
        within(sidebar()).getByTestId('filter-group-company')
      ).toBeInTheDocument();
      expect(container.querySelector('dialog')).toBeNull();
    });

    it('starts the longest groups collapsed', () => {
      render(<PaintsExplorer />);
      expect(
        within(sidebar()).getByRole('button', { name: /^Category/ })
      ).toHaveAttribute('aria-expanded', 'false');
      expect(
        within(sidebar()).getByRole('button', { name: /^Company/ })
      ).toHaveAttribute('aria-expanded', 'true');
    });

    it('marks a narrowed group, and summarises it while collapsed', () => {
      render(<PaintsExplorer />);
      const header = () =>
        within(sidebar()).getByRole('button', { name: /^Company/ });
      expect(header()).not.toHaveTextContent('(filtered)');

      hideVallejo();
      expect(header()).toHaveTextContent('(filtered)');
      // The summary only shows while the group is collapsed
      expect(header()).not.toHaveTextContent('2 of 3');
      fireEvent.click(header());
      expect(header()).toHaveTextContent('2 of 3');
    });
  });

  describe('Select all', () => {
    const selectAll = () =>
      within(group('company')).getByLabelText('Select all') as HTMLInputElement;

    it('is ticked when everything is on', () => {
      render(<PaintsExplorer />);
      expect(selectAll().checked).toBe(true);
      expect(selectAll().indeterminate).toBe(false);
    });

    it('shows a dash when only some are on', () => {
      render(<PaintsExplorer />);
      hideVallejo();
      expect(selectAll().checked).toBe(false);
      expect(selectAll().indeterminate).toBe(true);
    });

    it('turns everything on from the partial state', () => {
      render(<PaintsExplorer />);
      hideVallejo();
      fireEvent.click(selectAll());
      expect(selectAll().checked).toBe(true);
      expect(selectAll().indeterminate).toBe(false);
      expect(activeFilters()).toBeNull();
    });

    it('turns everything off from the full state, and everything back on', () => {
      const { container } = render(<PaintsExplorer />);
      const all = swatches(container).length;
      fireEvent.click(selectAll());
      expect(selectAll().checked).toBe(false);
      expect(selectAll().indeterminate).toBe(false);
      expect(chips().getByText('Company: none')).toBeInTheDocument();
      expect(swatches(container)).toHaveLength(0);

      fireEvent.click(selectAll());
      expect(selectAll().checked).toBe(true);
      expect(swatches(container)).toHaveLength(all);
    });
  });

  describe('option counts', () => {
    const count = (testId: string) =>
      within(screen.getByTestId(testId)).getByText(/^\(\d+\)$/).textContent;

    it('still count an option that is unticked, instead of showing 0', () => {
      render(<PaintsExplorer />);
      const before = count('filter_vallejo');
      expect(before).not.toBe('(0)');

      hideVallejo();
      expect(count('filter_vallejo')).toBe(before);
    });

    it('react to the other filters', () => {
      render(<PaintsExplorer />);
      expect(count('filter_game_color')).not.toBe('(0)');
      const citadelBase = count('filter_base');

      hideVallejo();
      // Vallejo categories bring nothing while Vallejo is hidden...
      expect(count('filter_game_color')).toBe('(0)');
      // ...and Citadel's are untouched
      expect(count('filter_base')).toBe(citadelBase);
    });
  });

  describe('search', () => {
    it('narrows the paints to those matching every word', () => {
      const { container } = render(<PaintsExplorer />);
      const all = swatches(container).length;

      typeSearch('mephiston red');
      const found = swatches(container);
      expect(found.length).toBeGreaterThan(0);
      expect(found.length).toBeLessThan(all);
      expect(found.every((el) => /mephiston red/i.test(paintName(el)))).toBe(
        true
      );
    });

    it('adds a chip, which clears the search when removed', () => {
      render(<PaintsExplorer />);
      typeSearch('mephiston');
      fireEvent.click(
        chips().getByRole('button', { name: 'Remove Search: “mephiston”' })
      );
      expect(search().value).toBe('');
      expect(activeFilters()).toBeNull();
    });

    it('announces the new count', () => {
      render(<PaintsExplorer />);
      const status = screen.getByText(/paints? match(es)?$/);
      const before = status.textContent;
      typeSearch('mephiston');
      expect(status.textContent).not.toBe(before);
    });
  });

  describe('when nothing matches', () => {
    it('says so, and clears everything from the message', () => {
      const { container } = render(<PaintsExplorer />);
      const all = swatches(container).length;
      typeSearch('zzzzqqqq');
      hideVallejo();

      expect(swatches(container)).toHaveLength(0);
      expect(screen.getByText('No paints match')).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole('button', { name: 'Clear all filters' })
      );
      expect(screen.queryByText('No paints match')).toBeNull();
      expect(search().value).toBe('');
      expect(swatches(container)).toHaveLength(all);
      expect(activeFilters()).toBeNull();
    });
  });

  describe('sort', () => {
    it('starts on the default order, with "closest" unavailable', () => {
      render(<PaintsExplorer />);
      expect(sort().value).toBe('default');
      expect(
        within(sort()).getByRole('option', { name: /closest/i })
      ).toBeDisabled();
    });

    it('can order the paints by name', () => {
      const { container } = render(<PaintsExplorer />);
      fireEvent.change(sort(), { target: { value: 'name' } });

      const names = swatches(container).slice(0, 60).map(paintName);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
      expect(window.location.search).toContain('sort=name');
    });

    it('switches to "closest" when a color is matched, and back when not', () => {
      render(<PaintsExplorer />);
      fireEvent.click(screen.getByLabelText('Match a color'));
      expect(sort().value).toBe('closest');
      expect(
        within(sort()).getByRole('option', { name: /closest/i })
      ).toBeEnabled();

      fireEvent.click(screen.getByLabelText('Match a color'));
      expect(sort().value).toBe('default');
    });

    it('keeps a sort the visitor chose when a color is matched', () => {
      render(<PaintsExplorer />);
      fireEvent.change(sort(), { target: { value: 'hue' } });
      fireEvent.click(screen.getByLabelText('Match a color'));
      expect(sort().value).toBe('hue');
    });
  });

  describe('URL', () => {
    it('restores filters, search and sort from the address', () => {
      setUrl('?x-company=Vallejo&q=gold&sort=name');
      render(<PaintsExplorer />);

      expect(search().value).toBe('gold');
      expect(sort().value).toBe('name');
      expect(chips().getByText('Company: not Vallejo')).toBeInTheDocument();
      expect(
        (within(group('company')).getByLabelText('Vallejo') as HTMLInputElement)
          .checked
      ).toBe(false);
    });

    it('restores a color match, with its closeness', () => {
      setUrl('?hex=336699&delta=22');
      render(<PaintsExplorer />);
      expect(
        chips().getByRole('button', {
          name: 'Remove color match #336699 ±22',
        })
      ).toBeInTheDocument();
      expect(sort().value).toBe('default');
    });

    it('writes changes back, and removes them when cleared', () => {
      render(<PaintsExplorer />);
      hideVallejo();
      expect(window.location.search).toContain('x-company=Vallejo');

      typeSearch('red');
      expect(window.location.search).toContain('q=red');

      fireEvent.click(chips().getByRole('button', { name: 'Clear all' }));
      expect(window.location.search).toBe('');
      expect(window.location.pathname).toBe('/paints');
    });

    it('leaves unrelated params in place', () => {
      setUrl('?utm_source=newsletter');
      render(<PaintsExplorer />);
      hideVallejo();
      expect(window.location.search).toContain('utm_source=newsletter');
      expect(window.location.search).toContain('x-company=Vallejo');
    });

    it('does not wipe the address before applying it', () => {
      setUrl('?q=gold');
      render(<PaintsExplorer />);
      expect(window.location.search).toBe('?q=gold');
    });
  });

  describe('active filter chips', () => {
    it('appear when a filter narrows the results, and remove it again', () => {
      render(<PaintsExplorer />);
      expect(activeFilters()).toBeNull();

      hideVallejo();
      const chip = chips().getByRole('button', {
        name: 'Remove filter Company: not Vallejo',
      });
      fireEvent.click(chip);

      expect(activeFilters()).toBeNull();
      expect(within(group('company')).getByLabelText('Vallejo')).toBeChecked();
    });

    it('clear everything at once, leaving the picked color alone', () => {
      render(<PaintsExplorer />);
      hideVallejo();
      fireEvent.click(screen.getByLabelText('Match a color'));
      expect(
        chips().getByRole('button', { name: /Remove color match #B22222/ })
      ).toBeInTheDocument();

      fireEvent.click(chips().getByRole('button', { name: 'Clear all' }));
      expect(activeFilters()).toBeNull();
      expect(screen.getByLabelText('Color')).toHaveValue('#b22222');
    });
  });

  describe('hex color filter', () => {
    const hexField = () =>
      screen.getByLabelText('Hex code') as HTMLInputElement;
    const type = (value: string) =>
      fireEvent.change(hexField(), { target: { value } });

    it('shows the current color, and follows the picker', () => {
      render(<PaintsExplorer />);
      expect(hexField().value).toBe('#B22222');

      fireEvent.change(screen.getByLabelText('Color'), {
        target: { value: '#336699' },
      });
      expect(hexField().value).toBe('#336699');
    });

    it('applies a full hex as soon as it is typed', () => {
      render(<PaintsExplorer />);
      type('#00ff00');
      expect(
        chips().getByRole('button', { name: 'Remove color match #00FF00 ±15' })
      ).toBeInTheDocument();
    });

    it('does not expand shorthand until typing is done', () => {
      render(<PaintsExplorer />);
      type('#0f0');
      expect(activeFilters()).toBeNull();
      expect(hexField().value).toBe('#0f0');

      fireEvent.blur(hexField());
      expect(
        chips().getByRole('button', { name: 'Remove color match #00FF00 ±15' })
      ).toBeInTheDocument();
      expect(hexField().value).toBe('#00FF00');
    });

    it('also applies on Enter', () => {
      render(<PaintsExplorer />);
      type('abc');
      fireEvent.keyDown(hexField(), { key: 'Enter' });
      expect(
        chips().getByRole('button', { name: 'Remove color match #AABBCC ±15' })
      ).toBeInTheDocument();
    });

    it('flags an invalid value once leaving the field, and clears it on typing', () => {
      render(<PaintsExplorer />);
      type('nope');
      expect(hexField()).not.toHaveAttribute('aria-invalid');

      fireEvent.blur(hexField());
      expect(hexField()).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('Enter 6 digits, like #B22222.')).toBeVisible();
      expect(hexField()).toHaveAccessibleDescription(
        'Enter 6 digits, like #B22222.'
      );

      type('#12');
      expect(hexField()).not.toHaveAttribute('aria-invalid');
      expect(screen.queryByText('Enter 6 digits, like #B22222.')).toBeNull();
    });

    it('goes back to the current color when left empty', () => {
      render(<PaintsExplorer />);
      type('');
      fireEvent.blur(hexField());
      expect(hexField().value).toBe('#B22222');
      expect(hexField()).not.toHaveAttribute('aria-invalid');
    });

    it('offers the eyedropper only where the browser has one', () => {
      render(<PaintsExplorer />);
      expect(screen.queryByText('Pick from screen')).toBeNull();
    });

    it('picks a color from the screen', async () => {
      (window as unknown as { EyeDropper: unknown }).EyeDropper = class {
        open = jest.fn().mockResolvedValue({ sRGBHex: '#112233' });
      };
      render(<PaintsExplorer />);
      fireEvent.click(screen.getByText('Pick from screen'));

      // The eyedropper answers asynchronously
      const list = await screen.findByLabelText(
        'Active filters',
        {},
        { timeout: 5000 }
      );
      expect(
        within(list).getByRole('button', {
          name: 'Remove color match #112233 ±15',
        })
      ).toBeInTheDocument();
    });

    it('ignores a cancelled eyedropper', async () => {
      (window as unknown as { EyeDropper: unknown }).EyeDropper = class {
        open = jest.fn().mockRejectedValue(new DOMException('', 'AbortError'));
      };
      render(<PaintsExplorer />);
      fireEvent.click(screen.getByText('Pick from screen'));
      await Promise.resolve();
      expect(activeFilters()).toBeNull();
    });
  });

  describe('paint details', () => {
    const firstSwatch = (container: HTMLElement) =>
      container.querySelector<HTMLElement>('[data-testid^="paint_"] button')!;

    it('opens from a swatch, naming the paint', () => {
      const { container } = render(<PaintsExplorer />);
      const swatch = firstSwatch(container);
      const name = paintName(swatch.closest<HTMLElement>('[data-testid]')!);

      expect(screen.queryByRole('dialog')).toBeNull();
      fireEvent.click(swatch);
      expect(screen.getByRole('dialog', { name })).toBeInTheDocument();
    });

    it('offers to close, and to find similar paints', () => {
      const { container } = render(<PaintsExplorer />);
      fireEvent.click(firstSwatch(container));
      const dialog = screen.getByRole('dialog');
      expect(
        within(dialog)
          .queryAllByRole('button')
          .map((b) => b.textContent)
      ).toEqual(expect.arrayContaining(['Close', 'Find similar']));
    });

    it('finds similar paints from its hex', () => {
      const { container } = render(<PaintsExplorer />);
      const swatch = firstSwatch(container);
      const hex = swatch.getAttribute('aria-label')!.split(', ').pop()!;
      fireEvent.click(swatch);

      fireEvent.click(screen.getByRole('button', { name: 'Find similar' }));

      expect(screen.queryByRole('dialog')).toBeNull();
      expect(
        chips().getByRole('button', {
          name: `Remove color match ${hex} ±15`,
        })
      ).toBeInTheDocument();
      expect(sort().value).toBe('closest');
      // The paint itself is zero distance away, so it leads the results
      expect(swatches(container)[0]).toBe(swatch.closest('[data-testid]'));
    });
  });

  describe('on a small screen', () => {
    beforeEach(() => setViewport(false));

    const bar = () => within(screen.getByTestId('mobile-filter-bar'));

    it('puts the filters in a drawer instead of the sidebar', () => {
      const { container } = render(<PaintsExplorer />);
      expect(
        within(sidebar()).queryByTestId('filter-group-company')
      ).toBeNull();
      expect(container.querySelector('dialog')).not.toBeNull();
    });

    it('opens the drawer from the Filters button', () => {
      render(<PaintsExplorer />);
      expect(screen.queryByRole('dialog')).toBeNull();

      fireEvent.click(bar().getByRole('button', { name: 'Filters' }));
      const drawer = screen.getByRole('dialog', { name: 'Filters' });
      expect(
        within(drawer).getByTestId('filter-group-company')
      ).toBeInTheDocument();
    });

    it('counts active filters on the Filters button', () => {
      render(<PaintsExplorer />);
      fireEvent.click(bar().getByRole('button', { name: 'Filters' }));
      hideVallejo();
      expect(
        bar().getByRole('button', { name: 'Filters 1' })
      ).toBeInTheDocument();
    });

    it('closes the drawer with the results button', () => {
      render(<PaintsExplorer />);
      fireEvent.click(bar().getByRole('button', { name: 'Filters' }));
      fireEvent.click(
        within(screen.getByRole('dialog')).getByRole('button', {
          name: /^Show \d+ paints?$/,
        })
      );
      expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('still shows search and sort above the paints', () => {
      render(<PaintsExplorer />);
      expect(search()).toBeInTheDocument();
      expect(sort()).toBeInTheDocument();
    });
  });
});

describe('editing my paints', () => {
  beforeEach(() => window.localStorage.clear());

  const stored = () =>
    JSON.parse(window.localStorage.getItem('paint-collection') ?? '{}');
  const startEditing = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Edit my paints' }));
  const editor = () =>
    within(screen.getByRole('region', { name: 'Edit my paints' }));
  const firstSwatch = (container: HTMLElement) =>
    swatches(container)[0].querySelector('button') as HTMLButtonElement;

  it('turns the swatches into owned toggles, and back', () => {
    const { container } = render(<PaintsExplorer />);
    typeSearch('mephiston');
    expect(firstSwatch(container)).not.toHaveAttribute('aria-pressed');

    startEditing();
    expect(firstSwatch(container)).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(firstSwatch(container));
    expect(firstSwatch(container)).toHaveAttribute('aria-pressed', 'true');
    expect(Object.values(stored())).toEqual(['owned']);
    expect(container.querySelector('dialog.paint-dialog')).toBeNull();

    fireEvent.click(firstSwatch(container));
    expect(stored()).toEqual({});

    fireEvent.click(screen.getByRole('button', { name: 'Done editing' }));
    expect(firstSwatch(container)).not.toHaveAttribute('aria-pressed');
  });

  it('marks everything shown, and only that, with an undo', () => {
    const { container } = render(<PaintsExplorer />);
    typeSearch('mephiston');
    const shown = swatches(container).length;
    startEditing();

    const mark = editor().getByRole('button', { name: /^Mark/ });
    expect(mark).toHaveTextContent(`Mark ${shown} shown as owned`);
    fireEvent.click(mark);
    expect(Object.keys(stored())).toHaveLength(shown);
    expect(editor().getByRole('status')).toHaveTextContent(
      new RegExp(`Marked ${shown} paints? as owned`)
    );
    expect(mark).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(editor().getByRole('button', { name: 'Undo' }));
    expect(stored()).toEqual({});
    expect(editor().getByRole('status')).toHaveTextContent('Change undone.');
    expect(editor().queryByRole('button', { name: 'Undo' })).toBeNull();
    expect(mark).toHaveFocus();
  });

  it('unmarks what is shown but keeps the wishlist, and undo restores it', () => {
    const { container } = render(<PaintsExplorer />);
    typeSearch('mephiston');
    startEditing();
    fireEvent.click(editor().getByRole('button', { name: /^Mark/ }));
    const owned = stored();
    const before = { ...owned, something_else: 'wishlist' };
    act(() => {
      window.localStorage.setItem('paint-collection', JSON.stringify(before));
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'paint-collection' })
      );
    });

    fireEvent.click(editor().getByRole('button', { name: /^Unmark/ }));
    expect(stored()).toEqual({ something_else: 'wishlist' });
    fireEvent.click(editor().getByRole('button', { name: 'Undo' }));
    expect(stored()).toEqual(before);
    expect(swatches(container).length).toBeGreaterThan(0);
  });

  it('keeps focus in the grid when marking a paint filters it out', () => {
    const { container } = render(<PaintsExplorer />);
    typeSearch('gold');
    fireEvent.click(within(group('my_paints')).getByLabelText('Not owned'));
    startEditing();
    const count = swatches(container).length;
    const second = swatches(container)[1].dataset.testid;

    firstSwatch(container).focus();
    fireEvent.click(firstSwatch(container));
    expect(swatches(container)).toHaveLength(count - 1);
    expect(swatches(container)[0].dataset.testid).toBe(second);
    expect(firstSwatch(container)).toHaveFocus();
  });
});

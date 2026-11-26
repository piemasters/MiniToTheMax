import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { FilterDrawer } from './FilterDrawer';

// jsdom has no modal dialog support, so stand in for the two methods we use
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

// jsdom also lacks element scrolling and IntersectionObserver. The drawer treats
// both as optional, so tests choose whether they exist.
type Observer = {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observe: jest.Mock;
  disconnect: jest.Mock;
};
let observers: Observer[] = [];
const scrollTo = jest.fn();

const supportScrolling = () => {
  (HTMLElement.prototype as unknown as { scrollTo: unknown }).scrollTo =
    scrollTo;
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get: () => 400,
  });
  window.IntersectionObserver = class {
    observe = jest.fn();
    disconnect = jest.fn();
    constructor(
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      observers.push(this as unknown as Observer);
      Object.assign(this, { callback, options });
    }
  } as unknown as typeof IntersectionObserver;
};

const removeScrolling = () => {
  delete (HTMLElement.prototype as unknown as { scrollTo?: unknown }).scrollTo;
  delete (HTMLElement.prototype as unknown as { scrollWidth?: unknown })
    .scrollWidth;
  delete (window as unknown as { IntersectionObserver?: unknown })
    .IntersectionObserver;
};

const reportSheetVisibility = (intersectionRatio: number) =>
  act(() => {
    const [observer] = observers;
    observer.callback(
      [{ intersectionRatio } as IntersectionObserverEntry],
      observer as unknown as IntersectionObserver
    );
  });

const drawer = (open: boolean, onOpenChange = jest.fn()) => (
  <FilterDrawer open={open} onOpenChange={onOpenChange} resultCount={12}>
    <p>Panel contents</p>
  </FilterDrawer>
);

const setup = (open = false) => {
  const onOpenChange = jest.fn();
  const view = render(drawer(open, onOpenChange));
  const dialog = view.container.querySelector('dialog') as HTMLDialogElement;
  return { ...view, dialog, onOpenChange };
};

beforeEach(() => {
  jest.clearAllMocks();
  observers = [];
  removeScrolling();
});
afterAll(removeScrolling);

describe('FilterDrawer', () => {
  it('stays closed until asked to open', () => {
    const { dialog } = setup();
    expect(dialog.open).toBe(false);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });

  it('opens as a modal when open becomes true', () => {
    const { rerender, onOpenChange } = setup();
    rerender(drawer(true, onOpenChange));
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });

  it('is named by its heading', () => {
    setup(true);
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
  });

  it('shows the result count on the button that closes it', () => {
    render(
      <FilterDrawer open onOpenChange={jest.fn()} resultCount={1}>
        <p>Panel contents</p>
      </FilterDrawer>
    );
    expect(
      screen.getByRole('button', { name: 'Show 1 paint' })
    ).toBeInTheDocument();
  });

  it.each(['Close', 'Show 12 paints'])('closes from the %s button', (name) => {
    const { onOpenChange } = setup(true);
    fireEvent.click(screen.getByRole('button', { name }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('turns Esc into a controlled close', () => {
    const { dialog, onOpenChange } = setup(true);
    const cancel = new Event('cancel', { cancelable: true });
    fireEvent(dialog, cancel);
    expect(cancel.defaultPrevented).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  describe('light dismiss', () => {
    it('closes when the dimmed area is pressed and released', () => {
      const { dialog, onOpenChange } = setup(true);
      fireEvent.pointerDown(dialog);
      fireEvent.click(dialog);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('closes when the scroller beside the sheet is tapped', () => {
      const { container, onOpenChange } = setup(true);
      const scroller = container.querySelector(
        '.filter-drawer-scroller'
      ) as HTMLElement;
      fireEvent.pointerDown(scroller);
      fireEvent.click(scroller);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('ignores clicks inside the sheet', () => {
      const { onOpenChange } = setup(true);
      const inside = screen.getByText('Panel contents');
      fireEvent.pointerDown(inside);
      fireEvent.click(inside);
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('ignores a selection drag that starts inside and ends outside', () => {
      const { dialog, onOpenChange } = setup(true);
      fireEvent.pointerDown(screen.getByText('Panel contents'));
      fireEvent.click(dialog);
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe('without scroll support', () => {
    it('closes straight away when asked to', () => {
      const { rerender, onOpenChange } = setup(true);
      rerender(drawer(false, onOpenChange));
      expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('with scroll support', () => {
    beforeEach(supportScrolling);

    it('slides in by scrolling from the closed stop to the open one', async () => {
      const { rerender, onOpenChange } = setup();
      rerender(drawer(true, onOpenChange));

      // No scroll-initial-target in jsdom, so it jumps to closed first...
      expect(scrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'instant' });
      // ...then, a couple of frames later, scrolls the sheet into view
      await waitFor(() =>
        expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'auto' })
      );
    });

    it('slides out when asked to close, and only closes once it has left', () => {
      const { rerender, dialog, onOpenChange } = setup(true);
      scrollTo.mockClear();

      rerender(drawer(false, onOpenChange));
      expect(scrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'auto' });
      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
      expect(dialog.open).toBe(true);

      reportSheetVisibility(0);
      expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
      expect(dialog.open).toBe(false);
    });

    it('closes when the sheet is swiped out of view', () => {
      const { dialog, onOpenChange } = setup(true);

      reportSheetVisibility(0);
      expect(dialog.open).toBe(false);
      // The close event keeps the parent's state in step
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('stays open while any of the sheet is still showing', () => {
      const { dialog } = setup(true);
      reportSheetVisibility(0.5);
      reportSheetVisibility(1);
      expect(dialog.open).toBe(true);
    });

    it('ignores the observer reporting the sheet away while already closed', () => {
      setup();
      reportSheetVisibility(0);
      expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
    });

    it('watches the sheet within the dialog, and stops on unmount', () => {
      const { unmount, dialog } = setup();
      const [observer] = observers;
      expect(observer.observe).toHaveBeenCalledTimes(1);
      expect(observer.options?.root).toBe(dialog);
      unmount();
      expect(observer.disconnect).toHaveBeenCalled();
    });

    it('slides out on Esc rather than closing instantly', () => {
      const { dialog, rerender, onOpenChange } = setup(true);
      scrollTo.mockClear();

      const cancel = new Event('cancel', { cancelable: true });
      fireEvent(dialog, cancel);
      expect(cancel.defaultPrevented).toBe(true);
      // The parent reacts to onOpenChange(false) by re-rendering closed
      rerender(drawer(false, onOpenChange));
      expect(scrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'auto' });
      expect(dialog.open).toBe(true);
    });
  });
});

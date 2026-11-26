import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { gameColorPolishedGold } from '../../data/paints/vallejo/game';
import type { PaintDetails } from '../../types';
import { getPaint } from '../../util/paints/getPaint';
import { paintId } from '../../util/paints/paintId';
import { PaintDetailsDialog } from './PaintDetailsDialog';

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

const writeText = jest.fn();
const setClipboard = (impl: () => Promise<void>) => {
  writeText.mockImplementation(impl);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
};
afterEach(() => {
  delete (navigator as unknown as { clipboard?: unknown }).clipboard;
});
beforeEach(() => jest.clearAllMocks());

// Fake timers drive React's updates here, so flush them inside act
const advance = (ms: number) =>
  act(async () => {
    await jest.advanceTimersByTimeAsync(ms);
  });

const paint = gameColorPolishedGold;
const HEX = paint.hex.toUpperCase();

const setup = (open = true) => {
  const onOpenChange = jest.fn();
  const onFindSimilar = jest.fn();
  const onStatusChange = jest.fn();
  const view = render(
    <PaintDetailsDialog
      paint={paint}
      open={open}
      onOpenChange={onOpenChange}
      onFindSimilar={onFindSimilar}
      onStatusChange={onStatusChange}
    />
  );
  const dialog = view.container.querySelector('dialog') as HTMLDialogElement;
  return { ...view, dialog, onOpenChange, onFindSimilar, onStatusChange };
};

describe('PaintDetailsDialog', () => {
  it('opens as a modal, named by the paint', () => {
    setup();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('dialog', { name: paint.name })
    ).toBeInTheDocument();
  });

  it('stays closed while open is false', () => {
    setup(false);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });

  it('lists the paint details, leaving out anything it does not have', () => {
    setup();
    const text = screen.getByText('Company').closest('dl')?.textContent ?? '';
    expect(text).toContain('Vallejo');
    expect(text).toContain(paint.category);
    expect(text).toContain(paint.number as string);
    expect(text).toContain(HEX);
    expect(screen.getByText('Availability')).toBeInTheDocument();
  });

  it('does not show a Number row for a paint without one', () => {
    render(
      <PaintDetailsDialog
        paint={{ ...paint, number: undefined }}
        open
        onOpenChange={jest.fn()}
        onFindSimilar={jest.fn()}
        onStatusChange={jest.fn()}
      />
    );
    expect(screen.queryByText('Number')).toBeNull();
  });

  describe('copying the hex', () => {
    it('names the button by what it copies', () => {
      setup();
      expect(
        screen.getByRole('button', { name: `Copy ${HEX}` })
      ).toBeInTheDocument();
    });

    it('writes the hex to the clipboard and says so', async () => {
      setClipboard(() => Promise.resolve());
      setup();
      fireEvent.click(screen.getByRole('button', { name: `Copy ${HEX}` }));

      expect(await screen.findByText('Copied')).toBeInTheDocument();
      expect(writeText).toHaveBeenCalledWith(HEX);
    });

    it('announces from a live region outside the button', async () => {
      setClipboard(() => Promise.resolve());
      setup();
      const button = screen.getByRole('button', { name: `Copy ${HEX}` });
      fireEvent.click(button);

      // The message lands a frame after the click
      const status = await screen.findByText('Copied');
      expect(status).toHaveAttribute('role', 'status');
      expect(button).not.toContainElement(status);
    });

    it('says when copying failed', async () => {
      setClipboard(() => Promise.reject(new Error('denied')));
      setup();
      fireEvent.click(screen.getByRole('button', { name: `Copy ${HEX}` }));
      expect(await screen.findByText('Copy failed')).toBeInTheDocument();
    });

    it('says so when there is no clipboard at all', async () => {
      setup();
      fireEvent.click(screen.getByRole('button', { name: `Copy ${HEX}` }));
      expect(await screen.findByText('Copy failed')).toBeInTheDocument();
    });

    it('never disables the button, so a failure can be retried', async () => {
      setClipboard(() => Promise.reject(new Error('denied')));
      setup();
      const button = screen.getByRole('button', { name: `Copy ${HEX}` });
      fireEvent.click(button);
      await screen.findByText('Copy failed');
      expect(button).toBeEnabled();
    });

    it('clears the message after a moment', async () => {
      jest.useFakeTimers();
      try {
        setClipboard(() => Promise.resolve());
        setup();
        fireEvent.click(screen.getByRole('button', { name: `Copy ${HEX}` }));
        await advance(50);
        expect(screen.getByRole('status')).toHaveTextContent('Copied');

        await advance(2500);
        expect(screen.getByRole('status')).toBeEmptyDOMElement();
      } finally {
        jest.useRealTimers();
      }
    });

    it('makes a repeated message differ so VoiceOver announces it again', async () => {
      jest.useFakeTimers();
      try {
        setClipboard(() => Promise.resolve());
        setup();
        const click = () =>
          fireEvent.click(screen.getByRole('button', { name: `Copy ${HEX}` }));

        click();
        await advance(50);
        expect(screen.getByRole('status').textContent).toBe('Copied');

        click();
        await advance(50);
        expect(screen.getByRole('status').textContent).toBe('Copied ');
      } finally {
        jest.useRealTimers();
      }
    });
  });

  it('finds similar paints from this hex, then closes', () => {
    const { onFindSimilar, onOpenChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Find similar' }));
    expect(onFindSimilar).toHaveBeenCalledWith(paint.hex);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes from the Close button', () => {
    const { onOpenChange } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('turns Esc into a controlled close', () => {
    const { dialog, onOpenChange } = setup();
    const cancel = new Event('cancel', { cancelable: true });
    fireEvent(dialog, cancel);
    expect(cancel.defaultPrevented).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on a press and release of the backdrop only', () => {
    const { dialog, onOpenChange } = setup();

    fireEvent.pointerDown(screen.getByText('Find similar'));
    fireEvent.click(dialog);
    expect(onOpenChange).not.toHaveBeenCalled();

    fireEvent.pointerDown(dialog);
    fireEvent.click(dialog);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes the native dialog when open becomes false', () => {
    const { rerender, onOpenChange, onFindSimilar, onStatusChange } = setup();
    rerender(
      <PaintDetailsDialog
        paint={paint}
        open={false}
        onOpenChange={onOpenChange}
        onFindSimilar={onFindSimilar}
        onStatusChange={onStatusChange}
      />
    );
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
  });

  describe('my collection', () => {
    const renderWith = (status?: 'owned' | 'wishlist') => {
      const onStatusChange = jest.fn();
      render(
        <PaintDetailsDialog
          paint={paint}
          open
          onOpenChange={jest.fn()}
          onFindSimilar={jest.fn()}
          status={status}
          onStatusChange={onStatusChange}
        />
      );
      return onStatusChange;
    };

    it('marks a paint as owned or on the wishlist', () => {
      const onStatusChange = renderWith();
      fireEvent.click(screen.getByRole('button', { name: 'Owned' }));
      expect(onStatusChange).toHaveBeenLastCalledWith('owned');
      fireEvent.click(screen.getByRole('button', { name: 'Wishlist' }));
      expect(onStatusChange).toHaveBeenLastCalledWith('wishlist');
    });

    it('shows the current status, and pressing it again clears it', () => {
      const onStatusChange = renderWith('owned');
      const owned = screen.getByRole('button', { name: 'Owned' });
      expect(owned).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('button', { name: 'Wishlist' })).toHaveAttribute(
        'aria-pressed',
        'false'
      );
      fireEvent.click(owned);
      expect(onStatusChange).toHaveBeenCalledWith(null);
    });
  });

  describe('posts', () => {
    it('lists the posts that show the paint, as links', () => {
      render(
        <PaintDetailsDialog
          paint={paint}
          open
          onOpenChange={jest.fn()}
          onFindSimilar={jest.fn()}
          onStatusChange={jest.fn()}
          posts={[{ title: 'Showcase: Cube', slug: '/blog/cube/' }]}
        />
      );
      expect(screen.getByRole('heading', { name: /Seen in/ })).toBeVisible();
      expect(
        screen.getByRole('link', { name: 'Showcase: Cube' })
      ).toHaveAttribute('href', '/blog/cube/');
    });

    it('has no section when no post shows it', () => {
      setup();
      expect(screen.queryByText('Seen in')).toBeNull();
    });
  });
});

describe('PaintDetailsDialog long post lists', () => {
  const posts = Array.from({ length: 10 }, (_, i) => ({
    title: `Post ${i + 1}`,
    slug: `/post-${i + 1}/`,
  }));
  const renderPosts = () =>
    render(
      <PaintDetailsDialog
        paint={paint}
        open
        onOpenChange={jest.fn()}
        onFindSimilar={jest.fn()}
        onStatusChange={jest.fn()}
        posts={posts}
      />
    );

  it('starts with a few and says how many there are', () => {
    renderPosts();
    expect(screen.getByRole('heading', { name: /10 posts/ })).toBeVisible();
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('shows the rest on request, and hides them again', () => {
    renderPosts();
    const toggle = screen.getByRole('button', { name: 'Show 6 more' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(screen.getAllByRole('link')).toHaveLength(10);
    fireEvent.click(screen.getByRole('button', { name: 'Show fewer' }));
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('needs no toggle for a short list', () => {
    render(
      <PaintDetailsDialog
        paint={paint}
        open
        onOpenChange={jest.fn()}
        onFindSimilar={jest.fn()}
        onStatusChange={jest.fn()}
        posts={posts.slice(0, 3)}
      />
    );
    expect(screen.queryByRole('button', { name: /Show/ })).toBeNull();
  });
});

describe('PaintDetailsDialog shade and highlight', () => {
  const red = getPaint('Mephiston Red').paint as PaintDetails;
  const wash = getPaint('Agrax Earthshade').paint as PaintDetails;

  const renderFor = (
    target: PaintDetails,
    onSelectPaint: (paint: PaintDetails) => void = jest.fn()
  ) =>
    render(
      <PaintDetailsDialog
        paint={target}
        open
        onOpenChange={jest.fn()}
        onFindSimilar={jest.fn()}
        onStatusChange={jest.fn()}
        onSelectPaint={onSelectPaint}
      />
    );

  it('lays out shades, the base, then highlights', () => {
    renderFor(red);
    const labels = screen
      .getAllByRole('listitem')
      .map((item) => item.textContent ?? '');
    const order = ['Shade 1', 'Base', 'Highlight 1', 'Highlight 2'].map(
      (label) => labels.findIndex((text) => text.includes(label))
    );
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(screen.queryByText('Shade 2')).toBeNull();
  });

  it('switches to a suggested paint when it is chosen', () => {
    const onSelectPaint = jest.fn();
    renderFor(red, onSelectPaint);
    fireEvent.click(screen.getByRole('button', { name: /Khorne Red/ }));
    expect(onSelectPaint).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Khorne Red' })
    );
  });

  it('can include other brands', () => {
    renderFor(red);
    const toggle = screen.getByRole('checkbox', {
      name: 'Include other brands',
    });
    expect(toggle).not.toBeChecked();
    expect(screen.queryByText(/Vallejo Model Color/)).toBeNull();

    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
    expect(screen.getAllByText(/^Vallejo /).length).toBeGreaterThan(0);
  });

  it('can limit suggestions to paints you own, off to start with', () => {
    const khorne = getPaint('Khorne Red').paint as PaintDetails;
    window.localStorage.setItem(
      'paint-collection',
      JSON.stringify({ [paintId(khorne)]: 'owned' })
    );
    renderFor(red);
    const toggle = screen.getByRole('checkbox', { name: 'Only paints I own' });
    expect(toggle).not.toBeChecked();
    const blend = () =>
      within(screen.getByRole('region', { name: 'Shade & highlight' }));
    const before = blend().getAllByRole('listitem').length;
    expect(before).toBeGreaterThan(2);

    fireEvent.click(toggle);
    // The base, and the one owned paint that suits it
    expect(blend().getAllByRole('listitem')).toHaveLength(2);
    expect(blend().getByText('Khorne Red')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(blend().getAllByRole('listitem')).toHaveLength(before);
    window.localStorage.clear();
  });

  it('says so when none of your paints suit', () => {
    window.localStorage.clear();
    renderFor(red);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Only paints I own' })
    );
    expect(
      screen.getAllByText('No close matches among your paints in this brand.')
    ).toHaveLength(2);
  });

  it('is left out for paints you do not blend with', () => {
    renderFor(wash);
    expect(screen.queryByText('Shade & highlight')).toBeNull();
  });
});

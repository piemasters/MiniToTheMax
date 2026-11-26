// Exit animations for top-layer elements need `overlay` and discrete `display`
// transitions. Where either is missing (Firefox, Safari) we set `data-closing`,
// which CSS uses to start the exit transition while the element is still open.

let supportsDisplayTransition: boolean | undefined;

// Firefox parses `transition-behavior: allow-discrete` without applying it to
// `display`, so CSS.supports() alone is not enough: probe the real behaviour.
const canTransitionDisplay = () => {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete')) {
    return false;
  }

  const probe = document.createElement('div');
  probe.style.cssText =
    'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
};

// Evaluated lazily: the probe needs document.body
const supportsTopLayerExit = () =>
  Boolean(window.CSS?.supports?.('overlay', 'auto')) && canTransitionDisplay();

/** Closes a dialog, letting its exit transition play first. */
export const closeTopLayer = async (dialog: HTMLDialogElement) => {
  if (!supportsTopLayerExit()) {
    dialog.setAttribute('data-closing', '');
    const animations = dialog.getAnimations?.({ subtree: true }) ?? [];
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((animation) => animation.finished)),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
    }
    // Re-opened or already closed while we were waiting
    if (!dialog.hasAttribute('data-closing')) return;
    dialog.removeAttribute('data-closing');
  }

  if (dialog.open) dialog.close();
};

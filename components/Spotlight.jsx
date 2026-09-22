import { useEffect } from 'react';

/**
 * Feeds the cursor position to whichever .card-lift is under the pointer, as
 * --mx / --my, for the radial spotlight in globals.css.
 *
 * One delegated, passive listener for the whole page, coalesced to one write
 * per frame — rather than a handler on each of ~20 cards. It only ever writes
 * to the single card being hovered, and it is not attached at all on touch.
 */
const Spotlight = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let frame = 0;
    let last = null;

    const apply = () => {
      frame = 0;
      const card = last?.target?.closest?.('.card-lift');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${last.clientX - r.left}px`);
      card.style.setProperty('--my', `${last.clientY - r.top}px`);
    };

    const onMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
};

export default Spotlight;

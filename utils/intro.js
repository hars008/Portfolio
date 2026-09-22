import { useEffect, useState } from 'react';

/**
 * Replays the boot intro on demand (the ↻ in the hero terminal, and the
 * footer's `$ reboot`).
 *
 * The intro is pure CSS keyed off `html.intro` (see Intro.jsx), so replaying
 * the overlay is: drop the class, force a reflow, add it back — the overlay
 * goes display:none -> block and every animation inside it starts over.
 *
 * The hero's own entrance has already finished by then, though, and toggling
 * a class does not restart it. So a `hb:reboot` event tells the home page to
 * remount the hero (useRebootKey), which replays the name reveal and the
 * terminal type-on behind the parting halves, exactly like a first visit.
 */
const EVENT = 'hb:reboot';

export const reboot = () => {
  const html = document.documentElement;
  window.scrollTo({ top: 0, behavior: 'instant' });
  html.classList.remove('intro');
  // Reading layout here is the point: it forces the browser to apply the
  // removal before the class comes back, or the two changes cancel out.
   
  html.offsetWidth;
  html.classList.add('intro');
  window.dispatchEvent(new Event(EVENT));
};

/** A key that changes on every reboot. Put it on whatever should replay. */
export const useRebootKey = () => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const bump = () => setKey((k) => k + 1);
    window.addEventListener(EVENT, bump);
    return () => window.removeEventListener(EVENT, bump);
  }, []);
  return key;
};

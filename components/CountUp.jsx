import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { useMotionSafe } from '../utils/motion';

/**
 * Counts a stat like "100k+" up from zero the first time it scrolls into view.
 *
 * The server renders the real value, so with no JS (or reduced motion) the
 * number is simply correct. After mount it is reset to zero off-screen and
 * counted up on arrival. Digits are written straight to textContent from
 * framer's animation loop — no React state, so no re-render per frame.
 */
const PARSE = /^(\d+(?:\.\d+)?)(.*)$/;

const CountUp = ({ value, className = '', duration = 1.6 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const safe = useMotionSafe();
  const match = PARSE.exec(value);
  const armed = useRef(false);

  // Reset to zero on mount, before the element is on screen.
  useEffect(() => {
    if (!safe || !match || !ref.current || armed.current) return;
    armed.current = true;
    ref.current.textContent = `0${match[2]}`;
  }, [safe, match]);

  useEffect(() => {
    if (!inView || !armed.current || !match || !ref.current) return undefined;
    const el = ref.current;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
    // `match` is derived from `value`; depending on it would restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
};

export default CountUp;

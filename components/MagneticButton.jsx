import React, { useCallback, useRef } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { SPRING, useMotionSafe, useMounted } from '../utils/motion';

/**
 * Pulls its child a little toward the cursor. Used on exactly two elements —
 * the hero's primary CTA and the navbar résumé button. It is a garnish, and it
 * stops being one the moment it is everywhere.
 *
 * Position is held in motion values, never React state, so dragging the cursor
 * across the button does not re-render anything. On coarse pointers and under
 * reduced motion the handlers are not attached at all, rather than attached
 * and ignored.
 */
const MagneticButton = ({ children, strength = 0.25, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const safe = useMotionSafe();
  const mounted = useMounted();

  // matchMedia does not exist during SSR, so this is only consulted once
  // mounted — otherwise the server renders a plain span and the client renders
  // a motion span, and React reports a hydration mismatch.
  const fine = mounted
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(pointer: fine)').matches;
  const enabled = mounted && safe && fine;

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!enabled) return <span className={className}>{children}</span>;

  return (
    <m.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </m.span>
  );
};

export default MagneticButton;

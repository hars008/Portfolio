import React, { useCallback, useRef } from 'react';
import { m, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { usePointerFx } from '../utils/motion';

/**
 * Tilts toward the cursor in 3D with a soft glare that tracks it. Used on the
 * hero terminal only — like MagneticButton, it is a garnish that stops being
 * one the moment it is everywhere.
 *
 * The element tree is identical whether or not the effect is enabled; only the
 * handlers are withheld. Swapping a plain div for a motion one after mount
 * would remount the children and restart the terminal's type-on animation.
 */
const TILT_SPRING = { stiffness: 170, damping: 20, mass: 0.5 };

const TiltCard = ({ children, max = 7, className = '' }) => {
  const ref = useRef(null);
  const enabled = usePointerFx();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const rotateX = useSpring(rx, TILT_SPRING);
  const rotateY = useSpring(ry, TILT_SPRING);
  const glare = useSpring(glareOpacity, { stiffness: 120, damping: 24 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(255,255,255,0.075), transparent 55%)`;

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry.set((px - 0.5) * max * 2);
      rx.set((0.5 - py) * max * 2);
      gx.set(px * 100);
      gy.set(py * 100);
      glareOpacity.set(1);
    },
    [max, rx, ry, gx, gy, glareOpacity],
  );

  const reset = useCallback(() => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  }, [rx, ry, glareOpacity]);

  return (
    <div className={className} style={{ perspective: 1100 }}>
      <m.div
        ref={ref}
        onPointerMove={enabled ? onMove : undefined}
        onPointerLeave={enabled ? reset : undefined}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {children}
        <m.div
          aria-hidden="true"
          style={{ background, opacity: glare }}
          className="pointer-events-none absolute inset-0 z-10 rounded-xl"
        />
      </m.div>
    </div>
  );
};

export default TiltCard;

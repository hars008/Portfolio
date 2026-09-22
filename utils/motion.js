import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The house motion vocabulary. Rules it enforces by omission:
 *   · transform + opacity ONLY. No variant here touches width, height, top,
 *     left, margin, box-shadow, filter or background-position.
 *   · no blur-in. `filter: blur()` repaints the element every frame; on a
 *     heading it is the most expensive "subtle" effect there is.
 *   · every whileInView is `once: true`. Nothing re-animates on scroll-back.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in _app.js, which downgrades transforms to opacity. The hooks at the bottom
 * are for the cases MotionConfig cannot help with: infinite loops, scroll-
 * linked values and pointer-driven effects — those must be switched OFF, not
 * downgraded.
 */

export const EASE_OUT_FLEX = [0.05, 0.6, 0.4, 0.9];
export const SPRING = { type: 'spring', stiffness: 280, damping: 28, mass: 0.6 };

export const viewport = { once: true, amount: 0.2 };

/** For tall blocks (bento, project cards) that would otherwise never hit 20%. */
export const viewportTall = { once: true, amount: 0.1, margin: '0px 0px -12% 0px' };

export const fadeUp = (delay = 0, distance = 12) => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE_OUT_FLEX },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, delay } },
});

/** opacity + scale. For cards and the terminal, never for body copy. */
export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay, ease: EASE_OUT_FLEX },
  },
});

/**
 * Shutter reveal. The PARENT must be `overflow-hidden`; the child slides up
 * from below its own box. Pure translate, so it composites — unlike an
 * animated clip-path, which repaints.
 */
export const revealUp = (delay = 0) => ({
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.62, delay, ease: EASE_OUT_FLEX } },
});

/** Hairlines that draw themselves in. Pair with `origin-left`. */
export const drawX = (delay = 0, duration = 0.8) => ({
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration, delay, ease: EASE_OUT_FLEX } },
});

/** Vertical rails (Sidebar tails). Pair with `origin-bottom`. */
export const drawY = (delay = 0, duration = 0.7) => ({
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration, delay, ease: EASE_OUT_FLEX } },
});

export const stagger = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const chipIn = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: EASE_OUT_FLEX },
  },
};

/** Drawer / overlay pair for AnimatePresence. No height — opacity + y only. */
export const drawerPanel = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT_FLEX } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16, ease: 'easeIn' } },
};

export const scrim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};

/* ————— hooks ————— */

/**
 * True unless the OS asks for reduced motion. Gate infinite, scroll-linked and
 * pointer-driven effects on this: MotionConfig downgrades transforms to
 * opacity, but those three have to be switched off entirely.
 */
export const useMotionSafe = () => !useReducedMotion();

/**
 * False on the server and on the first client render, true afterwards.
 *
 * Anything that branches on a client-only value — matchMedia, the reduced
 * motion preference — must gate on this or the server and client render
 * different markup and React throws a hydration error. Enhance after mount
 * rather than guessing during render.
 */
const noopSubscribe = () => () => {};

export const useMounted = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

/**
 * True only after mount, on a mouse or trackpad, with motion allowed. The gate
 * for every pointer-driven effect (magnetic pull, tilt): on touch there is no
 * hover to respond to, and a tilt that fires on tap reads as a glitch.
 */
export const usePointerFx = () => {
  const mounted = useMounted();
  const safe = useMotionSafe();
  const fine = mounted
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(pointer: fine)').matches;
  return mounted && safe && fine;
};

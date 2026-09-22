import React from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { useMotionSafe, useMounted } from '../utils/motion';

/**
 * The only useScroll on the site. framer writes scaleX straight to the element
 * from its own rAF loop, so this never triggers a React render, and scaleX is
 * a compositor property — the whole thing costs one matrix update per frame.
 *
 * origin-left is load-bearing: without it the bar grows from the centre.
 * No backdrop-filter here — the navbar owns the only one on the page.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const safe = useMotionSafe();
  const mounted = useMounted();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  // Gated on mount as well as preference: useReducedMotion reports false
  // during SSR, so branching on it alone renders the bar on the server and
  // nothing on the client, which is a hydration mismatch.
  if (!mounted || !safe) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: smooth }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-grad-accent"
    />
  );
};

export default ScrollProgress;

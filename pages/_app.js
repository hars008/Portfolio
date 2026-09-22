import React from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import Backdrop from '../components/Backdrop';
import ScrollProgress from '../components/ScrollProgress';
import Spotlight from '../components/Spotlight';
import '../styles/globals.css';

/**
 * LazyMotion + `strict` cuts framer's runtime roughly in half and makes
 * `motion.div` throw on sight — which is deliberate: every call site has to use
 * `m.div`, and the build tells you when one slips through. `domAnimation` over
 * `domMax` because nothing here needs layout projection or drag.
 *
 * MotionConfig reducedMotion="user" is the actual fix for a live bug: the
 * prefers-reduced-motion block in globals.css only flattens CSS transition and
 * animation durations, and framer drives every section from its own rAF loop
 * writing inline transforms, so it never saw that media query. This converts
 * transform animations site-wide into plain opacity when the OS asks — the
 * final variant state still applies, so nothing is ever stranded invisible.
 */
const MyApp = ({ Component, pageProps }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <ScrollProgress />
      <Spotlight />
      <Component {...pageProps} />
    </MotionConfig>
  </LazyMotion>
);

export default MyApp;

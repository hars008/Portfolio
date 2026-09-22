import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import profile from '../content/profile';
import TerminalCard from '../components/TerminalCard';
import MagneticButton from '../components/MagneticButton';
import NetworkCanvas from '../components/NetworkCanvas';
import TiltCard from '../components/TiltCard';
import { useMotionSafe } from '../utils/motion';

/**
 * The entrance here is the CSS `animate-rise` utility with an inline
 * animationDelay, deliberately NOT framer. The <h1> is this page's LCP
 * element, and it used to start at opacity 0 inside a framer stagger — which
 * gated the largest paint on React hydrating. CSS animation starts at first
 * paint instead.
 *
 * `rise` is `both`-filled, so the prefers-reduced-motion block in globals.css
 * (which flattens animation-duration to 0.01ms) snaps it straight to the final
 * state rather than leaving anything invisible.
 *
 * Framer only drives the scroll parallax, which lives on wrapper elements so
 * it never competes with the CSS entrance transforms on their children.
 */
// --intro is non-zero only while the boot intro is playing (see Intro.jsx).
const RISE = (delay) => ({ animationDelay: `calc(var(--intro, 0s) + ${delay}s)` });

/**
 * The name arrives letter by letter; the surname lands as one gradient word so
 * background-clip: text has a single box to clip to. The h1 carries the real
 * name as its label and the per-letter spans are hidden, so a screen reader
 * hears "Harsh Bansal", not eleven letters.
 */
const HeroName = () => {
  const words = profile.name.split(' ');
  const first = words.slice(0, -1).join(' ');
  const last = words[words.length - 1];

  return (
    <h1 aria-label={profile.name} className="text-display font-semibold">
      <span aria-hidden="true">
        {[...first].map((ch, i) => (
          <span
             
            key={i}
            className="inline-block animate-letter"
            style={RISE(0.1 + i * 0.035)}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
        {first && ' '}
        <span
          className="inline-block animate-letter"
          style={RISE(0.14 + first.length * 0.035)}
        >
          <span className="text-shimmer">{last}</span>
        </span>
      </span>
    </h1>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const safe = useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Always rendered, collapsed to identity when motion is off, so the markup is
  // the same on server and client whichever way the preference resolves.
  const textY = useTransform(scrollYProgress, (v) => (safe ? v * 90 : 0));
  const textOpacity = useTransform(scrollYProgress, (v) => (safe ? 1 - v * 0.9 : 1));
  const cardY = useTransform(scrollYProgress, (v) => (safe ? v * 40 : 0));
  const canvasY = useTransform(scrollYProgress, (v) => (safe ? v * 160 : 0));

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-6 pb-16 pt-28 sm:px-10"
    >
      {/* Section-local glow: it scrolls away with the hero. A viewport-fixed one
          would follow you down the page and read as a stuck highlight. The two
          blobs drift on long, offset loops so the light never looks static. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[min(1240px,130vw)] -translate-x-1/2"
      >
        <span
          className="absolute inset-0 animate-drift"
          style={{ background: 'radial-gradient(44% 48% at 28% 42%, rgba(34,211,238,0.15), transparent 70%)' }}
        />
        <span
          className="absolute inset-0 animate-drift-alt"
          style={{ background: 'radial-gradient(38% 42% at 76% 30%, rgba(129,140,248,0.13), transparent 72%)' }}
        />
      </div>

      <m.div
        aria-hidden="true"
        className="hero-canvas-mask pointer-events-none absolute inset-0 animate-fade-in"
        style={{ y: canvasY, ...RISE(0.3) }}
      >
        <NetworkCanvas />
      </m.div>

      <div className="relative mx-auto grid w-full max-w-content items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,470px)] lg:gap-16">
        <m.div style={{ y: textY, opacity: textOpacity }}>
          {profile.available && (
            <p
              className="mb-7 inline-flex animate-rise items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-xs text-dim backdrop-blur-sm"
              style={RISE(0.02)}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.availabilityNote}
            </p>
          )}

          <p className="section-label mb-4 animate-rise" style={RISE(0.06)}>
            {profile.role} · {profile.company}
          </p>

          <HeroName />

          <p className="mt-6 max-w-prose animate-rise text-lead text-dim" style={RISE(0.5)}>
            {profile.headline}
          </p>

          <div
            className="mt-10 flex animate-rise flex-wrap items-center gap-3"
            style={RISE(0.6)}
          >
            <MagneticButton>
              <a href="#projects" className="group/btn btn btn-accent">
                View work
                <span aria-hidden="true" className="transition-transform duration-200 ease-out-flex group-hover/btn:translate-x-0.5">→</span>
              </a>
            </MagneticButton>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
              Download résumé
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline px-2 py-2.5 text-sm text-dim"
            >
              {profile.email}
            </a>
          </div>
        </m.div>

        {/* Text first on mobile; the terminal follows the CTAs. */}
        <m.div style={{ y: cardY }} className="w-full lg:justify-self-end">
          <div className="animate-rise" style={RISE(0.4)}>
            <TiltCard>
              <TerminalCard />
            </TiltCard>
          </div>
        </m.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-rise flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-accent sm:flex"
        style={RISE(1.4)}
      >
        <span className="flex h-8 w-5 justify-center rounded-full border border-line-strong pt-1.5 transition-colors group-hover:border-accent">
          <span className="h-1.5 w-px animate-scroll-cue rounded-full bg-current" />
        </span>
        Scroll
      </a>
    </section>
  );
};

export default Hero;

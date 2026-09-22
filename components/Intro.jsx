import React from 'react';
import intro from '../content/intro';
import Logo from './Logo';

/**
 * A ~2.4 second boot screen, shown once per browser session on the home page
 * and replayable from the reboot buttons.
 *
 * It is CSS only, and it is OFF unless `html.intro` is set — by an inline
 * script in _document.js before first paint (which also enforces
 * once-per-session and skips it under reduced motion), or by utils/intro.js
 * on reboot. With no JS, or on a repeat visit, this renders display:none and
 * costs nothing.
 *
 * Sequence (the timings live in the .intro-* rules in globals.css):
 *   0.0–1.5s  HUD frames in, the log types on, the ring and counter fill
 *   1.5s      the ring completes and flashes
 *   1.6–2.3s  an iris opens from the centre with a shockwave on its edge,
 *             revealing the page; the hero's entrance is delayed by
 *             var(--intro) so it plays as the iris opens
 */
const STEP = 0.24;
const RING_R = 58;
const RING_C = 2 * Math.PI * RING_R;

// Class names are spelled out in full, not built from `pos`: Tailwind only
// keeps @layer rules whose class names appear literally in the source.
const CORNER = {
  tl: 'intro-corner-tl',
  tr: 'intro-corner-tr',
  bl: 'intro-corner-bl',
  br: 'intro-corner-br',
};

const Corner = ({ pos, children }) => (
  <div className={`intro-corner ${CORNER[pos]} absolute font-mono text-[10px] uppercase tracking-[0.2em] text-mute`}>
    <span className="intro-bracket" />
    <span className="intro-hud-text">{children}</span>
  </div>
);

const Intro = () => (
  <>
    <div aria-hidden="true" className="intro-overlay fixed inset-0 z-[100] overflow-hidden bg-bg">
      {/* Atmosphere: grid, centre glow, scanlines and a sweeping scan beam. */}
      <div className="intro-grid absolute inset-0" />
      <div className="intro-glow absolute inset-0" />
      <div className="intro-scanlines pointer-events-none absolute inset-0" />
      <div className="intro-beam pointer-events-none absolute inset-x-0 top-0 h-40" />

      <Corner pos="tl">{intro.hud.topLeft}</Corner>
      <Corner pos="tr">{intro.hud.topRight}</Corner>
      <Corner pos="bl">{intro.hud.bottomLeft}</Corner>
      <Corner pos="br">{intro.hud.bottomRight}</Corner>

      <div className="intro-content absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* The ring: a track, a gradient arc that fills with the counter, a
            rotating tick bezel, and a dot orbiting the rim. */}
        <div className="intro-ring relative h-[148px] w-[148px]">
          <svg viewBox="0 0 148 148" className="absolute inset-0 h-full w-full -rotate-90">
            <defs>
              <linearGradient id="intro-arc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: 'var(--accent)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-2)' }} />
              </linearGradient>
            </defs>
            <circle cx="74" cy="74" r={RING_R} fill="none" stroke="var(--border-strong)" strokeWidth="2" />
            <circle
              className="intro-arc"
              cx="74"
              cy="74"
              r={RING_R}
              fill="none"
              stroke="url(#intro-arc)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              style={{ '--ring-c': RING_C }}
            />
          </svg>
          <svg viewBox="0 0 148 148" className="intro-bezel absolute inset-0 h-full w-full">
            <circle
              cx="74"
              cy="74"
              r="70"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="1.5 7.3"
            />
          </svg>
          <span className="intro-orbit absolute inset-0">
            <span className="absolute left-1/2 top-[3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
          </span>
          <span className="intro-monogram absolute inset-0 flex items-center justify-center">
            <Logo size={56} />
          </span>
        </div>

        <div className="mt-6 flex items-baseline gap-3 font-mono">
          <span className="intro-count text-2xl font-medium tabular-nums text-body" />
          <span className="intro-status text-[10px] uppercase tracking-[0.24em] text-mute">
            booting {intro.title}
          </span>
        </div>

        <div className="intro-log mt-7 w-full max-w-[21rem] space-y-1 font-mono text-[11px] leading-6 sm:text-[12px]">
          {intro.lines.map((line, i) => {
            const at = 0.35 + i * STEP;
            return (
              <p key={line.label} className="flex items-center gap-3">
                <span className="intro-fade shrink-0 tabular-nums text-mute/60" style={{ animationDelay: `${at}s` }}>
                  [{at.toFixed(2)}]
                </span>
                <span className="type-line flex-1 truncate text-dim" style={{ animationDelay: `${at}s` }}>
                  {line.label}
                </span>
                <span
                  className="intro-badge shrink-0 rounded border px-1.5 text-[10px] leading-[18px]"
                  style={{ animationDelay: `${at + 0.18}s` }}
                >
                  {line.value}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      {/* Outside .intro-content so it survives that fade. */}
      <span className="intro-flash pointer-events-none absolute left-1/2 top-1/2 h-[148px] w-[148px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </div>

    {/* The shockwave rides the edge of the iris. It lives outside the overlay
        because the overlay's own mask would cut it in half; the two share the
        --hole animation, so they stay locked together. */}
    <span aria-hidden="true" className="intro-shock pointer-events-none fixed left-1/2 top-1/2 z-[101] rounded-full" />
  </>
);

export default Intro;

import React from 'react';

/**
 * Three static layers behind everything: a dot grid, a top radial wash, and
 * film grain. No JS, no canvas, no scroll handler, no blur filter.
 *
 * translateZ(0) promotes the whole thing to one composited layer that is
 * rasterised once and never repainted — scrolling only moves the layers above
 * it. The grain is an inline feTurbulence data-URI rather than a PNG, so it
 * costs no network request.
 *
 * Deliberately NOT here: the hero glow. A viewport-fixed glow follows you down
 * the page and reads as a stuck highlight; the hero owns its own, which
 * scrolls away with it.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Dissolves the grid toward the footer so it never reads as graph paper. */
const FADE =
  'radial-gradient(125% 90% at 50% 0%, #000 30%, rgba(0,0,0,0.55) 62%, transparent 82%)';

const Backdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    style={{ transform: 'translateZ(0)' }}
  >
    <div
      className="absolute inset-0 bg-dot-grid bg-dot"
      style={{ WebkitMaskImage: FADE, maskImage: FADE }}
    />

    {/* Two gradients, not filter: blur(). A 120px blur on a full-viewport
        fixed layer is the most expensive thing you can do on mobile Safari,
        and at this softness a radial-gradient is indistinguishable. */}
    <div
      className="absolute inset-x-0 top-0 h-[80vh]"
      style={{
        background:
          'radial-gradient(58% 52% at 20% -5%, rgba(34,211,238,0.11), transparent 70%),' +
          'radial-gradient(46% 46% at 84% 8%, rgba(129,140,248,0.09), transparent 72%)',
      }}
    />

    {/* No mix-blend-mode: a full-screen blend forces an extra compositing pass
        every frame for a difference nobody can see. 0.035 is the ceiling —
        above ~0.05 the grain starts fighting text-dim body copy. */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{ backgroundImage: NOISE, backgroundRepeat: 'repeat' }}
    />
  </div>
);

export default Backdrop;

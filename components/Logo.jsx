import React, { useId } from 'react';

/**
 * The site mark: an H inside a hexagon. The hexagon is a service node — this
 * is a microservices engineer's site — and the H's crossbar is drawn as a
 * connection between its two uprights, with a glowing node at its centre:
 * two services, wired together. Shapes only, no <text>, so it renders
 * identically everywhere and holds up at favicon size (public/favicon.svg is
 * this same drawing on a dark tile).
 *
 * Motion is CSS and opt-in via `animated` (the navbar):
 *   · the hexagon and then the crossbar draw themselves in on load, after
 *     the intro if one plays
 *   · the core node breathes
 *   · on hover of the enclosing .group, the hexagon turns 60° — it is
 *     six-fold symmetric, so it lands looking exactly as it started — and
 *     the three vertex nodes light up
 *
 * useId keeps the gradient id unique when the mark appears more than once on
 * a page (navbar and intro).
 */
export const HEX = 'M32 6 54.5 19v26L32 58 9.5 45V19Z';

const Logo = ({ size = 28, animated = false, className = '' }) => {
  const id = `logo-grad-${useId().replace(/:/g, '')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 overflow-visible ${animated ? 'logo-animated' : ''} ${className}`}
    >
      <defs>
        <linearGradient id={id} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--accent-2)' }} />
        </linearGradient>
      </defs>

      <g className="logo-hex">
        <path
          d={HEX}
          pathLength="1"
          stroke={`url(#${id})`}
          strokeWidth="4"
          strokeLinejoin="round"
          className="logo-hex-path"
        />
        <circle cx="32" cy="6" r="3.2" className="logo-node" fill="var(--accent)" />
        <circle cx="54.5" cy="45" r="3.2" className="logo-node" fill="var(--accent-2)" />
        <circle cx="9.5" cy="45" r="3.2" className="logo-node" fill="var(--accent)" />
      </g>

      {/* The H: two uprights, then the crossbar-as-connection over them. */}
      <path d="M22 19.5v25M42 19.5v25" stroke="var(--text)" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M22 32h20"
        pathLength="1"
        stroke={`url(#${id})`}
        strokeWidth="4.6"
        strokeLinecap="round"
        className="logo-link"
      />
      {/* The core node: a solid disc with a pinhole, so it reads as a node
          sitting on the connection rather than a break in it. */}
      <g className="logo-core">
        <circle cx="32" cy="32" r="5.6" fill="var(--accent)" />
        <circle cx="32" cy="32" r="2.1" fill="var(--bg)" />
      </g>
    </svg>
  );
};

export default Logo;

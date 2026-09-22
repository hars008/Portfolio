import React from 'react';

/**
 * Was defined twice, byte-for-byte, in FeaturedProject and MoreProjectCard.
 *
 * The nudge on hover is driven by the named group `group/link` on the anchor
 * that contains it, so the arrow moves with the whole link rather than only
 * when the pointer is over the 12px glyph itself.
 */
const ArrowIcon = ({ className = '' }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={`shrink-0 transition-transform duration-200 ease-out-flex group-hover/link:-translate-y-[2px] group-hover/link:translate-x-[2px] ${className}`}
  >
    <path
      d="M2.5 9.5 9.5 2.5M9.5 2.5H4M9.5 2.5V8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;

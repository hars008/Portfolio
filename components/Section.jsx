import React from 'react';
import { m } from 'framer-motion';
import { fadeUp, revealUp, drawX, stagger, viewport } from '../utils/motion';

/**
 * Every section shares this shell: consistent vertical rhythm, a max-width
 * column, and an eyebrow + heading block.
 *
 * The number and label arrive on a shutter reveal — the wrapper clips and the
 * child slides up from below its own box, which is a plain translate and so
 * composites. A counting 00 -> 07 digit animation was the alternative and is
 * not worth it: dozens of text-node writes and a reflow per digit, for two
 * characters nobody reads as a number.
 */
const Section = ({
  id,
  number,
  label,
  title,
  intro,
  children,
  className = '',
  divider = true,
}) => (
  <section id={id} className={`relative w-full px-6 py-20 sm:px-10 sm:py-28 ${className}`}>
    {divider && (
      <div className="rule-gradient pointer-events-none absolute inset-x-6 top-0 h-px sm:inset-x-10" />
    )}
    <div className="relative mx-auto w-full max-w-content">
      {(label || title) && (
        <m.header
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-12 sm:mb-16"
        >
          {(number || label) && (
            <div className="mb-3 flex items-center gap-3">
              {number && (
                <span className="overflow-hidden py-[2px]">
                  <m.span
                    variants={revealUp()}
                    className="text-gradient block font-mono text-xs font-medium tabular-nums"
                  >
                    {number}
                  </m.span>
                </span>
              )}
              {label && (
                <span className="overflow-hidden py-[2px]">
                  <m.span variants={revealUp(0.05)} className="section-label block">
                    {label}
                  </m.span>
                </span>
              )}
              <m.span
                aria-hidden="true"
                variants={drawX(0.12)}
                className="h-px flex-1 origin-left bg-line"
              />
            </div>
          )}

          {title && (
            // Word-by-word shutter: each word rises out of its own clipped
            // box. The padding/negative-margin pair gives descenders room so
            // the clip does not shave the bottom off a g or a y.
            <m.h2 variants={stagger(0.05, 0.06)} className="text-h2 font-semibold">
              {title.split(' ').map((word, i, words) => (
                 
                <React.Fragment key={i}>
                  <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
                    <m.span variants={revealUp()} className="inline-block">
                      {word}
                    </m.span>
                  </span>
                  {i < words.length - 1 && ' '}
                </React.Fragment>
              ))}
            </m.h2>
          )}
          {intro && (
            <m.p variants={fadeUp(0.1)} className="mt-4 max-w-prose text-lead text-dim">
              {intro}
            </m.p>
          )}
        </m.header>
      )}
      {children}
    </div>
  </section>
);

export default Section;

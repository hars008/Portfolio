import React, { useRef } from 'react';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import Section from '../components/Section';
import sections from '../content/sections';
import Chip from '../components/Chip';
import experience from '../content/experience';
import { EASE_OUT_FLEX, fadeUp, stagger, useMotionSafe, viewport } from '../utils/motion';

/**
 * A timeline rail runs down the left of the cards on sm+ and fills with the
 * accent gradient as you scroll through the section. The fill is a scaleY on
 * one element, bound to useScroll — a compositor property, so it costs one
 * matrix update per frame. Under reduced motion the rail is simply full.
 *
 * Each card owns a node on the rail that pops in with the card; the current
 * employer's node keeps a soft ping so "now" is legible at a glance.
 */
const node = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.15, ease: EASE_OUT_FLEX } },
};

const Experience = () => {
  const ref = useRef(null);
  const safe = useMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const fill = useTransform(smooth, (v) => (safe ? v : 1));

  return (
    <Section id="experience" {...sections.experience}>
      <div ref={ref} className="relative sm:pl-12">
        <span aria-hidden="true" className="absolute bottom-4 left-[11px] top-4 hidden w-px bg-line sm:block" />
        <m.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-4 left-[11px] top-4 hidden w-px origin-top bg-gradient-to-b from-accent via-accent2 to-accent2/0 sm:block"
        />

        <m.ol
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative space-y-4"
        >
          {experience.map((job) => {
            const current = job.roles.some((r) => r.current);

            return (
              <m.li key={job.id} variants={fadeUp()} className="card card-lift relative p-6 sm:p-8">
                <m.span
                  aria-hidden="true"
                  variants={node}
                  className="absolute -left-12 top-9 hidden h-[23px] w-[23px] items-center justify-center rounded-full border border-line-strong bg-bg sm:flex"
                >
                  {current && (
                    <span className="absolute h-2 w-2 animate-ping-soft rounded-full bg-accent" />
                  )}
                  <span className={`relative h-2 w-2 rounded-full ${current ? 'bg-accent' : 'bg-accent2/70'}`} />
                </m.span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-h3 font-semibold">{job.company}</h3>
                  {job.meta && <p className="text-xs text-mute">{job.meta}</p>}
                </div>

                {/*
                  A company with more than one role renders them as a nested,
                  connected list so an internal transfer and promotion read as one
                  continuous tenure rather than two unrelated jobs.
                */}
                <ol
                  className={`mt-5 space-y-3 ${
                    job.roles.length > 1 ? 'border-l border-line pl-5' : ''
                  }`}
                >
                  {job.roles.map((role) => (
                    <li
                      key={role.title}
                      className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                    >
                      {job.roles.length > 1 && (
                        <span
                          aria-hidden="true"
                          className={`absolute -left-[23px] top-2 h-1.5 w-1.5 rounded-full ${
                            role.current ? 'bg-accent' : 'bg-line-strong'
                          }`}
                        />
                      )}
                      <p
                        className={`text-sm font-medium ${
                          role.current ? 'text-body' : 'text-dim'
                        }`}
                      >
                        {role.title}
                      </p>
                      <p className="font-mono text-xs text-mute">{role.period}</p>
                    </li>
                  ))}
                </ol>

                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {job.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-dim">
                      <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-accent/50" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
                    </li>
                  ))}
                </ul>
              </m.li>
            );
          })}
        </m.ol>
      </div>
    </Section>
  );
};

export default Experience;

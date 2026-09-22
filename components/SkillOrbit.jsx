import React from 'react';
import { AnimatePresence, m } from 'framer-motion';
import skills from '../content/skills';
import { skillIcon } from './skillIcons';
import { EASE_OUT_FLEX } from '../utils/motion';

/**
 * The stack as a small solar system: one orbit per group, innermost first,
 * each spinning at its own speed in alternating directions.
 *
 * Every moving part is the standalone `rotate` property on a CSS animation:
 *   · the ring spins (.orbit-spin)
 *   · each item on it counter-spins at the same rate, so logos stay upright
 * Both share the one class, so pausing on hover freezes them in lock-step.
 * Framer only handles the one-shot entrance (scale/opacity on `transform`),
 * which composes with `rotate` rather than fighting it.
 *
 * Items sit on the ring with left/top percentages — relative to the ring's own
 * box — and are centred with the standalone `translate`, so rotation happens
 * about each item's own centre.
 *
 * Rings are pointer-events: none — each is a full circle stacked over the
 * smaller ones, so otherwise the outer rings would swallow every hover aimed
 * at an inner logo. Only the logos themselves take the pointer.
 *
 * The orbit is decorative: the tab panel beside it carries every skill as real
 * text, and is the keyboard path. So this is aria-hidden and pointer-only.
 */

/** Ring diameter as a fraction of the stage, innermost first. */
const RINGS = [0.3, 0.46, 0.62, 0.78, 0.94];
const DURATIONS = [46, 64, 82, 100, 124];

export const layerTone = (index, count = skills.length) => {
  const t = count > 1 ? index / (count - 1) : 0;
  return `color-mix(in oklab, var(--accent) ${Math.round((1 - t) * 100)}%, var(--accent-2))`;
};

const ring = (i) => ({
  hidden: { opacity: 0, scale: 0.55 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.12,
      ease: EASE_OUT_FLEX,
      staggerChildren: 0.035,
      delayChildren: 0.35 + i * 0.12,
    },
  },
});

const pop = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 380, damping: 18 } },
};

const OrbitItem = ({ name, angle, duration, reverse, onHover }) => {
  const { Icon, outline } = skillIcon(name);
  const rad = (angle * Math.PI) / 180;
  // Math.cos/sin aren't guaranteed bit-identical across JS engines, so the
  // raw float can differ between server and client and trip hydration.
  const left = (50 + 50 * Math.cos(rad)).toFixed(4);
  const top = (50 + 50 * Math.sin(rad)).toFixed(4);

  return (
    <span className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
      <span
        className={`orbit-spin block ${reverse ? '' : 'orbit-reverse'}`}
        style={{ '--dur': `${duration}s`, translate: '-50% -50%' }}
      >
        <m.span
          variants={pop}
          onPointerEnter={onHover}
          className="orbit-item group/item pointer-events-auto relative flex h-8 w-8 items-center justify-center rounded-full border sm:h-11 sm:w-11"
        >
          <Icon
            focusable="false"
            className="h-3.5 w-3.5 sm:h-5 sm:w-5"
            {...(outline ? { strokeWidth: 2 } : {})}
          />
          <span className="orbit-tip pointer-events-none absolute left-1/2 top-full mt-2 whitespace-nowrap rounded-md border border-line-strong bg-surface-2 px-2 py-1 font-mono text-[10px] text-body">
            {name}
          </span>
        </m.span>
      </span>
    </span>
  );
};

const SkillOrbit = ({ active, onHover }) => {
  const group = skills[active];

  return (
    <m.div
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="orbit relative mx-auto aspect-square w-full max-w-[640px]"
      style={{ '--tone': layerTone(active) }}
    >
      {/* Ambient light in the active group's colour. */}
      <span className="orbit-glow pointer-events-none absolute inset-[8%] rounded-full" />

      {skills.map((g, i) => {
        const on = i === active;
        const reverse = i % 2 === 1;
        const offset = i * 37; // stagger start angles so no spokes line up

        return (
          <m.div
            key={g.group}
            variants={ring(i)}
            data-on={on || undefined}
            className="orbit-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: `${RINGS[i] * 100}%`,
              aspectRatio: '1',
              translate: '-50% -50%',
              '--ring': layerTone(i),
            }}
          >
            <div
              className={`orbit-spin absolute inset-0 rounded-full ${reverse ? 'orbit-reverse' : ''}`}
              style={{ '--dur': `${DURATIONS[i]}s` }}
            >
              <span className="orbit-comet absolute left-1/2 top-0 h-1.5 w-1.5 rounded-full" />
              {g.items.map((name, k) => (
                <OrbitItem
                  key={name}
                  name={name}
                  angle={offset + (360 / g.items.length) * k}
                  duration={DURATIONS[i]}
                  reverse={reverse}
                  onHover={() => onHover(i)}
                />
              ))}
            </div>
          </m.div>
        );
      })}

      {/* The core. Its label swaps with the active group. */}
      <div className="absolute left-1/2 top-1/2 flex aspect-square w-[18%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="orbit-core-ping absolute inset-0 rounded-full" />
        <span className="orbit-core-ping absolute inset-0 rounded-full [animation-delay:1.3s]" />
        <span className="orbit-core absolute inset-0 rounded-full" />
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={group.group}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_OUT_FLEX }}
            className="relative flex flex-col items-center text-center"
          >
            <span className="font-mono text-lg font-medium tabular-nums text-body sm:text-2xl">
              {String(group.items.length).padStart(2, '0')}
            </span>
            <span className="orbit-core-label mt-0.5 hidden font-mono text-[9px] uppercase tracking-[0.16em] xs:block">
              {group.group.split(' ')[0]}
            </span>
          </m.span>
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default SkillOrbit;

import React, { useCallback, useRef, useState } from 'react';
import { m, useInView } from 'framer-motion';
import Section from '../components/Section';
import sections from '../content/sections';
import SkillChip from '../components/SkillChip';
import SkillOrbit, { layerTone } from '../components/SkillOrbit';
import skills from '../content/skills';
import { stagger, useMotionSafe, useMounted } from '../utils/motion';

/**
 * The orbit on the left is the show; the tabs on the right are the substance.
 *
 * The tabs auto-advance like story slides so the orbit is always doing
 * something when a visitor arrives. The timer IS the progress bar: a CSS
 * animation on the active tab whose `animationend` advances to the next
 * group. Pausing it — pointer over the section, or section off screen — is
 * one animation-play-state flip, and there is no setInterval to drift.
 *
 * Once a visitor clicks a tab, autoplay stops for good: never move things
 * under someone who has taken control. Under reduced motion it never starts,
 * which also matters mechanically — the global reduced-motion rule shortens
 * every animation to 0.01ms, which would otherwise spin through the tabs.
 */
const Skills = () => {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [chosen, setChosen] = useState(false);
  const tabs = useRef([]);
  const stage = useRef(null);
  const inView = useInView(stage, { amount: 0.35 });
  const safe = useMotionSafe();
  const mounted = useMounted();

  const autoplay = mounted && safe && !chosen;
  const running = autoplay && inView && !hovering;

  const advance = useCallback(() => setActive((a) => (a + 1) % skills.length), []);

  const choose = (i, focus = false) => {
    setActive(i);
    setChosen(true);
    if (focus) tabs.current[i]?.focus();
  };

  const onKeyDown = (e, i) => {
    const last = skills.length - 1;
    const map = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      choose(map[e.key], true);
    }
  };

  return (
    <Section id="skills" {...sections.skills}>
      <div
        ref={stage}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className="grid items-center gap-10 overflow-x-clip lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10"
      >
        <SkillOrbit active={active} onHover={setActive} />

        <div>
          <div role="tablist" aria-label="Skill groups" aria-orientation="vertical" className="space-y-1.5">
            {skills.map((group, i) => {
              const on = i === active;
              return (
                <button
                  key={group.group}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`skills-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`skills-panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  style={{ '--group': layerTone(i) }}
                  className={`skill-tab relative flex w-full items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 text-left transition-colors duration-300 ${
                    on ? 'border-line-strong bg-surface-2' : 'border-transparent hover:bg-surface'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="skill-tab-dot h-2 w-2 shrink-0 rotate-45 border transition-[background-color,scale] duration-300"
                  />
                  <span
                    className={`flex-1 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                      on ? 'skill-tab-on' : 'text-mute'
                    }`}
                  >
                    {group.group}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-mute">
                    {String(group.items.length).padStart(2, '0')}
                  </span>

                  {/* The timer. Re-keyed on every activation so it restarts. */}
                  {on && autoplay && (
                    <span
                      key={`bar-${active}`}
                      aria-hidden="true"
                      onAnimationEnd={advance}
                      className="skill-tab-bar absolute inset-x-0 bottom-0 h-px origin-left"
                      style={{ animationPlayState: running ? 'running' : 'paused' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Every panel stays in the DOM so all 39 skills are real, indexable
              text; only the active one is shown, and it re-animates on entry. */}
          <div className="mt-6 min-h-[168px]">
            {skills.map((group, i) => {
              const on = i === active;
              return (
                <div
                  key={group.group}
                  role="tabpanel"
                  id={`skills-panel-${i}`}
                  aria-labelledby={`skills-tab-${i}`}
                  hidden={!on}
                  style={{ '--group': layerTone(i) }}
                >
                  {on ? (
                    <m.div key={`panel-${i}`} variants={stagger(0.025)} initial="hidden" animate="show">
                      {group.note && (
                        <m.p
                          variants={{
                            hidden: { opacity: 0, y: 6 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                          }}
                          className="mb-4 text-sm leading-relaxed text-dim"
                        >
                          {group.note}
                        </m.p>
                      )}
                      <ul className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <li key={item}>
                            <SkillChip name={item} />
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  ) : (
                    <>
                      <p>{group.note}</p>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;

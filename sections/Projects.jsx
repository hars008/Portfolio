import React from 'react';
import { m } from 'framer-motion';
import Section from '../components/Section';
import sections from '../content/sections';
import FeaturedProject from '../components/FeaturedProject';
import { featuredProjects } from '../content/projects';
import { fadeUp, stagger, viewportTall } from '../utils/motion';
import { useActiveSection } from '../utils/useActiveSection';

const IDS = featuredProjects.map((p) => `project-${p.slug}`);

/**
 * A sticky index rail rather than a scroll-pinned sequence.
 *
 * Pinning was the obvious thing to reach for and it is wrong here: three
 * projects is too few for a pin to feel deliberate, the cards are taller than
 * most laptop viewports so they would need to shrink to fit, and the
 * click-to-play button for a 68 MB video inside a scroll-hijacked region is a
 * bad target. The rail reads as considered for one IntersectionObserver and a
 * CSS `position: sticky` — no JS animation at all.
 */
const Projects = () => {
  const active = useActiveSection(IDS, '-45% 0px -45% 0px');

  return (
    <Section id="projects" {...sections.projects}>
      <div className="grid gap-10 lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-14">
        {/* Decorative: it repeats the headings in the cards beside it. */}
        <div aria-hidden="true" className="hidden lg:block">
          <ol className="sticky top-28 space-y-1 border-l border-line">
            {featuredProjects.map((project, i) => {
              const on = active === `project-${project.slug}`;
              return (
                <li key={project.slug} className="relative py-2 pl-5">
                  <span
                    className={`absolute -left-px bottom-2 top-2 w-px origin-top bg-grad-accent transition-transform duration-500 ease-out-flex ${
                      on ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  <span
                    className={`block font-mono text-[11px] tabular-nums transition-colors duration-300 ${
                      on ? 'text-accent' : 'text-mute'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`block text-sm transition-colors duration-300 ${
                      on ? 'text-body' : 'text-mute'
                    }`}
                  >
                    {project.title}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <m.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportTall}
          className="space-y-6"
        >
          {featuredProjects.map((project) => (
            <m.div key={project.slug} id={`project-${project.slug}`} variants={fadeUp(0, 16)}>
              <FeaturedProject project={project} />
            </m.div>
          ))}
        </m.div>
      </div>
    </Section>
  );
};

export default Projects;

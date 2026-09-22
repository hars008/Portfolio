import React from 'react';
import { m } from 'framer-motion';
import Section from '../components/Section';
import sections from '../content/sections';
import MoreProjectCard from '../components/MoreProjectCard';
import { moreProjects } from '../content/projects';
import { fadeUp, stagger, viewport } from '../utils/motion';

const MoreProjects = () => (
  <Section id="archive" {...sections.archive}>
    <m.ul
      variants={stagger(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {moreProjects.map((project) => (
        <m.li key={project.slug} variants={fadeUp()}>
          <MoreProjectCard project={project} />
        </m.li>
      ))}
    </m.ul>
  </Section>
);

export default MoreProjects;

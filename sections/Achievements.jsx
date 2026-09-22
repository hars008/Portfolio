import React from 'react';
import { m } from 'framer-motion';
import Section from '../components/Section';
import sections from '../content/sections';
import SocialLinks from '../components/SocialLinks';
import { achievements } from '../content/stats';
import { fadeUp, stagger, viewport } from '../utils/motion';

const Achievements = () => (
  <Section id="achievements" {...sections.achievements}>
    <m.ul
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid gap-4 sm:grid-cols-2"
    >
      {achievements.map((item) => (
        <m.li key={item.title} variants={fadeUp()} className="card card-lift p-5">
          <p className="text-base font-medium text-body">{item.title}</p>
          <p className="mt-1.5 text-sm text-dim">{item.detail}</p>
        </m.li>
      ))}
    </m.ul>

    <m.div
      variants={fadeUp()}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="mt-8 flex flex-wrap items-center gap-4 text-sm text-mute"
    >
      <span className="font-mono text-xs uppercase tracking-[0.18em]">Profiles</span>
      <SocialLinks size={17} />
    </m.div>
  </Section>
);

export default Achievements;

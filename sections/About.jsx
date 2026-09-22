import React from 'react';
import { m } from 'framer-motion';
import Section from '../components/Section';
import sections from '../content/sections';
import BentoCard from '../components/BentoCard';
import CountUp from '../components/CountUp';
import SocialLinks from '../components/SocialLinks';
import profile from '../content/profile';
import education from '../content/education';
import now from '../content/now';
import { stats } from '../content/stats';
import { stagger, viewportTall } from '../utils/motion';

/**
 * The four metrics here used to be their own <Stats> section directly above
 * About, which meant two stacked slabs saying closely related things. They are
 * now cells in this bento, and sections/Stats.jsx is gone.
 *
 * viewportTall rather than viewport: this block is well over a screen tall on
 * desktop, so the default amount: 0.2 would fire late or, on a short viewport,
 * not at all.
 */
const StatCell = ({ stat, span }) => (
  <BentoCard span={span} className="flex flex-col justify-between">
    <dt className="sr-only">{stat.label}</dt>
    <dd>
      <CountUp
        value={stat.value}
        className={`font-mono text-2xl font-medium sm:text-3xl ${
          stat.emphasis ? 'text-gradient' : 'text-accent'
        }`}
      />
      {stat.unit && <span className="font-mono text-sm text-mute">{stat.unit}</span>}
      <p className="mt-2 text-sm leading-snug text-dim">{stat.label}</p>
    </dd>
    <span
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-grad-accent transition-transform duration-500 ease-out-flex group-hover:scale-x-100"
    />
  </BentoCard>
);

const Label = ({ children }) => (
  <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-mute">{children}</h3>
);

const About = () => (
  <Section id="about" {...sections.about}>
    <m.dl
      variants={stagger(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={viewportTall}
      className="grid auto-rows-[minmax(128px,auto)] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6 lg:grid-cols-12"
    >
      <BentoCard span="col-span-2 md:col-span-4 md:row-span-2 lg:col-span-8" glow>
        <div className="max-w-prose space-y-4">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-dim sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </BentoCard>

      <BentoCard span="col-span-2 md:col-span-2 md:row-span-2 lg:col-span-4" glow>
        <Label>{now.label}</Label>
        <ul className="space-y-3">
          {now.items.map((item) => (
            <li key={item.k} className="text-sm">
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {item.k}
              </span>
              <span className="text-dim">{item.v}</span>
            </li>
          ))}
        </ul>
      </BentoCard>

      {stats.map((stat) => (
        <StatCell key={stat.key} stat={stat} span="col-span-1 md:col-span-3 lg:col-span-3" />
      ))}

      <BentoCard span="col-span-2 md:col-span-4 lg:col-span-8">
        <Label>Education</Label>
        <p className="text-h3 font-medium text-body">{education.degree}</p>
        <p className="mt-2 text-sm text-dim">{education.institute}</p>
        {education.highlight && (
          <p className="mt-2 text-sm text-mute">{education.highlight}</p>
        )}
        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 font-mono text-xs text-mute">
          <span>{education.period}</span>
          <span aria-hidden="true">·</span>
          <span className="text-accent">{education.score}</span>
        </div>
      </BentoCard>

      <BentoCard span="col-span-2 md:col-span-2 lg:col-span-4">
        <Label>Based in</Label>
        <p className="text-sm text-body">{profile.location}</p>
        <p className="mt-1 font-mono text-xs text-mute">{profile.timezone}</p>
        <SocialLinks className="mt-5" size={17} />
      </BentoCard>
    </m.dl>
  </Section>
);

export default About;

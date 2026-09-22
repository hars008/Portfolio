import React from 'react';
import { m } from 'framer-motion';
import Section from '../components/Section';
import sections from '../content/sections';
import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';
import profile from '../content/profile';
import { fadeUp, stagger, viewport } from '../utils/motion';

const Contact = () => (
  <Section id="contact" {...sections.contact}>
    <m.div
      variants={stagger()}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16"
    >
      <m.div variants={fadeUp()}>
        <ContactForm />
      </m.div>

      <m.div variants={fadeUp()} className="space-y-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mute">Email</p>
          <a
            href={`mailto:${profile.email}`}
            className="link-underline mt-2 inline-block text-base"
          >
            {profile.email}
          </a>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mute">Phone</p>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="link-underline mt-2 inline-block text-base"
          >
            {profile.phone}
          </a>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-mute">Elsewhere</p>
          <SocialLinks className="mt-3" size={19} />
        </div>

        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-ghost"
        >
          Download résumé
        </a>
      </m.div>
    </m.div>
  </Section>
);

export default Contact;

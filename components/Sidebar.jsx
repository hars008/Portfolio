import React from 'react';
import { m } from 'framer-motion';
import SocialLinks from './SocialLinks';
import profile from '../content/profile';
import { drawY, fadeUp, stagger } from '../utils/motion';

/**
 * Fixed rails, desktop only. The mobile equivalents live in Contact and Footer.
 *
 * They arrive about a second after load, deliberately behind the hero: these
 * are chrome, and chrome that competes with the headline for attention on
 * first paint is chrome in the wrong place.
 */
const Sidebar = () => (
  <>
    <m.div
      initial="hidden"
      animate="show"
      variants={stagger(0.08, 1.1)}
      className="fixed bottom-0 left-8 z-40 hidden flex-col items-center gap-6 lg:flex"
    >
      <m.div variants={fadeUp()}>
        <SocialLinks className="!flex-col !gap-5" size={17} />
      </m.div>
      <m.span
        aria-hidden="true"
        variants={drawY()}
        className="h-24 w-px origin-bottom bg-line-strong"
      />
    </m.div>

    <m.div
      initial="hidden"
      animate="show"
      variants={stagger(0.08, 1.2)}
      className="fixed bottom-0 right-8 z-40 hidden flex-col items-center gap-6 lg:flex"
    >
      <m.a
        variants={fadeUp()}
        href={`mailto:${profile.email}`}
        className="link-underline link-underline-vertical font-mono text-xs tracking-widest text-mute"
        style={{ writingMode: 'vertical-rl' }}
      >
        {profile.email}
      </m.a>
      <m.span
        aria-hidden="true"
        variants={drawY()}
        className="h-24 w-px origin-bottom bg-line-strong"
      />
    </m.div>
  </>
);

export default Sidebar;

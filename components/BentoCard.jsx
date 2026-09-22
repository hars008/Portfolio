import React from 'react';
import { m } from 'framer-motion';
import { fadeUp } from '../utils/motion';

/**
 * One cell of the About bento. It is the existing .card plus the shared hover
 * classes; `span` carries the responsive grid spans so the grid template stays
 * readable at the call site rather than being buried in here.
 *
 * `glow-edge` is opt-in and used on exactly two cells — it reads as emphasis
 * only while it is rare.
 */
const BentoCard = ({ span = '', glow = false, className = '', children }) => (
  <m.div
    variants={fadeUp()}
    className={`card card-lift group overflow-hidden p-5 sm:p-6 ${glow ? 'glow-edge' : ''} ${span} ${className}`}
  >
    {children}
  </m.div>
);

export default BentoCard;

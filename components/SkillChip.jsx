import React from 'react';
import { m } from 'framer-motion';
import { skillIcon } from './skillIcons';
import { chipIn } from '../utils/motion';

/**
 * A skill chip is a Chip with a brand glyph and a hover lift.
 *
 * It is deliberately a separate component from Chip rather than a prop on it:
 * Chip's four call sites all render project and role stack tags, which need to
 * stay flat and logo-less. Six logo'd chips under a project title would
 * out-shout it, and a chip that lifts inside a card that also lifts is two
 * hovers fighting.
 *
 * The hover glow picks up the --group colour set on the row, so a Backend
 * chip lights a different point on the accent ramp than a Frontend one.
 *
 * The hover itself is CSS (.chip-skill), not whileHover. For 39 chips that
 * would mean 39 pointer subscriptions and 39 nodes in framer’s projection tree
 * to express what one CSS declaration hands straight to the compositor.
 *
 * The glyph is decorative — the label beside it carries the name — so it is
 * aria-hidden. Simple Icons ship role="img" with an empty <title>, which
 * without this reads to a screen reader as an unlabelled image.
 */
const SkillChip = ({ name }) => {
  const { Icon, outline } = skillIcon(name);

  return (
    <m.span
      variants={chipIn}
      className="chip chip-skill"
    >
      <Icon
        size={13}
        aria-hidden="true"
        focusable="false"
        className="chip-glyph shrink-0"
        {...(outline ? { strokeWidth: 2.4 } : {})}
      />
      {name}
    </m.span>
  );
};

export default SkillChip;

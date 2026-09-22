import React from 'react';
import {
  SiGithub, SiLeetcode, SiCodechef, SiCodeforces,
} from 'react-icons/si';
// LinkedIn's mark was removed from Simple Icons at LinkedIn's request.
import { FaLinkedin } from 'react-icons/fa6';
import profile from '../content/profile';

/**
 * Replaces six PNGs (up to 91 KB each, one of them a byte-identical duplicate)
 * with tree-shaken icon components.
 */
const ICONS = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedin,
  LeetCode: SiLeetcode,
  CodeChef: SiCodechef,
  Codeforces: SiCodeforces,
};

const SocialLinks = ({ className = '', size = 18 }) => (
  <ul className={`flex items-center gap-5 ${className}`}>
    {profile.socials.map((social) => {
      const Icon = ICONS[social.name];
      if (!Icon) return null;
      return (
        <li key={social.name}>
          <a
            href={social.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${social.name} — ${social.handle}`}
            className="block text-mute transition-[color,transform] duration-200 ease-out-flex hover:-translate-y-0.5 hover:text-accent"
          >
            {/* The anchor carries the label, so the glyph is decorative.
                Without this react-icons emits an empty <title> per icon. */}
            <Icon size={size} aria-hidden="true" focusable="false" />
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialLinks;

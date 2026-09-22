import React from 'react';
import SocialLinks from './SocialLinks';
import RebootButton from './RebootButton';
import profile from '../content/profile';

// `home`: the reboot link only makes sense where the intro lives.
const Footer = ({ home = false }) => (
  <footer className="relative px-6 py-10 sm:px-10">
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
    />
    <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <p className="font-mono text-xs text-mute">
        {/* was hardcoded to 2023 */}
        © {new Date().getFullYear()} {profile.name} · Built with Next.js &amp; Tailwind
      </p>
      <div className="flex items-center gap-6">
        {home && <RebootButton />}
        <SocialLinks size={17} className="lg:hidden" />
      </div>
    </div>
  </footer>
);

export default Footer;

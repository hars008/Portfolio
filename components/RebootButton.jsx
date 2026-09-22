import React from 'react';
import { TbRefresh } from 'react-icons/tb';
import { reboot } from '../utils/intro';
import { useMotionSafe, useMounted } from '../utils/motion';

/**
 * Replays the boot intro. Two looks: `icon` for the hero terminal's title
 * bar, `text` for the footer.
 *
 * Rendered only after mount (so server and client markup agree) and never
 * under reduced motion — there the intro's animations are flattened to
 * nothing, so the button would appear to do nothing at all.
 */
const RebootButton = ({ variant = 'text', className = '' }) => {
  const mounted = useMounted();
  const safe = useMotionSafe();
  if (!mounted || !safe) return null;

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={reboot}
        aria-label="Reboot — replay the intro"
        title="Reboot"
        className={`group/reboot flex h-6 w-6 items-center justify-center rounded-md text-mute transition-colors duration-200 hover:bg-surface hover:text-accent ${className}`}
      >
        <TbRefresh
          size={14}
          aria-hidden="true"
          focusable="false"
          className="transition-transform duration-500 ease-out-flex group-hover/reboot:rotate-180"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={reboot}
      className={`group/reboot inline-flex items-center gap-1.5 font-mono text-xs text-mute transition-colors duration-200 hover:text-accent ${className}`}
    >
      <span className="text-accent">$</span> reboot
      <TbRefresh
        size={13}
        aria-hidden="true"
        focusable="false"
        className="transition-transform duration-500 ease-out-flex group-hover/reboot:rotate-180"
      />
    </button>
  );
};

export default RebootButton;

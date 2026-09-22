import { useEffect, useState } from 'react';

/**
 * Shared scroll-spy. The Navbar and the Projects index rail both need exactly
 * this, and the Navbar previously carried it inline — so it lives here once.
 *
 * IntersectionObserver rather than a scroll listener: it costs nothing per
 * frame and the browser does the work off the main thread. This and the scroll
 * progress bar are the only scroll-aware things on the site.
 */
export const useActiveSection = (ids, rootMargin = '-45% 0px -50% 0px') => {
  const [active, setActive] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 1] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key, rootMargin]);

  return active;
};

export default useActiveSection;

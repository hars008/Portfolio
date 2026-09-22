import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import profile from '../content/profile';
import MagneticButton from './MagneticButton';
import Logo from './Logo';
import { useActiveSection } from '../utils/useActiveSection';
import { drawerPanel, scrim } from '../utils/motion';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

const Navbar = ({ standalone = false }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef(null);
  const active = useActiveSection(standalone ? [] : SECTION_IDS);

  /**
   * A 1px sentinel observed at the top of the page, rather than a scroll
   * listener. Same result, no per-frame handler — and it leaves the site with
   * zero scroll listeners outside the progress bar's useScroll.
   */
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Escape to dismiss, and lock the page behind the open drawer.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute left-0 top-0 h-px w-px" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? 'border-b border-line bg-bg/[0.85] backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6 sm:px-10"
        >
          <Link
            href="/"
            aria-label="harsh.dev — home"
            className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-body"
          >
            <Logo size={28} animated />
            <span>
              harsh<span className="text-mute transition-colors duration-300 group-hover:text-accent">.dev</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {!standalone
              && LINKS.map((link) => {
                const on = active === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    /* The active section used to be signalled by colour alone.
                       aria-current fixes that for assistive tech, and the
                       underline below makes it visible without colour too. */
                    aria-current={on ? 'true' : undefined}
                    className={`relative text-sm transition-colors duration-200 ${
                      on ? 'text-accent' : 'text-dim hover:text-body'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-grad-accent transition-transform duration-300 ease-out-flex ${
                        on ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            {standalone && (
              <Link href="/" className="link-underline text-sm text-dim">
                ← Back to portfolio
              </Link>
            )}
            <MagneticButton>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost px-3.5 py-1.5"
              >
                Résumé
              </a>
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-body md:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </nav>

        {/* The drawer used to unmount instantly with no exit animation. Only
            opacity and y animate — never height, which would be layout work on
            every frame. The scrim is a real button, not a div with onClick. */}
        <AnimatePresence>
          {open && (
            <>
              {/* Mouse affordance only: the toggle above is already named
                  "Close menu" and Escape closes too, so exposing this as a
                  second identically-named button just duplicates it in the
                  accessibility tree and the tab order. */}
              <m.button
                key="scrim"
                type="button"
                aria-hidden="true"
                tabIndex={-1}
                aria-label="Close menu"
                onClick={close}
                variants={scrim}
                initial="hidden"
                animate="show"
                exit="exit"
                className="fixed inset-0 top-16 -z-10 h-full w-full cursor-default bg-bg/70 md:hidden"
              />
              <m.div
                key="drawer"
                id="mobile-menu"
                variants={drawerPanel}
                initial="hidden"
                animate="show"
                exit="exit"
                className="border-t border-line bg-bg px-6 pb-6 pt-2 md:hidden"
              >
                <ul className="flex flex-col">
                  {!standalone
                    && LINKS.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={close}
                          className="block border-b border-line py-3 text-base text-dim transition-colors hover:text-body"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  {standalone && (
                    <li>
                      <Link
                        href="/"
                        onClick={close}
                        className="block border-b border-line py-3 text-base text-dim"
                      >
                        ← Back to portfolio
                      </Link>
                    </li>
                  )}
                </ul>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={close}
                  className="btn btn-ghost mt-5 w-full"
                >
                  Download Résumé
                </a>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;

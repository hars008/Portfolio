import React, { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import profile from '../content/profile';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

const field = 'w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-body placeholder:text-mute transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none';

// The label reacts to focus via group-focus-within — no JS, no state.
const labelClass = 'mb-1.5 block font-mono text-xs text-mute transition-colors duration-200 group-focus-within:text-accent';

const Status = ({ children, tone }) => (
  <m.span
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.28, ease: [0.05, 0.6, 0.4, 0.9] }}
    className={`inline-flex items-center gap-2 ${tone}`}
  >
    {children}
  </m.span>
);

const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // Until a Formspree ID is configured, fall back to opening the user's mail
  // client with the message pre-filled rather than silently dropping it.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Request failed');
      event.target.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="group">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={field} placeholder="Jane Doe" />
        </div>
        <div className="group">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={field} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="group">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={`${field} resize-y`} placeholder="What are you working on?" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-accent"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {/* The live region itself stays mounted and AnimatePresence swaps only
            its contents: if the aria-live element is what mounts, screen
            readers routinely miss the announcement. min-h reserves the line so
            the button row does not reflow when a message appears. */}
        <p aria-live="polite" className="min-h-[1.25rem] text-sm">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' && (
              <Status key="sent" tone="text-accent">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
                  <m.path
                    d="M2.5 7.4 5.6 10.5 11.5 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                  />
                </svg>
                Thanks — I&apos;ll be in touch.
              </Status>
            )}
            {status === 'error' && (
              <Status key="error" tone="text-red-400">
                <span>
                  Something went wrong. Email me at{' '}
                  <a href={`mailto:${profile.email}`} className="link-underline">{profile.email}</a>.
                </span>
              </Status>
            )}
          </AnimatePresence>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;

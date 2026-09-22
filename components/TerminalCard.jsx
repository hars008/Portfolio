import React from 'react';
import terminal from '../content/terminal';
import RebootButton from './RebootButton';

/**
 * The hero's right-hand visual. No photo exists, so the "image" is text — and
 * the site's wordmark is already `> harsh.dev`, so a terminal is the honest
 * shape for it.
 *
 * The typing is CSS only: each line is clipped from 100% to 0 with steps(),
 * and the sequencing is nothing more than `animation-delay: i * STEP`. No
 * setInterval, no state, no per-frame JS — which also means it starts at first
 * paint rather than waiting for hydration. The .type-line rule is gated on
 * prefers-reduced-motion: no-preference and defaults to fully visible, so if
 * the animation never runs the text is simply there.
 *
 * The caret is the second and last permitted infinite animation on the page
 * (the hero availability dot is the first). The body is one <pre> so the whole
 * thing stays selectable and copyable.
 */
const TONE = {
  cmd: 'text-body',
  out: 'text-dim',
  key: 'text-mute',
  ok: 'text-accent',
};

const START = 0.45; // lets the h1 land first
const STEP = 0.28;

/**
 * The frame is a 1px gutter over a slowly rotating conic "beam". The beam is
 * a square twice the card's width spun with the standalone `rotate` property,
 * so it is a pure compositor animation — no repaint of the gradient per frame,
 * unlike animating the conic angle itself.
 */
const TerminalCard = () => (
  <div className="relative isolate rounded-xl shadow-e2">
    {/* Ambient under-glow so the card sits in light rather than on the page. */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-70"
      style={{ background: 'radial-gradient(60% 60% at 50% 55%, var(--accent-soft), transparent 70%)' }}
    />
    <div className="relative overflow-hidden rounded-xl bg-line-strong/70 p-px">
      <span aria-hidden="true" className="terminal-beam" />
      <div className="relative overflow-hidden rounded-[11px] bg-surface">
        <TerminalBody />
      </div>
    </div>
  </div>
);

const TerminalBody = () => (
  <>
    <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
      <span aria-hidden="true" className="flex gap-1.5">
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
      </span>
      <span className="ml-1 flex-1 truncate font-mono text-[11px] text-mute">{terminal.title}</span>
      <RebootButton variant="icon" className="-my-1 -mr-1.5" />
    </div>

    <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-[1.75] sm:px-5 sm:text-[13px]">
      {terminal.lines.map((line, i) => (
        <div key={line.text} className="whitespace-pre">
          <span
            className={`type-line ${TONE[line.kind]}`}
            style={{ animationDelay: `calc(var(--intro, 0s) + ${START + i * STEP}s)` }}
          >
            {line.kind === 'cmd' && <span className="text-accent">$ </span>}
            {line.text}
          </span>
        </div>
      ))}
      <span
        aria-hidden="true"
        className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] animate-caret bg-accent"
        style={{ animationDelay: `calc(var(--intro, 0s) + ${START + terminal.lines.length * STEP}s)` }}
      />
    </pre>
  </>
);

export default TerminalCard;

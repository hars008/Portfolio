/**
 * Every palette entry below is a hex CSS custom property, and Tailwind cannot
 * apply an opacity modifier to one on its own — `bg-bg/85` silently compiled
 * to nothing at all, which left the scrolled navbar with no background (only
 * the blur) and made the mobile drawer scrim invisible.
 *
 * color-mix keeps the variables authorable as plain hex in globals.css while
 * making `/NN` work everywhere. With no modifier the output is `var(--x)`,
 * exactly as before, so nothing else changes.
 */
const withAlpha = (variable) => ({ opacityValue }) => {
  // Tailwind passes a number for `/NN`, but `var(--tw-bg-opacity)` for the
  // bare utility — multiplying that string yields NaN%, so fall back to the
  // plain variable whenever the value is not a real number.
  const alpha = Number(opacityValue);
  return Number.isFinite(alpha)
    ? `color-mix(in srgb, var(${variable}) ${alpha * 100}%, transparent)`
    : `var(${variable})`;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './sections/**/*.{html,js,jsx}',
    './content/**/*.{js,jsx}',
  ],
  future: {
    // Compiles every `hover:` utility under @media (hover: hover), so a tap on
    // a touch device does not leave the hover state stuck on.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        bg: withAlpha('--bg'),
        surface: withAlpha('--surface'),
        'surface-2': withAlpha('--surface-2'),
        line: withAlpha('--border'),
        'line-strong': withAlpha('--border-strong'),
        body: withAlpha('--text'),
        dim: withAlpha('--text-dim'),
        mute: withAlpha('--text-mute'),
        accent: withAlpha('--accent'),
        accent2: withAlpha('--accent-2'),
        // Already translucent by definition, so no alpha channel to reopen.
        'accent-soft': 'var(--accent-soft)',
        'accent2-soft': 'var(--accent-2-soft)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 1.2rem + 5.2vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.125rem, 0.95rem + 0.7vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        lead: ['clamp(1rem, 0.94rem + 0.3vw, 1.175rem)', { lineHeight: '1.65' }],
      },
      maxWidth: {
        content: '1100px',
        prose: '68ch',
      },
      backgroundImage: {
        'grad-accent': 'var(--grad-accent)',
        'dot-grid': 'radial-gradient(circle at 1px 1px, var(--dot) 1px, transparent 0)',
      },
      backgroundSize: {
        dot: 'var(--dot-size) var(--dot-size)',
      },
      boxShadow: {
        e2: 'var(--shadow-2)',
        glow: 'var(--glow-accent)',
      },
      transitionTimingFunction: {
        // Repointed at the CSS var so utils/motion.js and the stylesheet share
        // one curve and cannot drift.
        'out-flex': 'var(--ease-out-flex)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        // Terminal caret. steps(1) means two paints per second on a 1ch box.
        caret: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        // CSS entrance for above-the-fold content: starts at first paint
        // instead of waiting for React to hydrate.
        // The standalone `translate` property rather than `transform`, so an
        // element can rise and still keep a Tailwind -translate-x-1/2 centring.
        rise: {
          from: { opacity: '0', translate: '0 14px' },
          to: { opacity: '1', translate: '0 0' },
        },
        // Hero name, per letter: a short rise with a slight lean that settles.
        letter: {
          from: { opacity: '0', translate: '0 0.45em', rotate: '6deg' },
          to: { opacity: '1', translate: '0 0', rotate: '0deg' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // Hero light. Two long offset loops so the pair never syncs up.
        drift: {
          '0%, 100%': { translate: '0 0', scale: '1' },
          '50%': { translate: '6% 4%', scale: '1.08' },
        },
        driftAlt: {
          '0%, 100%': { translate: '0 0', scale: '1.04' },
          '50%': { translate: '-7% 6%', scale: '0.96' },
        },
        pingSoft: {
          '0%': { scale: '1', opacity: '0.7' },
          '80%, 100%': { scale: '2.6', opacity: '0' },
        },
        scrollCue: {
          '0%': { translate: '0 0', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { translate: '0 10px', opacity: '0' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        caret: 'caret 1.06s steps(1) infinite',
        rise: 'rise 0.6s var(--ease-out-flex) both',
        letter: 'letter 0.7s cubic-bezier(0.2, 0.9, 0.25, 1) both',
        'fade-in': 'fadeIn 1.6s ease-out 0.3s both',
        drift: 'drift 18s ease-in-out infinite',
        'drift-alt': 'driftAlt 23s ease-in-out infinite',
        'ping-soft': 'pingSoft 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scroll-cue': 'scrollCue 1.8s var(--ease-out-flex) infinite',
      },
    },
  },
  plugins: [],
};

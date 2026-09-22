# harsh-bansal.netlify.app

Personal portfolio for Harsh Bansal — Software Engineer III at LNVS Fintech.

Next.js 16 (Pages Router) · React 19 · Tailwind CSS 3 · framer-motion. No UI kit.

Requires Node 24 (pinned in `.nvmrc`, which Netlify also reads).

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where the content lives

All copy is data, not JSX. To update the site, edit `content/` — nothing in
`sections/` or `components/` should need to change.

| File | Holds |
|---|---|
| `content/profile.js` | Name, role, headline, bio, email, socials, résumé path |
| `content/experience.js` | Companies, roles, dates, achievement bullets, stack |
| `content/projects.js` | Featured projects (with case studies) and the archive |
| `content/skills.js` | Grouped tech stack, plus a per-group note and `primary` list |
| `content/education.js` | Degree, institute, dates, CPI |
| `content/stats.js` | The About bento metrics and the achievements list |
| `content/sections.js` | Every section's number, eyebrow, heading and intro |
| `content/terminal.js` | The lines in the hero terminal card |
| `content/now.js` | The "Currently" bento cell |

A project with `tier: 'featured'` automatically gets a statically generated
page at `/projects/<slug>` — add one to `content/projects.js` with a
`caseStudy` block and the route appears on the next build. Remember to add it
to `public/sitemap.xml` too.

## Skill glyphs

Skill chips carry a brand logo, mapped from the exact string in
`content/skills.js` by `components/skillIcons.js`. Adding a skill needs no edit
there — an unregistered name renders a neutral glyph at the same size, so the
row still lines up. Register a logo only when you want one.

`content/` stays free of React so it can keep being imported by
`getStaticProps` and the JSON-LD builder in `SEO.jsx`; that is why the map
lives in `components/`, mirroring `SocialLinks.jsx`.

## Project screenshots

A project can carry `image: { src, alt, w, h }` (a bare path also works).
Precedence is `media` (video) → `image` → text-only, so a project with neither
renders exactly as it does today.

Export screenshots as **WebP, at most 1600px wide and 180 KB**, into
`public/projects/`. `next/image` is deliberately not used: there is no `images`
block in `next.config.js`, and on Netlify adopting it pulls in the plugin's
image CDN for a handful of author-controlled files. The `aspect-video` frame
already reserves the box, so there is no layout shift.

## Design tokens

Colours are CSS custom properties on `:root` in `styles/globals.css`, exposed
to Tailwind in `tailwind.config.js`. Change them in one place.

## Motion rules

`utils/motion.js` holds the whole vocabulary. Three rules keep the page fast:

- **Only `transform` and `opacity` animate.** A glow is a static `box-shadow`
  on a pseudo-element whose *opacity* transitions — animating `box-shadow`
  itself repaints every frame.
- **framer owns entrance, CSS owns hover.** The 38 skill chips hover in CSS for
  this reason.
- **Two infinite animations, total** (the hero availability dot and the
  terminal caret), one `useScroll` (the progress bar), and one
  `backdrop-filter` (the navbar). Everything else scroll-aware uses
  `IntersectionObserver` via `utils/useActiveSection.js`.

`pages/_app.js` wraps the app in `LazyMotion … strict`, so use `m.div`, never
`motion.div`. It also sets `MotionConfig reducedMotion="user"` — the CSS
`prefers-reduced-motion` block cannot reach framer's JS-driven transforms on
its own.

## Contact form

The form posts to Formspree when `NEXT_PUBLIC_FORMSPREE_ID` is set, and falls
back to opening the visitor's mail client when it is not. Set it in Netlify's
environment variables to enable real submissions.

## Known follow-ups

- `public/GB-scrapper.mp4` (68 MB) and `public/stock-market.mp4` (41 MB) are
  uncompressed. They are behind click-to-play so nothing downloads until a
  visitor asks, but they should be re-encoded — roughly:
  `ffmpeg -i in.mp4 -vf scale=1280:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 -an out.webm`

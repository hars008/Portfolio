import React from 'react';
import {
  SiTypescript, SiJavascript, SiC, SiCplusplus, SiPython, SiPhp,
  SiNodedotjs, SiNestjs, SiExpress, SiDjango, SiRedis, SiJsonwebtokens,
  SiReact, SiNextdotjs, SiRedux, SiReduxsaga, SiPreact, SiTailwindcss,
  SiSass, SiBootstrap, SiMongodb, SiMysql, SiGit, SiLinux, SiPuppeteer,
  SiFigma,
} from 'react-icons/si';
// Simple Icons has dropped the AWS marks (trademark takedown); Font Awesome's
// brand set still carries a solid one that sits evenly beside the Si glyphs.
import { FaAws } from 'react-icons/fa6';
import {
  TbDatabase, TbApi, TbTopologyStar3, TbListCheck,
  TbPlugConnected, TbShieldLock, TbHierarchy2, TbPuzzle, TbBrowserCheck,
} from 'react-icons/tb';

/**
 * Skill name -> glyph, keyed on the exact string in content/skills.js.
 *
 * This mirrors the ICONS object in SocialLinks.jsx, for the same reason:
 * content/ stays plain serialisable data with no React in it, so it can keep
 * being imported by getStaticProps and the JSON-LD builder in SEO.jsx. Storing
 * an icon *name* in content/ would only look like it honoured the copy-as-data
 * rule — the string is inert and would still need a resolver here.
 *
 * Adding a skill to content/skills.js needs no edit in this file: an
 * unregistered name falls back to the neutral glyph below, at the same size,
 * so the chip keeps its glyph column and the row never looks half-finished.
 *
 * `outline: true` marks the Tabler icons. They are 2px-stroke outlines sitting
 * next to solid Simple Icons, which reads noticeably lighter at 13px, so
 * SkillChip passes strokeWidth 2.4 to even them out — react-icons spreads
 * caller props after the icon's own attributes, so the override lands.
 */

/** Stands in for anything unregistered so the chip keeps its glyph column. */
const FallbackGlyph = (props) => (
  <svg viewBox="0 0 12 12" width="13" height="13" fill="currentColor" {...props}>
    <path d="M6 2.6 9.4 6 6 9.4 2.6 6 6 2.6Z" opacity="0.75" />
  </svg>
);

const brand = (Icon) => ({ Icon, outline: false });
const concept = (Icon) => ({ Icon, outline: true });

const ICONS = {
  // Languages
  TypeScript: brand(SiTypescript),
  JavaScript: brand(SiJavascript),
  C: brand(SiC),
  'C++': brand(SiCplusplus),
  Python: brand(SiPython),
  PHP: brand(SiPhp),
  // SQL is a standard, not a product — a vendor mark here would be a lie.
  SQL: concept(TbDatabase),

  // Backend
  'Node.js': brand(SiNodedotjs),
  NestJS: brand(SiNestjs),
  'Express.js': brand(SiExpress),
  Django: brand(SiDjango),
  'REST APIs': concept(TbApi),
  Microservices: concept(TbTopologyStar3),
  Redis: brand(SiRedis),
  BullMQ: concept(TbListCheck),
  // Not SiSocketdotio: Socket.IO is a library, WebSockets is the protocol.
  WebSockets: concept(TbPlugConnected),
  JWT: brand(SiJsonwebtokens),
  RBAC: concept(TbShieldLock),

  // Frontend
  'React.js': brand(SiReact),
  'Next.js': brand(SiNextdotjs),
  Redux: brand(SiRedux),
  'Redux-Saga': brand(SiReduxsaga),
  Preact: brand(SiPreact),
  'Tailwind CSS': brand(SiTailwindcss),
  SCSS: brand(SiSass),
  Bootstrap: brand(SiBootstrap),

  // Databases & Cloud
  MongoDB: brand(SiMongodb),
  MySQL: brand(SiMysql),
  // No per-service AWS marks survive in any react-icons set, so all three use
  // the AWS wordmark — honest, rather than an unrelated pictogram.
  'AWS EC2': brand(FaAws),
  'AWS Lambda': brand(FaAws),
  'AWS Rekognition': brand(FaAws),

  // Tools & Practices
  Git: brand(SiGit),
  Linux: brand(SiLinux),
  Puppeteer: brand(SiPuppeteer),
  // Playwright's mark is gone from Simple Icons and has no substitute.
  Playwright: concept(TbBrowserCheck),
  Figma: brand(SiFigma),
  'System Design': concept(TbHierarchy2),
  'Design Patterns': concept(TbPuzzle),
};

const FALLBACK = { Icon: FallbackGlyph, outline: false };

export const skillIcon = (name) => ICONS[name] || FALLBACK;

export default ICONS;

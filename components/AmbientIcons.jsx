import React, { useEffect, useState } from 'react';
import { m, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  SiNestjs, SiNodedotjs, SiTypescript, SiRedis, SiMongodb, SiMysql,
  SiReact, SiJsonwebtokens, SiGit, SiNextdotjs,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { TbTopologyStar3, TbListCheck, TbApi } from 'react-icons/tb';
import { useMotionSafe, useMounted, usePointerFx } from '../utils/motion';

/**
 * The floating stack, for the whole page. A viewport-fixed layer that sits
 * behind all content (above the Backdrop), so the tiles come down the page
 * with you rather than staying in the hero.
 *
 *   · At the top the tiles sit in the hero's open space, clear of the copy.
 *   · Over the first screen of scroll they scatter outward from the centre.
 *   · From then on each drifts upward at its own depth-scaled speed — nearer
 *     tiles faster — and wraps off the top back in at the bottom, so there is
 *     always something slowly moving in the background.
 *   · On a mouse, every tile leans away from the cursor, nearer tiles more.
 *
 * Opaque cards naturally hide the tiles behind them, so they show in the
 * gaps, gutters and around headings. While the Skills section is on screen
 * the whole layer fades out — that section already has 39 logos of its own.
 *
 * Positions are pure functions of scroll, so they are identical scrolling
 * down or back up, and everything is transform + opacity. Not rendered under
 * reduced motion, where a layer of icons fixed over the page would be pure
 * clutter.
 */
const TILES = [
  { Icon: SiNestjs, x: 9, y: 15, depth: 1, rotate: -18, mobile: true },
  { Icon: SiRedis, x: 31, y: 11, depth: 0.55, rotate: 14 },
  { Icon: TbTopologyStar3, x: 49, y: 20, depth: 0.4, rotate: -10 },
  { Icon: SiTypescript, x: 67, y: 12, depth: 0.8, rotate: 12 },
  { Icon: SiNodedotjs, x: 90, y: 17, depth: 0.95, rotate: -14, mobile: true },
  { Icon: SiMongodb, x: 4, y: 47, depth: 0.6, rotate: 16 },
  { Icon: TbListCheck, x: 96, y: 45, depth: 0.5, rotate: -8 },
  { Icon: FaAws, x: 95, y: 74, depth: 0.85, rotate: 10, mobile: true },
  { Icon: SiReact, x: 60, y: 84, depth: 0.7, rotate: 20 },
  { Icon: SiMysql, x: 38, y: 88, depth: 0.45, rotate: -12 },
  { Icon: SiJsonwebtokens, x: 14, y: 82, depth: 0.9, rotate: 8, mobile: true },
  { Icon: TbApi, x: 81, y: 90, depth: 0.35, rotate: -6 },
  { Icon: SiGit, x: 24, y: 30, depth: 0.25, rotate: 6 },
  { Icon: SiNextdotjs, x: 77, y: 30, depth: 0.3, rotate: -4 },
];

// x/y are % of the first screen. Every y must stay within 0–100: the drift
// wraps positions into view, so a tile "below the fold" would land on top.
// CENTRE sits below the visual middle so the lower tiles fan out sideways and
// up rather than straight down.
const CENTRE = { x: 50, y: 72 };
const SCATTER = 360; // px a depth-1 tile flies outward over the first screen
const LEAN = 22; // px a depth-1 tile leans away from the cursor

const wrap = (v, min, max) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Tile = ({ tile, index, scrollY, view, mx, my }) => {
  const { Icon, depth } = tile;
  const size = Math.round(36 + depth * 22); // 42–58px

  const dx = tile.x - CENTRE.x;
  const dy = tile.y - CENTRE.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const reach = SCATTER * (0.45 + depth * 0.55);
  const rise = 0.12 + depth * 0.3; // share of scroll speed it drifts up at

  const x = useTransform([scrollY, mx, view], ([sy, cx, v]) => {
    const s = Math.min(1, sy / v.h);
    if (v.narrow) {
      // Phones: parked half off the edge, with a small sway.
      const base = tile.x < 50 ? -size * 0.45 : v.w - size * 0.55;
      return base + Math.sin(sy / 420 + index) * 5;
    }
    const scattered = (tile.x / 100) * v.w + ux * reach * s;
    // Each tile stops at its own distance from the edge, so the ones that
    // scatter hardest do not all pile up on the same clamp line.
    const pad = v.w * (0.025 + (index % 4) * 0.022);
    const clamped = Math.min(v.w - pad, Math.max(pad, scattered));
    const sway = Math.sin(sy / 650 + index * 1.7) * 36 * depth * s;
    return clamped - size / 2 + sway - cx * LEAN * depth;
  });

  const y = useTransform([scrollY, my, view], ([sy, cy, v]) => {
    const s = Math.min(1, sy / v.h);
    const home = (tile.y / 100) * v.h + uy * reach * s;
    // Wrap bounds sit fully off-screen, so the jump is never seen.
    return wrap(home - sy * rise, -size * 1.5, v.h + size * 0.5) - size / 2 - cy * LEAN * depth;
  });

  const rotate = useTransform([scrollY, view], ([sy, v]) => tile.rotate * (0.4 + (sy / v.h) * 1.1));
  const scale = useTransform([scrollY, view], ([sy, v]) => 1 + Math.min(1, sy / v.h) * 0.25 * depth);

  return (
    <m.span
      style={{ x, y, rotate, scale }}
      className={`absolute left-0 top-0 ${tile.mobile ? '' : 'hidden sm:block'}`}
    >
      <span
        className="float-tile float-tile-free"
        style={{
          width: size,
          height: size,
          opacity: 0.22 + depth * 0.33,
          '--pop-delay': `${0.7 + index * 0.06}s`,
          '--bob-delay': `${-index * 0.8}s`,
          '--bob-dur': `${5.5 + (index % 4)}s`,
        }}
      >
        <Icon focusable="false" style={{ width: size * 0.44, height: size * 0.44 }} />
      </span>
    </m.span>
  );
};

const Layer = () => {
  const pointer = usePointerFx();
  const [muted, setMuted] = useState(false);

  const { scrollY: rawScroll } = useScroll();
  const scrollY = useSpring(rawScroll, { stiffness: 120, damping: 28, mass: 0.6, restDelta: 0.5 });

  const view = useMotionValue({ w: 1440, h: 900, narrow: false });
  useEffect(() => {
    const measure = () => view.set({
      w: window.innerWidth,
      h: window.innerHeight,
      narrow: window.innerWidth < 640,
    });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [view]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (!pointer) return undefined;
    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointer, rawX, rawY]);

  // Fade out while Skills holds the middle of the screen.
  useEffect(() => {
    const skills = document.getElementById('skills');
    if (!skills) return undefined;
    const io = new IntersectionObserver(([entry]) => setMuted(entry.isIntersecting), {
      rootMargin: '-25% 0px -25% 0px',
    });
    io.observe(skills);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-[5] overflow-hidden transition-opacity duration-700 ${
        muted ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {TILES.map((tile, i) => (
        <Tile
          key={`${tile.x}-${tile.y}`}
          tile={tile}
          index={i}
          scrollY={scrollY}
          view={view}
          mx={mx}
          my={my}
        />
      ))}
    </div>
  );
};

/** Client-only: it reads the viewport, and it is decoration, so SSR gains nothing. */
const AmbientIcons = () => {
  const mounted = useMounted();
  const safe = useMotionSafe();
  return mounted && safe ? <Layer /> : null;
};

export default AmbientIcons;

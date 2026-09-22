import React, { useEffect, useRef } from 'react';
import { useMotionSafe } from '../utils/motion';

/**
 * The hero's ambient graphic: a drifting graph of service nodes with data
 * packets hopping along the edges — the site is about microservices, so the
 * decoration is one. The cursor draws links to nearby nodes.
 *
 * Cost control, since this is the only per-frame JS on the page:
 *   · the loop runs only while the canvas is on screen AND the tab is visible
 *   · DPR is capped at 2 and node count scales with area (fewer on touch)
 *   · under reduced motion a single static frame is drawn and nothing loops
 *
 * Colours are read from the --accent tokens, so retuning the palette in
 * globals.css retunes this too.
 */
const LINK = 150;
const POINTER_LINK = 190;
const MAX_PACKETS = 16;

const hexToRgb = (hex) => {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  return m ? m.slice(1).map((h) => parseInt(h, 16)) : null;
};

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

const NetworkCanvas = ({ className = '' }) => {
  const ref = useRef(null);
  const safe = useMotionSafe();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return undefined;

    const root = getComputedStyle(document.documentElement);
    const A = hexToRgb(root.getPropertyValue('--accent').trim()) || [34, 211, 238];
    const B = hexToRgb(root.getPropertyValue('--accent-2').trim()) || [129, 140, 248];
    const fine = window.matchMedia('(pointer: fine)').matches;

    let w = 0;
    let h = 0;
    let nodes = [];
    let packets = [];
    let raf = 0;
    let onScreen = true;
    const pointer = { cx: -1e4, cy: -1e4 };

    const seed = () => {
      const density = fine ? 15000 : 26000;
      const count = Math.max(18, Math.min(72, Math.round((w * h) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.1 + 0.9,
        hub: Math.random() < 0.12,
        phase: Math.random() * Math.PI * 2,
        color: mix(A, B, Math.random()),
      }));
      packets = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const widthChanged = Math.abs(rect.width - w) > 1;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // A height-only change (mobile URL bar) keeps the graph where it was.
      if (widthChanged || !nodes.length) seed();
    };

    const neighbours = (node, except) => nodes.filter((o) => {
      if (o === node || o === except) return false;
      const dx = o.x - node.x;
      const dy = o.y - node.y;
      return dx * dx + dy * dy < LINK * LINK;
    });

    const spawn = () => {
      const from = nodes[(Math.random() * nodes.length) | 0];
      const options = neighbours(from);
      if (!options.length) return;
      packets.push({
        a: from,
        b: options[(Math.random() * options.length) | 0],
        p: 0,
        speed: 0.008 + Math.random() * 0.012,
        hops: 2 + ((Math.random() * 4) | 0),
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      const rect = canvas.getBoundingClientRect();
      const px = pointer.cx - rect.left;
      const py = pointer.cy - rect.top;

      // Edges.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const o = nodes[j];
          const dx = n.x - o.x;
          const dy = n.y - o.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.11;
            ctx.strokeStyle = rgba(n.color, alpha);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }

        // Cursor links.
        const pdx = n.x - px;
        const pdy = n.y - py;
        const pd2 = pdx * pdx + pdy * pdy;
        n.near = pd2 < POINTER_LINK * POINTER_LINK ? 1 - Math.sqrt(pd2) / POINTER_LINK : 0;
        if (n.near) {
          ctx.strokeStyle = rgba(A, n.near * 0.28);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      // Nodes.
      nodes.forEach((n) => {
        const glow = n.near || 0;
        ctx.fillStyle = rgba(n.color, 0.28 + glow * 0.5);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow * 1.4, 0, Math.PI * 2);
        ctx.fill();

        if (n.hub) {
          const pulse = (Math.sin(t / 900 + n.phase) + 1) / 2;
          ctx.strokeStyle = rgba(n.color, 0.07 + pulse * 0.13);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4 + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Packets: a soft halo, a short trail, and a bright core.
      packets.forEach((k) => {
        const x = k.a.x + (k.b.x - k.a.x) * k.p;
        const y = k.a.y + (k.b.y - k.a.y) * k.p;
        const tp = Math.max(0, k.p - 0.18);
        const tx = k.a.x + (k.b.x - k.a.x) * tp;
        const ty = k.a.y + (k.b.y - k.a.y) * tp;

        const trail = ctx.createLinearGradient(tx, ty, x, y);
        trail.addColorStop(0, rgba(A, 0));
        trail.addColorStop(1, rgba(A, 0.5));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = rgba(A, 0.08);
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(240,253,255,0.7)';
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const step = () => {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      });

      if (packets.length < MAX_PACKETS && Math.random() < 0.06) spawn();

      packets = packets.filter((k) => {
        k.p += k.speed;
        if (k.p < 1) return true;
        // Arrived: hop onward to a different neighbour, or retire.
        k.hops -= 1;
        const next = k.hops > 0 ? neighbours(k.b, k.a) : [];
        if (!next.length) return false;
        k.a = k.b;
        k.b = next[(Math.random() * next.length) | 0];
        k.p = 0;
        return true;
      });
    };

    const loop = (t) => {
      step();
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf && safe && onScreen && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(0);

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const onPointer = (e) => {
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
    };
    const onLeave = () => {
      pointer.cx = -1e4;
      pointer.cy = -1e4;
    };
    if (fine && safe) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [safe]);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
};

export default NetworkCanvas;

'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mobile check — skip rendering logic
    if (window.matchMedia('(max-width: 800px)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('has-custom-cursor');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const LERP = reducedMotion ? 1 : 0.16;

    const HOT_SELECTOR = 'a, button, input, textarea, [role="button"], [data-hot]';

    function tick() {
      // Dot snaps instantly
      dot!.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;

      // Ring lerps
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;
      ring!.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

      rafId = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check element under cursor for hot state
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && el.closest(HOT_SELECTOR)) {
        ring!.classList.add('hot');
      } else {
        ring!.classList.remove('hot');
      }
    }

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

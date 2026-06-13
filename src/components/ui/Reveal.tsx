'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode, ElementType, CSSProperties } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Element to render (defaults to div). */
  as?: ElementType;
  style?: CSSProperties;
};

/**
 * Gentle fade + slide-up on scroll via IntersectionObserver, toggling the
 * `.reveal` / `.reveal.in` classes defined in globals.css. Respects
 * prefers-reduced-motion (and that media query is also handled in CSS).
 * A timeout fallback guarantees content shows even if the observer never fires.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as,
  style,
}: RevealProps) {
  const Tag = (as || 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);

    const fallback = setTimeout(() => setShown(true), 1500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', shown && 'in', className)}
      style={{
        transitionDelay: delay ? `${delay}s` : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

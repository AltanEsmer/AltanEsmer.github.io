'use client';

import { useEffect, useRef } from 'react';

export default function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('in');
          }
        });
      },
      { threshold: 0.1 },
    );

    const revealEls = wrapper.querySelectorAll<HTMLElement>('.reveal');
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.05}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}

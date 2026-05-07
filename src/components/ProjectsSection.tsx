'use client';

import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/lib/projects-static';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters, { type Filter } from '@/components/ProjectFilters';

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = PROJECTS.filter(
    (p) => filter === 'all' || p.tags.includes(filter as 'fe' | 'be' | 'ds' | 'oss'),
  );

  // IntersectionObserver to trigger .reveal → .reveal.in
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

    const revealEls = section.querySelectorAll<HTMLElement>('.reveal');
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.05}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filter]);

  return (
    <>
      {/* Responsive collapse styles for bento spans */}
      <style>{`
        @media (max-width: 1000px) {
          .c-2x2, .c-2x1, .c-1x1, .c-1x2 {
            grid-column: span 2 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 640px) {
          #projects { padding: 60px 0 !important; }
          #projects .bento {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 180px !important;
            gap: 14px !important;
          }
          #projects .c-2x2, #projects .c-2x1, #projects .c-1x1, #projects .c-1x2 {
            grid-column: span 2 !important;
          }
          #projects .projects-head {
            flex-direction: column !important;
            align-items: stretch !important;
            margin-bottom: 28px !important;
          }
        }
      `}</style>

      <section
        id="projects"
        className="projects"
        ref={sectionRef}
        style={{ padding: '100px 0' }}
      >
        <div className="wrap">
          {/* Section head */}
          <div className="section-head reveal">
            <span className="num">02 //</span>
            <span>recent_work.json</span>
            <span className="line" />
            <span>{filtered.length} entries</span>
          </div>

          {/* Projects head: title + filters */}
          <div
            className="projects-head reveal"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
              marginBottom: '48px',
              flexWrap: 'wrap',
            }}
          >
            <h2
              className="projects-title"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                margin: 0,
                color: 'var(--text)',
              }}
            >
              Things I&apos;ve shipped{' '}
              <span style={{ color: 'var(--magenta)' }}>recently.</span>
            </h2>
            <ProjectFilters value={filter} onChange={setFilter} />
          </div>

          {/* Bento grid */}
          <div
            className="bento"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '18px',
              gridAutoRows: '200px',
            }}
          >
            {filtered.map((project) => (
              <ProjectCard
                key={project.num}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

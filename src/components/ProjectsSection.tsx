'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/projects-static';
import generated from '@/lib/projects.generated.json';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters, { type Filter } from '@/components/ProjectFilters';

interface GeneratedRepo {
  language: string | null;
  pushedAt: string;
}

function relativeShipped(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const days = Math.max(0, Math.round((now - then) / 86400000));
  if (days <= 1) return 'today';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = PROJECTS.filter(
    (p) => filter === 'all' || p.tags.includes(filter as 'fe' | 'be' | 'ds' | 'oss'),
  );

  const stats = useMemo(() => {
    const repos = generated.repos as GeneratedRepo[];
    const languages = new Set(repos.map((r) => r.language).filter(Boolean));
    const latest = repos.reduce(
      (acc, r) => (r.pushedAt > acc ? r.pushedAt : acc),
      '0',
    );
    return {
      shipped: PROJECTS.length,
      repos: repos.length,
      languages: languages.size,
      lastShipped: latest === '0' ? '—' : relativeShipped(latest),
    };
  }, []);

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

  const statTiles: { value: string | number; label: string }[] = [
    { value: stats.shipped, label: 'Projects shipped' },
    { value: stats.repos, label: 'Active repos' },
    { value: stats.languages, label: 'Languages' },
    { value: stats.lastShipped, label: 'Last shipped' },
  ];

  return (
    <>
      {/* Responsive collapse styles for bento spans */}
      <style>{`
        @media (max-width: 1000px) {
          .c-2x2, .c-2x1, .c-1x1, .c-1x2 {
            grid-column: span 2 !important;
            grid-row: span 1 !important;
          }
          #projects .stats-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #projects { padding: 72px 0 !important; }
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
          #projects .projects-foot {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          #projects .projects-lede {
            font-size: 15px !important;
          }
        }
      `}</style>

      <section
        id="projects"
        className="projects"
        ref={sectionRef}
        style={{ padding: '140px 0' }}
      >
        <div className="wrap">
          {/* Section head */}
          <div className="section-head reveal">
            <span className="num">02 //</span>
            <span>recent_work.json</span>
            <span className="line" />
            <span>{filtered.length} entries</span>
          </div>

          {/* Title block: title + lede */}
          <div className="reveal" style={{ marginBottom: '40px', maxWidth: '780px' }}>
            <h2
              className="projects-title"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.6rem, 5.4vw, 4.8rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                margin: '0 0 20px',
                color: 'var(--text)',
              }}
            >
              Things I&apos;ve shipped{' '}
              <span style={{ color: 'var(--magenta)' }}>recently.</span>
            </h2>
            <p
              className="projects-lede"
              style={{
                fontSize: '17px',
                lineHeight: 1.55,
                color: 'var(--muted)',
                margin: 0,
                maxWidth: '640px',
              }}
            >
              A working portfolio of production deploys, side projects, and open-source
              experiments — the things I&apos;ve actually pushed to{' '}
              <span style={{ color: 'var(--text)' }}>main</span>. Updated automatically
              from GitHub, curated by hand.
            </p>
          </div>

          {/* Stats strip */}
          <div
            className="stats-strip reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '48px',
            }}
          >
            {statTiles.map((tile) => (
              <div
                key={tile.label}
                style={{
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '24px',
                    color: 'var(--text)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {tile.value}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: 'var(--dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {tile.label}
                </div>
              </div>
            ))}
          </div>

          {/* Filters row */}
          <div
            className="projects-head reveal"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'var(--dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {'// filter by stack'}
            </div>
            <ProjectFilters value={filter} onChange={setFilter} />
          </div>

          {/* Bento grid */}
          <div
            className="bento"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '20px',
              gridAutoRows: '220px',
            }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.num} project={project} />
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="projects-foot reveal"
            style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'var(--dim)',
              }}
            >
              {`// showing ${filtered.length} of ${PROJECTS.length} — full archive available`}
            </div>
            <Link
              href="/projects"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: 'var(--text)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                border: '1px solid var(--line)',
                borderRadius: '999px',
                transition: 'border-color .25s, color .25s, background .25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--magenta)';
                e.currentTarget.style.color = 'var(--magenta)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.color = 'var(--text)';
              }}
            >
              View all projects
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

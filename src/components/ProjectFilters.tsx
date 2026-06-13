'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  role?: string;
  year: string;
  tags: string[];
};

type ProjectFiltersProps = {
  projects: ProjectItem[];
};

const CATS = ['All', 'Web', 'Mobile', 'Desktop', 'Tools'] as const;
type Category = (typeof CATS)[number];

export default function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [active, setActive] = useState<Category>('All');

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter chip row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 30,
        }}
      >
        {CATS.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontSize: 13.5,
                fontWeight: 500,
                padding: '7px 15px',
                borderRadius: 999,
                cursor: 'pointer',
                transition: 'all .2s ease',
                border: isActive
                  ? '1px solid var(--blue)'
                  : '1px solid var(--border-strong)',
                background: isActive ? 'var(--blue)' : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--secondary)',
                fontFamily: 'inherit',
                lineHeight: 1,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Project grid — no Reveal so re-filtered cards are immediately visible */}
      <div
        style={{
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          marginTop: 24,
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} showRole />
          ))
        ) : (
          <p style={{ color: 'var(--muted)', fontSize: 15 }}>
            No projects in this category yet.
          </p>
        )}
      </div>
    </>
  );
}

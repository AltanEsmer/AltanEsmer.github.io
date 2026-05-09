import { getAllContent } from '@/lib/content';
import MdxProjectCard from '@/components/MdxProjectCard';
import RevealOnScroll from '@/components/RevealOnScroll';

export const metadata = {
  title: 'Projects — Altan Esmer',
  description: 'A collection of projects I have built or contributed to.',
};

export default function ProjectsPage() {
  const projects = getAllContent('projects');

  return (
    <section style={{ padding: '80px 0 100px' }}>
      <div className="wrap">
        {/* Section head */}
        <div className="section-head reveal">
          <span className="num">02 //</span>
          <span>all_projects.json</span>
          <span className="line" />
          <span>{projects.length} entries</span>
        </div>

        {/* Hero title */}
        <h1
          className="reveal"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            margin: '0 0 48px',
            color: 'var(--text)',
          }}
        >
          All the work I&apos;ve{' '}
          <span style={{ color: 'var(--magenta)' }}>shipped.</span>
        </h1>

        <RevealOnScroll>
          {projects.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
              }}
              className="projects-grid"
            >
              {projects.map((item, i) => (
                <MdxProjectCard
                  key={item.slug}
                  slug={item.slug}
                  frontmatter={item.frontmatter}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)' }}>No projects yet. Check back soon.</p>
          )}
        </RevealOnScroll>

        {/* Responsive: collapse to 1 col on mobile */}
        <style>{`
          @media (max-width: 720px) {
            .projects-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

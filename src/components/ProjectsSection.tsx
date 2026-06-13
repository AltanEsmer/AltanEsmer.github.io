import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Kicker from '@/components/ui/Kicker';
import ProjectCard from '@/components/ui/ProjectCard';
import { getAllContent, getYear } from '@/lib/content';

export default function ProjectsSection() {
  const featured = getAllContent('projects').filter((p) => p.frontmatter.featured);

  return (
    <section style={{ padding: '52px 28px' }}>
      <div className="wrap" style={{ padding: 0 }}>
        {/* Header row */}
        <Reveal
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Kicker>Selected work</Kicker>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(26px, 3vw, 34px)',
                letterSpacing: '-0.01em',
                margin: '10px 0 0',
                color: 'var(--ink)',
              }}
            >
              Featured projects
            </h2>
          </div>
          <Link href="/projects" className="link-blue">
            All projects →
          </Link>
        </Reveal>

        {/* Projects grid */}
        <Reveal
          style={{
            display: 'grid',
            gap: 20,
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            marginTop: 28,
          }}
        >
          {featured.map((p) => (
            <ProjectCard
              key={p.slug}
              project={{
                slug: p.slug,
                title: p.frontmatter.title,
                description: p.frontmatter.description,
                category: p.frontmatter.category,
                role: p.frontmatter.role,
                year: getYear(p.frontmatter.date),
                tags: p.frontmatter.tags,
              }}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

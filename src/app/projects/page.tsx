import { getAllContent, getYear } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';
import Kicker from '@/components/ui/Kicker';
import ProjectFilters from '@/components/ProjectFilters';

export const metadata = {
  title: 'Work — Altan Esmer',
  description:
    "A selection of things I've designed and built — apps, tools, and experiments across web, mobile, and desktop.",
};

export default function ProjectsPage() {
  const projects = getAllContent('projects').map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    category: p.frontmatter.category ?? 'Project',
    role: p.frontmatter.role,
    year: getYear(p.frontmatter.date),
    tags: p.frontmatter.tags ?? [],
  }));

  return (
    <section>
      <div className="wrap" style={{ padding: '52px 28px 76px' }}>
        <Reveal>
          <Kicker>Portfolio</Kicker>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(34px,4.5vw,52px)',
              letterSpacing: '-0.02em',
              margin: '10px 0 0',
              color: 'var(--ink)',
            }}
          >
            Work
          </h1>
          <p
            style={{
              fontSize: 'clamp(17px,1.6vw,20px)',
              lineHeight: 1.6,
              color: 'var(--secondary)',
              maxWidth: 560,
              margin: '16px 0 0',
            }}
          >
            A selection of things I&apos;ve designed and built — apps, tools,
            and experiments across web, mobile, and desktop.
          </p>
        </Reveal>

        <ProjectFilters projects={projects} />
      </div>
    </section>
  );
}

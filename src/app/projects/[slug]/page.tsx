import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllSlugs,
  getContentBySlug,
  getAdjacentContent,
  getAllContent,
} from '@/lib/content';
import ProjectNavigation from '@/components/ProjectNavigation';

export function generateStaticParams() {
  return getAllSlugs('projects').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const item = getContentBySlug('projects', params.slug);
  if (!item) return {};
  return {
    title: `${item.frontmatter.title} — Altan Esmer`,
    description: item.frontmatter.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getContentBySlug('projects', params.slug);
  if (!item) notFound();

  const all = getAllContent('projects');
  const idx = all.findIndex((p) => p.slug === params.slug);
  const num = String(idx + 1).padStart(2, '0');
  const { prev, next } = getAdjacentContent('projects', params.slug);

  const { default: MDXContent } = await import(
    `../../../../content/projects/${params.slug}.mdx`
  );

  const date = new Date(item.frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section style={{ padding: '60px 0 100px' }}>
      <div className="wrap" style={{ maxWidth: 920 }}>
        {/* Back link */}
        <Link
          href="/projects"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: 'var(--muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 32,
            transition: 'color .2s',
          }}
        >
          ← back to projects
        </Link>

        {/* Section head */}
        <div className="section-head" style={{ marginBottom: 24 }}>
          <span className="num">{num} {'//'}</span>
          <span>{params.slug}.mdx</span>
          <span className="line" />
          <span>{date}</span>
        </div>

        {/* Hero */}
        <header style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 16px',
              color: 'var(--text)',
            }}
          >
            {item.frontmatter.title}
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--muted)',
              margin: '0 0 20px',
              maxWidth: 720,
            }}
          >
            {item.frontmatter.description}
          </p>
          {item.frontmatter.tags && item.frontmatter.tags.length > 0 && (
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 7,
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {item.frontmatter.tags.map((tag) => (
                <li key={tag}>
                  <span className="chip">{tag}</span>
                </li>
              ))}
            </ul>
          )}
        </header>

        {/* Gradient separator */}
        <div
          style={{
            height: 1,
            background: 'var(--grad-soft)',
            opacity: 0.6,
            margin: '0 0 40px',
          }}
        />

        {/* MDX body */}
        <article className="prose-mdx">
          <MDXContent />
        </article>

        {/* Prev/Next navigation */}
        <ProjectNavigation prev={prev} next={next} />

        {/* All projects link */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link
            href="/projects"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              gap: 8,
              transition: 'color .2s',
            }}
          >
            all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllSlugs,
  getContentBySlug,
  getAdjacentContent,
  getYear,
} from '@/lib/content';
import Reveal from '@/components/ui/Reveal';
import Tag from '@/components/ui/Tag';
import ArticleNav from '@/components/ui/ArticleNav';

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

  const { prev, next } = getAdjacentContent('projects', params.slug);

  const { default: MDXContent } = await import(
    `../../../../content/projects/${params.slug}.mdx`
  );

  const year = getYear(item.frontmatter.date);

  return (
    <article style={{ maxWidth: 760, margin: '0 auto', padding: '44px 28px 76px' }}>
      {/* Back link */}
      <Link
        href="/projects"
        className="article-nav-link"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--muted)',
          textDecoration: 'none',
        }}
      >
        ← All projects
      </Link>

      {/* Header meta + title + blurb + tags */}
      <Reveal delay={0.05}>
        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: 'center',
            fontSize: 13,
            color: 'var(--muted)',
            marginTop: 22,
          }}
        >
          <span
            style={{
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--amber)',
            }}
          >
            {item.frontmatter.category ?? 'Project'}
          </span>
          <span>·</span>
          <span>{year}</span>
          <span>·</span>
          <span>{item.frontmatter.role ?? 'Solo project'}</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 5vw, 52px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: '14px 0 0',
            color: 'var(--ink)',
          }}
        >
          {item.frontmatter.title}
        </h1>

        {/* Blurb */}
        <p
          style={{
            fontSize: 'clamp(18px, 1.8vw, 21px)',
            lineHeight: 1.55,
            color: 'var(--secondary)',
            margin: '18px 0 0',
          }}
        >
          {item.frontmatter.description}
        </p>

        {/* Tags */}
        {item.frontmatter.tags && item.frontmatter.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 7,
              marginTop: 20,
            }}
          >
            {item.frontmatter.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </Reveal>

      {/* Preview placeholder */}
      <Reveal delay={0.1}>
        <div
          style={{
            margin: '32px 0',
            height: 300,
            borderRadius: 14,
            background: 'var(--placeholder)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--faint)',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Project preview
        </div>
      </Reveal>

      {/* MDX body */}
      <Reveal delay={0.15}>
        <div className="prose-mdx">
          <MDXContent />
        </div>
      </Reveal>

      {/* Prev / Next navigation */}
      <ArticleNav prev={prev} next={next} basePath="/projects" />
    </article>
  );
}

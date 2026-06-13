import { notFound } from 'next/navigation';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import ArticleNav from '@/components/ui/ArticleNav';
import { getAllSlugs, getContentBySlug, getAdjacentContent } from '@/lib/content';

export function generateStaticParams() {
  return getAllSlugs('posts').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getContentBySlug('posts', params.slug);
  if (!item) return {};
  return {
    title: `${item.frontmatter.title} — Altan Esmer`,
    description: item.frontmatter.description,
  };
}

function formatMonthYear(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function estimateReadTime(body: string, readingTime?: string): string {
  if (readingTime) return readingTime;
  return `${Math.max(1, Math.round(body.trim().split(/\s+/).length / 200))} min read`;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const item = getContentBySlug('posts', params.slug);
  if (!item) notFound();

  const { prev, next } = getAdjacentContent('posts', params.slug);

  const { default: MDXContent } = await import(
    `../../../../content/posts/${params.slug}.mdx`
  );

  const fm = item.frontmatter;
  const tag = fm.tags && fm.tags.length > 0 ? fm.tags[0] : null;
  const readTime = estimateReadTime(item.body, fm.readingTime);
  const date = formatMonthYear(fm.date);

  return (
    <article style={{ maxWidth: 720, margin: '0 auto', padding: '44px 28px 76px' }}>
      {/* Back link */}
      <Link
        href="/blog"
        className="article-nav-link"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--muted)',
          textDecoration: 'none',
        }}
      >
        ← All posts
      </Link>

      <Reveal>
        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            fontSize: 13,
            color: 'var(--muted)',
            marginTop: 22,
          }}
        >
          <span>{date}</span>
          <span>·</span>
          <span>{readTime}</span>
          {tag && (
            <>
              <span>·</span>
              <span
                style={{
                  color: 'var(--amber)',
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 5vw, 50px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '14px 0 0',
            color: 'var(--ink)',
          }}
        >
          {fm.title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(18px, 1.8vw, 21px)',
            lineHeight: 1.55,
            color: 'var(--secondary)',
            margin: '18px 0 0',
          }}
        >
          {fm.description}
        </p>
      </Reveal>

      {/* Body */}
      <Reveal>
        <div className="prose-mdx" style={{ marginTop: 8 }}>
          <MDXContent />
        </div>
      </Reveal>

      {/* Prev / Next navigation */}
      <ArticleNav prev={prev} next={next} basePath="/blog" />
    </article>
  );
}

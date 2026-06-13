import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Kicker from '@/components/ui/Kicker';
import { getAllContent } from '@/lib/content';

export const metadata = {
  title: 'Writing — Altan Esmer',
  description:
    "Occasional notes on engineering, performance, accessibility, and whatever I'm building.",
};

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

export default function BlogPage() {
  const posts = getAllContent('posts');

  return (
    <section style={{ maxWidth: 780, margin: '0 auto', padding: '52px 28px 76px' }}>
      <Reveal>
        <Kicker>Writing</Kicker>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 4.5vw, 52px)',
            letterSpacing: '-0.02em',
            margin: '10px 0 0',
            color: 'var(--ink)',
          }}
        >
          Blog
        </h1>
        <p
          style={{
            fontSize: 'clamp(17px, 1.6vw, 20px)',
            lineHeight: 1.6,
            color: 'var(--secondary)',
            maxWidth: 540,
            margin: '16px 0 0',
          }}
        >
          Occasional notes on engineering, performance, accessibility, and whatever I&apos;m
          building.
        </p>
      </Reveal>

      <Reveal>
        <div
          style={{
            marginTop: 32,
            borderTop: '1px solid var(--border-light)',
          }}
        >
          {posts.map((p) => {
            const fm = p.frontmatter;
            const tag = fm.tags && fm.tags.length > 0 ? fm.tags[0] : null;
            const readTime = estimateReadTime(p.body, fm.readingTime);
            const date = formatMonthYear(fm.date);

            return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="article-nav-link"
                style={{
                  display: 'block',
                  padding: '24px 0',
                  borderBottom: '1px solid var(--border-light)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  transition: 'color 0.2s',
                }}
              >
                {/* Meta row */}
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    fontSize: 12.5,
                    color: 'var(--muted)',
                    marginBottom: 8,
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
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tag}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    fontSize: 24,
                    lineHeight: 1.25,
                    margin: 0,
                    color: 'inherit',
                  }}
                >
                  {fm.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: 'var(--secondary)',
                    margin: '8px 0 0',
                  }}
                >
                  {fm.description}
                </p>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

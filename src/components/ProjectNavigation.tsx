import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

type Props = { prev: ContentItem | null; next: ContentItem | null };

export default function ProjectNavigation({ prev, next }: Props) {
  return (
    <>
      <nav
        className="project-nav"
        style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: '1px solid var(--line)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="bento-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              padding: 20,
              borderRadius: 14,
              background: 'rgba(26,27,58,.6)',
              border: '1px solid var(--line)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform .25s, border-color .25s',
              minHeight: 100,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'var(--dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              ← previous
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                color: 'var(--text)',
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              {prev.frontmatter.title}
            </div>
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="bento-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              padding: 20,
              borderRadius: 14,
              background: 'rgba(26,27,58,.6)',
              border: '1px solid var(--line)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform .25s, border-color .25s',
              minHeight: 100,
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'var(--dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              next →
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                color: 'var(--text)',
                fontWeight: 600,
              }}
            >
              {next.frontmatter.title}
            </div>
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}
      </nav>
      <style>{`
        @media (max-width: 640px) {
          .project-nav { grid-template-columns: 1fr !important; }
        }
        .project-nav a:hover { transform: translateY(-2px); border-color: rgba(232,234,246,.2); }
      `}</style>
    </>
  );
}

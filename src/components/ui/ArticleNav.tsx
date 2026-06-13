import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

type ArticleNavProps = {
  prev: ContentItem | null;
  next: ContentItem | null;
  /** Route base, e.g. "/projects" or "/blog". */
  basePath: string;
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 18,
  fontWeight: 600,
  marginTop: 3,
  color: 'inherit',
};

/** Previous / next navigation shared by case studies and blog posts. */
export default function ArticleNav({ prev, next, basePath }: ArticleNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        borderTop: '1px solid var(--border-light)',
        marginTop: 44,
        paddingTop: 24,
        flexWrap: 'wrap',
      }}
    >
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className="article-nav-link"
          style={{ maxWidth: '46%', textDecoration: 'none', color: 'var(--ink)' }}
        >
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>← Previous</div>
          <div style={titleStyle}>{prev.frontmatter.title}</div>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={`${basePath}/${next.slug}`}
          className="article-nav-link"
          style={{
            maxWidth: '46%',
            marginLeft: 'auto',
            textAlign: 'right',
            textDecoration: 'none',
            color: 'var(--ink)',
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Next →</div>
          <div style={titleStyle}>{next.frontmatter.title}</div>
        </Link>
      )}
    </nav>
  );
}

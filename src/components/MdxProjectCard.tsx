import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

type Props = Pick<ContentItem, 'slug' | 'frontmatter'> & { index: number };

const PV_GRADS = [
  'pv-grad-1',
  'pv-grad-2',
  'pv-grad-3',
  'pv-grad-4',
  'pv-grad-5',
  'pv-grad-6',
  'pv-grad-7',
] as const;

export default function MdxProjectCard({ slug, frontmatter, index }: Props) {
  const preview = PV_GRADS[index % PV_GRADS.length];
  const date = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <Link
      href={`/projects/${slug}`}
      className="card bento-card reveal"
      style={{
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        background: 'rgba(26,27,58,.6)',
        border: '1px solid var(--line)',
        padding: '28px',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform .35s cubic-bezier(.2,.7,.2,1), border-color .25s',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Background gradient */}
      <div
        className={`preview ${preview}`}
        style={{ position: 'absolute', inset: 0, opacity: 0.85, zIndex: 0 }}
      >
        <div className="pv-grid" />
      </div>

      {/* Scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(10,14,39,0) 30%, rgba(10,14,39,.85) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Top row: date + arrow */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--dim)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{date}</span>
          <span style={{ color: 'var(--magenta)' }}>→</span>
        </div>

        {/* Bottom block */}
        <div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '24px',
              letterSpacing: '-0.02em',
              margin: '0 0 8px',
              color: 'var(--text)',
            }}
          >
            {frontmatter.title}
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {frontmatter.description}
          </p>
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '7px',
                marginTop: '14px',
              }}
            >
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

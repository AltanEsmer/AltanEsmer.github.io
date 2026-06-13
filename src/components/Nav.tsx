'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const isWorkActive = pathname.startsWith('/projects');
  const isWritingActive = pathname.startsWith('/blog');
  const isAboutActive = pathname.startsWith('/about');

  return (
    <header className="site-header">
      <div
        className="wrap"
        style={{
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 18,
          flexWrap: 'wrap',
        }}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 11,
            textDecoration: 'none',
            color: 'var(--ink)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Altan Esmer
          </span>
          <span
            style={{
              fontSize: 12.5,
              color: 'var(--muted)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              borderLeft: '1px solid #ddd6c9',
              paddingLeft: 11,
            }}
          >
            Software Engineer
          </span>
        </Link>

        {/* Right: nav links + CTA */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          <Link href="/projects" className="nav-link">
            Work
            {isWorkActive && <span className="nav-underline" />}
          </Link>

          <Link href="/blog" className="nav-link">
            Writing
            {isWritingActive && <span className="nav-underline" />}
          </Link>

          <Link href="/about" className="nav-link">
            About
            {isAboutActive && <span className="nav-underline" />}
          </Link>

          <Link href="/contact" className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}

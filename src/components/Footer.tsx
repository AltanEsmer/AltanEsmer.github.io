import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      {/* Main footer body */}
      <div
        className="wrap"
        style={{
          padding: '48px 28px 28px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 40,
          justifyContent: 'space-between',
        }}
      >
        {/* Left block */}
        <div style={{ flex: '1 1 320px', maxWidth: 360 }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            Altan Esmer
          </span>
          <p
            style={{
              fontSize: 14.5,
              color: 'var(--secondary)',
              lineHeight: 1.6,
              marginTop: 10,
              marginBottom: 0,
            }}
          >
            Full-stack software engineer building reliable, accessible software across web, mobile,
            and desktop.
          </p>
          {/* Open to work pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 14,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--secondary)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--green)',
                flexShrink: 0,
              }}
            />
            Open to work · Replies in &lt; 24h
          </div>
        </div>

        {/* Right: two link columns */}
        <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          {/* Pages column */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: 12,
              }}
            >
              Pages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/projects" className="footer-link">
                Work
              </Link>
              <Link href="/blog" className="footer-link">
                Writing
              </Link>
              <Link href="/about" className="footer-link">
                About
              </Link>
              <Link href="/contact" className="footer-link">
                Contact
              </Link>
            </div>
          </div>

          {/* Elsewhere column */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: 12,
              }}
            >
              Elsewhere
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href="mailto:esmeraltan@gmail.com" className="footer-link">
                Email
              </a>
              <a
                href="https://github.com/AltanEsmer"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="wrap"
        style={{
          padding: '18px 28px',
          borderTop: '1px solid var(--divider)',
          fontSize: 13,
          color: 'var(--faint)',
        }}
      >
        © 2026 Altan Esmer · Built with care
      </div>
    </footer>
  );
}

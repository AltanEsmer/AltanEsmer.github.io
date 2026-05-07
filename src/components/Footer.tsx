'use client';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '60px 0 40px',
        borderTop: '1px solid var(--line)',
        marginTop: '60px',
      }}
    >
      <div className="wrap">
        {/* Three-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr',
            gap: '32px',
          }}
          className="foot-grid"
        >
          {/* Col 1: ASCII art */}
          <div>
            <pre
              className="ascii"
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '10px',
                lineHeight: 1.1,
                color: 'var(--violet)',
                whiteSpace: 'pre',
                opacity: 0.8,
                margin: 0,
              }}
            >{`    █████╗ ██╗     ███████╗███████╗
   ██╔══██╗██║     ██╔════╝██╔════╝
   ███████║██║     █████╗  ███████╗
   ██╔══██║██║     ██╔══╝  ╚════██║
   ██║  ██║███████╗███████╗███████║
   ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
   :: full-stack product engineer ::`}</pre>
          </div>

          {/* Col 2: elsewhere */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '11px',
                color: 'var(--dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              elsewhere
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { href: 'https://github.com/AltanEsmer', label: 'github.com/AltanEsmer' },
                { href: 'https://github.com/AlesSystems', label: 'github.com/AlesSystems' },
                { href: 'https://twitter.com/altanesmer', label: 'twitter.com/altanesmer' },
                {
                  href: 'https://linkedin.com/in/altanesmer',
                  label: 'linkedin.com/in/altanesmer',
                },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hot
                  style={{
                    color: 'var(--muted)',
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: '13px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid transparent',
                    textDecoration: 'none',
                    transition: 'color 0.15s, background 0.15s, border-color 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'var(--text)';
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'var(--line)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'var(--muted)';
                    el.style.background = 'transparent';
                    el.style.borderColor = 'transparent';
                  }}
                >
                  <span style={{ color: 'var(--magenta)' }}>→</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: colophon */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '11px',
                color: 'var(--dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              colophon
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '12px',
                color: 'var(--muted)',
                lineHeight: 1.8,
              }}
            >
              built with: next.js · three.js
              <br />
              type: space grotesk + jbm
              <br />
              host: github pages
              <br />
              co<sub>2</sub>: 0.4g / page-view
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: '11px',
            color: 'var(--dim)',
          }}
        >
          <div>© 2026 altan esmer — designed &amp; coded with care</div>
          <div>
            last commit: <span style={{ color: 'var(--text)' }}>2 hours ago</span> · main ·{' '}
            <span style={{ color: 'var(--green)' }}>●</span> all systems normal
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 800px) {
          .foot-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

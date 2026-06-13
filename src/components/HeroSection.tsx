import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section style={{ padding: '74px 28px 44px' }}>
      <div className="wrap" style={{ padding: 0 }}>
        <Reveal
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 56,
            alignItems: 'center',
          }}
        >
          {/* Left column */}
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            {/* Availability badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--secondary)',
                background: '#fff',
                border: '1px solid var(--border)',
                padding: '6px 13px',
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
                  boxShadow: '0 0 0 3px rgba(22,163,74,.16)',
                }}
              />
              Open to work · Remote / EU
            </div>

            {/* Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(40px, 5.6vw, 67px)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                margin: '22px 0 0',
                color: 'var(--ink)',
              }}
            >
              I build reliable, accessible software for web, mobile &amp; desktop.
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontSize: 'clamp(17px, 1.6vw, 20px)',
                lineHeight: 1.6,
                color: 'var(--secondary)',
                maxWidth: 560,
                margin: '24px 0 0',
              }}
            >
              Full-stack engineer working in TypeScript, React, and Node — with a
              soft spot for Kotlin Multiplatform and carefully crafted interfaces.
              Based in Denmark, open to remote roles across the EU.
            </p>

            {/* CTA buttons */}
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <Button href="/projects">View projects →</Button>
              <Button href="/contact" variant="secondary">Get in touch</Button>
            </div>
          </div>

          {/* Right column — profile card */}
          <div style={{ flex: '0 1 360px', minWidth: 280 }}>
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 26,
                boxShadow: 'var(--shadow-hero)',
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  paddingBottom: 18,
                  borderBottom: '1px solid var(--divider)',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 46,
                    height: 46,
                    background: 'var(--blue)',
                    color: '#fff',
                    borderRadius: 13,
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    fontSize: 19,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  AE
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 18,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      color: 'var(--ink)',
                    }}
                  >
                    Altan Esmer
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--muted)',
                      marginTop: 2,
                    }}
                  >
                    Full-stack Engineer
                  </div>
                </div>
              </div>

              {/* Info rows */}
              {[
                { label: 'Location', value: 'Denmark / EU', valueStyle: {} },
                { label: 'Focus', value: 'Web · Mobile · Desktop', valueStyle: {} },
                {
                  label: 'Availability',
                  value: 'Open to work',
                  valueStyle: { color: 'var(--amber)', fontWeight: 600 },
                },
                { label: 'Reply time', value: '< 24 hours', valueStyle: {}, last: true },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: row.last ? '13px 0 0' : '13px 0',
                    borderBottom: row.last ? 'none' : '1px solid var(--divider-2)',
                  }}
                >
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--ink)',
                      ...row.valueStyle,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from 'next/link';

export const metadata = {
  title: 'Hire me — Altan Esmer',
  description:
    'Open to full-time, contract, and freelance software engineering work.',
};

const openTo = [
  'Full-time roles',
  'Contract engagements',
  'Freelance projects',
  'Technical consulting',
];

export default function HirePage() {
  return (
    <section style={{ padding: '120px 0 100px' }}>
      <div className="wrap" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="section-head">
          <span className="num">06 //</span>
          <span>./hire-me</span>
          <span className="line" />
        </div>

        <h1
          className="display"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(2.4rem,5vw,4.4rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            margin: '0 0 16px',
          }}
        >
          Let&apos;s work
          <br />
          <span className="grad-text">together.</span>
        </h1>

        <p
          style={{
            color: 'var(--muted)',
            fontSize: 16,
            maxWidth: 560,
            marginBottom: 32,
          }}
        >
          I&apos;m a full-stack engineer focused on developer tooling and
          performant web experiences. If you&apos;re building something
          interesting, I&apos;d love to hear about it.
        </p>

        <div
          style={{
            background: 'rgba(13,18,48,.7)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: '24px 28px',
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'var(--dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: 14,
            }}
          >
            open to
          </div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {openTo.map((item) => (
              <li
                key={item}
                style={{
                  fontSize: 14,
                  color: 'var(--text)',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'var(--magenta)' }}>▸</span>
                {item}
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: 28,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <a
              href="mailto:esmeraltan@gmail.com?subject=Hi%20Altan"
              data-hot
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 13,
                color: 'var(--text)',
                background:
                  'linear-gradient(120deg, rgba(236,72,153,.25), rgba(139,92,246,.25))',
                border: '1px solid rgba(236,72,153,.4)',
                padding: '10px 16px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              $ ./email-altan
            </a>
            <Link
              href="/#contact"
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 13,
                color: 'var(--muted)',
                border: '1px solid var(--line)',
                padding: '10px 16px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              or use the contact form
            </Link>
          </div>
        </div>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: 32,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 13,
            color: 'var(--muted)',
            textDecoration: 'none',
          }}
        >
          ← back home
        </Link>
      </div>
    </section>
  );
}

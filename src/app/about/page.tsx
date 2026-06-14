import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Kicker from '@/components/ui/Kicker';

export const metadata = {
  title: 'About — Altan Esmer',
  description:
    'Full-stack software engineer based in Denmark, building reliable, accessible software across web, mobile, and desktop.',
};

const TIMELINE = [
  {
    year: '2023',
    title: 'Started university',
    desc: 'Began the B.Sc. in Computer Science at the University of Southern Denmark.',
  },
  {
    year: '2024',
    title: 'Desktop & cross-platform',
    desc: 'Built the System Health Dashboard (C# / WPF) and KMP Weather with Kotlin Multiplatform.',
  },
  {
    year: '2025',
    title: 'Building & writing',
    desc: 'Shipping gym-progress and publishing project case studies and notes.',
  },
  {
    year: '2026',
    title: 'B.Sc. Computer Science',
    desc: 'Graduated from the University of Southern Denmark. Bachelor project: Tutoria, a phonics app for children with dyslexia.',
  },
];

export default function AboutPage() {
  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '52px 28px 76px' }}>
      {/* Intro block */}
      <Reveal>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 48,
            alignItems: 'flex-start',
          }}
        >
          {/* Left column */}
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            <Kicker>About</Kicker>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(34px, 4.5vw, 50px)',
                letterSpacing: '-0.02em',
                margin: '10px 0 0',
                color: 'var(--ink)',
              }}
            >
              Hi, I&rsquo;m Altan.
            </h1>

            <p
              style={{
                fontSize: 'clamp(18px, 1.7vw, 21px)',
                lineHeight: 1.6,
                color: 'var(--prose)',
                margin: '20px 0 0',
              }}
            >
              I&rsquo;m a full-stack software engineer based in Denmark, building reliable,
              accessible software across web, mobile, and desktop.
            </p>

            <p
              style={{
                fontSize: 16.5,
                lineHeight: 1.75,
                color: 'var(--secondary)',
                margin: '16px 0 0',
              }}
            >
              I work mainly in TypeScript, React, and Node, and I&rsquo;m comfortable reaching for
              the right tool when a problem calls for it — Kotlin Multiplatform for shared mobile
              code, C# and .NET on the desktop, or Python for quick, focused utilities.
            </p>

            <p
              style={{
                fontSize: 16.5,
                lineHeight: 1.75,
                color: 'var(--secondary)',
                margin: '16px 0 0',
              }}
            >
              What ties it together is a preference for calm, careful work: small testable pieces,
              clear interfaces, strong accessibility, and performance treated as a feature. I&rsquo;m
              currently open to remote roles and freelance work across the EU.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 26,
              }}
            >
              <Button href="/contact">Get in touch</Button>
              <Button href="/projects" variant="secondary">
                View work
              </Button>
            </div>
          </div>

          {/* Right column — portrait */}
          <div
            style={{
              flex: '0 1 280px',
              minWidth: 240,
              aspectRatio: '4/5',
              borderRadius: 16,
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/altan-esmer.jpg"
              alt="Altan Esmer"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </Reveal>

      {/* Timeline block */}
      <Reveal delay={0.1}>
        <div style={{ marginTop: 64 }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: 'clamp(26px, 3vw, 32px)',
              letterSpacing: '-0.01em',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Education &amp; milestones
          </h2>

          <div
            style={{
              marginTop: 26,
              borderLeft: '2px solid var(--border-light)',
              paddingLeft: 4,
            }}
          >
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                style={{ position: 'relative', padding: '0 0 28px 28px' }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: -7,
                    top: 4,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: 'var(--surface)',
                    border: '2px solid var(--blue)',
                  }}
                />
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--amber)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.year}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 19,
                    fontWeight: 600,
                    marginTop: 3,
                    color: 'var(--ink)',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: 'var(--secondary)',
                    marginTop: 5,
                    maxWidth: 560,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

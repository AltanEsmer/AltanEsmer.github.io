import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Kicker from '@/components/ui/Kicker';

export default function AboutSection() {
  return (
    <section style={{ padding: '44px 28px' }}>
      <div className="wrap" style={{ padding: 0 }}>
        <Reveal
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 48,
          }}
        >
          {/* Left */}
          <div style={{ flex: '0 1 240px', minWidth: 200 }}>
            <Kicker>About</Kicker>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 'clamp(26px, 3vw, 32px)',
                margin: '10px 0 0',
                color: 'var(--ink)',
              }}
            >
              A bit about me
            </h2>
          </div>

          {/* Right */}
          <div style={{ flex: '1 1 440px', minWidth: 300 }}>
            <p
              style={{
                fontSize: 'clamp(17px, 1.5vw, 19px)',
                lineHeight: 1.7,
                color: 'var(--prose)',
                margin: 0,
              }}
            >
              I&apos;m a full-stack engineer who likes following a problem wherever it
              leads — from a database query to a button&apos;s hover state. I care
              about software that&apos;s fast, accessible, and pleasant to maintain.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--secondary)',
                marginTop: 16,
              }}
            >
              I studied Computer Science at the University of Southern Denmark and have
              since shipped projects across web, mobile, and desktop — in TypeScript,
              Kotlin, C#, and Python.
            </p>
            <Link
              href="/about"
              className="link-blue"
              style={{ display: 'inline-block', marginTop: 18 }}
            >
              More about me →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

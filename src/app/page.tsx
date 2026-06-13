import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />

      {/* Contact CTA */}
      <section>
        <div className="wrap" style={{ padding: '64px 28px 76px' }}>
          <Reveal>
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 18,
                padding: 'clamp(28px, 4vw, 48px)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 28,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Left */}
              <div style={{ flex: '1 1 360px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: 'clamp(26px, 3vw, 36px)',
                    margin: 0,
                    color: 'var(--ink)',
                  }}
                >
                  Have a project in mind?
                </h2>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: 'var(--secondary)',
                    maxWidth: 440,
                    marginTop: 14,
                    marginBottom: 0,
                  }}
                >
                  I&apos;m available for remote roles and freelance work across the EU
                  — and I reply within 24 hours.
                </p>
              </div>

              {/* Right */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Button href="/contact">Get in touch →</Button>
                <Button href="mailto:esmeraltan@gmail.com" variant="secondary">
                  esmeraltan@gmail.com
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

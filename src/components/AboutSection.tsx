'use client'

import { useEffect, useRef } from 'react'

const timelineItems = [
  {
    year: '2025 — now',
    title: 'Founder · AlesSystems',
    meta: 'independent · solo founder',
    body: 'Building developer tooling I want to use. Currently shipping ales-trading and other internal tools.',
  },
  {
    year: '2023 — 2025',
    title: 'Software Engineer · Various',
    meta: 'freelance + contract',
    body: 'End-to-end product work — TypeScript / Python / Postgres. Reduced p99 by 6× on a high-throughput data pipeline.',
  },
  {
    year: '2020 — 2023',
    title: 'Full-stack Engineer',
    meta: 'early-stage SaaS',
    body: 'Built the onboarding flow, billing rewrite, and public API. Wrote the design system the team still uses.',
  },
  {
    year: '2018 — 2022',
    title: 'B.Sc. Computer Science',
    meta: 'SDU · Cyprus',
    body: 'Side-quest: organized student hackathons. Thesis on incremental computation.',
  },
]

function useReveal(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
          }
        })
      },
      { threshold: 0.12 }
    )
    const targets = el.querySelectorAll('.reveal')
    targets.forEach((t) => observer.observe(t))
    // Also observe the element itself if it has .reveal
    if (el.classList.contains('reveal')) observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section id="about" ref={sectionRef} style={{ padding: '100px 0' }}>
      <div className="wrap">
        {/* Section header */}
        <div className="section-head reveal">
          <span className="num">03 //</span>
          <span>cat ./about.json</span>
          <span className="line" />
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '48px',
          }}
          className="about-grid-responsive"
        >
          {/* LEFT — code-bio */}
          <div
            className="code-bio reveal"
            style={{
              background: 'rgba(13,18,48,.7)',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              padding: '22px 26px',
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '13.5px',
              lineHeight: '1.85',
              overflowX: 'auto',
              overflowY: 'hidden',
              position: 'relative',
              whiteSpace: 'pre',
            }}
          >
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>1</span>
              <span style={{ color: 'var(--dim)', fontStyle: 'italic' }}>{'// who am i, in JSON'}</span>
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>2</span>
              <span style={{ color: 'var(--violet)' }}>const</span>
              {' '}
              <span style={{ color: '#93c5fd' }}>altan</span>
              {' '}
              <span style={{ color: 'var(--magenta)' }}>=</span>
              {' {'}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>3</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>name</span>
              {': '}
              <span style={{ color: '#b6e7d6' }}>{'\'Altan Esmer\''}</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>4</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>role</span>
              {': '}
              <span style={{ color: '#b6e7d6' }}>{'\'full-stack engineer\''}</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>5</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>based</span>
              {': '}
              <span style={{ color: '#b6e7d6' }}>{'\'Cyprus / EU\''}</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>6</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>stack</span>
              {': ['}
              <span style={{ color: '#b6e7d6' }}>{'\'TypeScript\''}</span>
              {', '}
              <span style={{ color: '#b6e7d6' }}>{'\'React\''}</span>
              {', '}
              <span style={{ color: '#b6e7d6' }}>{'\'Node\''}</span>
              {', '}
              <span style={{ color: '#b6e7d6' }}>{'\'Python\''}</span>
              {'],'}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>7</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>currently</span>
              {': '}
              <span style={{ color: '#b6e7d6' }}>{'\'building AlesSystems\''}</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>8</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>obsessions</span>
              {': ['}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>9</span>
              {'    '}
              <span style={{ color: '#b6e7d6' }}>{'\'developer tooling\''}</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>10</span>
              {'    '}
              <span style={{ color: '#b6e7d6' }}>{'\'fast feedback loops\''}</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>11</span>
              {'    '}
              <span style={{ color: '#b6e7d6' }}>{'\'API ergonomics\''}</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>12</span>
              {'  ],'}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>13</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>years</span>
              {': '}
              <span style={{ color: 'var(--amber)' }}>6</span>
              {','}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>14</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>ships</span>
              {': '}
              <span style={{ color: 'var(--violet)' }}>true</span>
              {', '}
              <span style={{ color: 'var(--dim)', fontStyle: 'italic' }}>{'// always'}</span>
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>15</span>
              {'  '}
              <span style={{ color: '#5eead4' }}>talks</span>
              {': '}
              <span style={{ color: '#93c5fd' }}>async</span>
              {' () '}
              <span style={{ color: 'var(--magenta)' }}>{'=>'}</span>
              {' '}
              <span style={{ color: 'var(--violet)' }}>await</span>
              {' '}
              <span style={{ color: '#5eead4' }}>coffee</span>
              {'(),'}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>16</span>
              {'};'}
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>17</span>
            </div>
            <div>
              <span style={{ color: 'var(--dim)', marginRight: '16px', userSelect: 'none', display: 'inline-block', width: '18px', textAlign: 'right' }}>18</span>
              <span style={{ color: 'var(--violet)' }}>export default</span>
              {' '}
              <span style={{ color: '#93c5fd' }}>altan</span>
              <span style={{ color: 'var(--magenta)' }}>;</span>
            </div>
          </div>

          {/* RIGHT — timeline */}
          <div className="reveal">
            <div style={{ position: 'relative', paddingLeft: '28px' }}>
              {/* Vertical rail */}
              <div
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '8px',
                  bottom: 0,
                  width: '1px',
                  background:
                    'linear-gradient(180deg, var(--violet), var(--blue), var(--teal), transparent)',
                }}
              />

              {timelineItems.map((item, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: '28px' }}>
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '6px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '999px',
                      background: 'var(--bg)',
                      border: '2px solid var(--violet)',
                      boxShadow: '0 0 12px rgba(139,92,246,.6)',
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: '12px',
                      color: 'var(--magenta)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.year}
                  </div>
                  <h4
                    className="display"
                    style={{
                      fontWeight: 600,
                      fontSize: '18px',
                      letterSpacing: '-0.01em',
                      margin: '0 0 4px',
                      color: 'var(--text)',
                    }}
                  >
                    {item.title}
                  </h4>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: '11px',
                      color: 'var(--dim)',
                      marginBottom: '6px',
                    }}
                  >
                    {item.meta}
                  </div>
                  <p
                    style={{
                      color: 'var(--muted)',
                      fontSize: '13.5px',
                      lineHeight: '1.6',
                      margin: 0,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: single column on narrow viewports */}
      <style>{`
        @media (max-width: 1000px) {
          .about-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          #about { padding: 60px 0 !important; }
          #about .code-bio {
            padding: 16px 14px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}

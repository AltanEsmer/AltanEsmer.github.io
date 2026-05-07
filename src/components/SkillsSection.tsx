'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ConstellationScene = dynamic(() => import('./ConstellationScene'), { ssr: false })

const legendItems = [
  { color: '#3B82F6', label: 'frontend · 9 nodes' },
  { color: '#8B5CF6', label: 'backend · 7 nodes' },
  { color: '#14B8A6', label: 'devops · 5 nodes' },
  { color: '#EC4899', label: 'design · 4 nodes' },
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
      { threshold: 0.1 }
    )
    const targets = el.querySelectorAll('.reveal')
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [ref])
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '100px 0 80px' }}>
      <div className="wrap">
        {/* Section header */}
        <div className="section-head reveal">
          <span className="num">04 //</span>
          <span>skills.constellation</span>
          <span className="line" />
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '48px',
            alignItems: 'center',
          }}
          className="skills-grid-responsive"
        >
          {/* LEFT — heading + legend */}
          <div className="reveal">
            <h2
              className="display"
              style={{
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                letterSpacing: '-0.04em',
                lineHeight: '0.95',
                margin: '0 0 14px',
                color: 'var(--text)',
              }}
            >
              A constellation,
              <br />
              not a checklist.
            </h2>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: '15px',
                lineHeight: '1.65',
                maxWidth: '480px',
                margin: 0,
              }}
            >
              Drag the cluster to rotate. Hover any node to see how I use it
              day-to-day. I don&apos;t list every tool I&apos;ve touched —
              only the ones I actually reach for.
            </p>

            {/* Legend */}
            <div
              style={{
                marginTop: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '12px',
              }}
            >
              {legendItems.map(({ color, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--muted)',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '999px',
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — constellation stage */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div
              style={{
                aspectRatio: '1 / 1',
                maxWidth: '560px',
                borderRadius: '24px',
                border: '1px solid var(--line)',
                background: 'rgba(13,18,48,.4)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '100%', height: '100%' }}>
                <ConstellationScene />
              </div>

              {/* Hint overlay */}
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  bottom: '14px',
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: '11px',
                  color: 'var(--dim)',
                  pointerEvents: 'none',
                }}
              >
                drag{' '}
                <kbd
                  style={{
                    background: 'rgba(255,255,255,.06)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--line)',
                    margin: '0 2px',
                  }}
                >
                  mouse
                </kbd>{' '}
                to rotate · hover for detail
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive single-column on narrow viewports */}
      <style>{`
        @media (max-width: 1000px) {
          .skills-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

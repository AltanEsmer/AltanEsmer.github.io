'use client';

import type { BentoProject } from '@/lib/projects-static';

// Deterministic spark bar heights — seeded by bar index to avoid hydration mismatch
function sparkHeight(i: number): number {
  // Simple deterministic pseudo-random based on index
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  const frac = x - Math.floor(x);
  return Math.round(20 + frac * 80); // 20%–100%
}

const SPARK_COUNT = 24;

export default function ProjectCard({
  project,
  className,
}: {
  project: BentoProject;
  className?: string;
}) {
  const { featured, live } = project;

  return (
    <a
      href={project.href}
      className={`card bento-card ${project.span}${featured ? ' featured' : ''} reveal${className ? ' ' + className : ''}`}
      data-tags={project.tags.join(',')}
      data-hot
      style={{
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        background: 'rgba(26,27,58,.6)',
        border: '1px solid var(--line)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform .35s cubic-bezier(.2,.7,.2,1), border-color .25s',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Preview background */}
      <div
        className={`preview ${project.preview}`}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.85,
          zIndex: 0,
          transition: 'opacity .3s, transform .6s',
        }}
      >
        <div className="pv-grid" />
      </div>

      {/* Scrim gradient */}
      <div
        className="scrim"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(10,14,39,0) 30%, rgba(10,14,39,.85) 100%)',
        }}
      />

      {/* Card content */}
      <div
        className="content"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: featured ? '16px' : undefined,
        }}
      >
        {/* Top row: num + meta (featured only) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div
            className="card-num"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--dim)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span>{featured ? `FEATURED · ${project.num}` : project.num}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              shipped {project.shippedAt}
            </span>
          </div>
          {featured && live && (
            <div
              className="card-meta"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--dim)',
              }}
            >
              <span style={{ color: 'var(--magenta)' }}>●</span> live
            </div>
          )}
        </div>

        {/* Live window (featured only) */}
        {featured && live && (
          <div
            className="live-window"
            style={{
              flex: 1,
              minHeight: 0,
              borderRadius: '12px',
              background: 'rgba(10,14,39,.6)',
              border: '1px solid var(--line)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backdropFilter: 'blur(6px)',
              overflow: 'hidden',
            }}
          >
            {/* Live bar */}
            <div
              className="live-bar"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'var(--dim)',
              }}
            >
              <div
                className="dot-r"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,.15)',
                  flexShrink: 0,
                }}
              />
              <div
                className="dot-r"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,.15)',
                  flexShrink: 0,
                }}
              />
              <div
                className="dot-r"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,.15)',
                  flexShrink: 0,
                }}
              />
              <div
                className="url"
                style={{
                  padding: '2px 8px',
                  background: 'rgba(255,255,255,.05)',
                  borderRadius: '4px',
                }}
              >
                {live.deployUrl}
              </div>
            </div>

            {/* Stat row */}
            <div
              className="stat-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
              }}
            >
              {live.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat"
                  style={{
                    background: 'rgba(255,255,255,.03)',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                >
                  <div
                    className={`v${stat.up ? ' up' : ''}`}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '18px',
                      color: 'var(--text)',
                      fontWeight: 600,
                    }}
                  >
                    {stat.value}
                    {stat.up && (
                      <span
                        style={{
                          color: 'var(--green)',
                          fontSize: '12px',
                          marginLeft: '2px',
                        }}
                      >
                        ↑
                      </span>
                    )}
                  </div>
                  <div
                    className="l"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      color: 'var(--dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Spark bars */}
            <div
              className="spark"
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '3px',
              }}
            >
              {Array.from({ length: SPARK_COUNT }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    flex: 1,
                    height: `${sparkHeight(i)}%`,
                    background:
                      'linear-gradient(180deg, var(--violet), var(--blue))',
                    borderRadius: '2px',
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>

            {/* Deploy line */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'var(--dim)',
              }}
            >
              $ deploy --prod • {live.deployedAgo}
            </div>
          </div>
        )}

        {/* Bottom block: title + desc + stack */}
        <div>
          <h3
            className="card-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '26px',
              letterSpacing: '-0.02em',
              margin: '0 0 6px',
              color: 'var(--text)',
            }}
          >
            {project.title}
          </h3>
          <p
            className="card-desc"
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.5,
              maxWidth: '94%',
              // Featured card: always visible; normal cards: reveal on hover via CSS in globals
              ...(featured ? { opacity: 1, transform: 'none' } : {}),
            }}
          >
            {project.description}
          </p>
          <div
            className="card-stack"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '7px',
              marginTop: '14px',
            }}
          >
            {project.stack.map((s) => (
              <span key={s.label} className={`chip ${s.variant}`}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

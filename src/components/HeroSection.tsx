'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';

const IcosahedronScene = dynamic(() => import('./IcosahedronScene'), {
  ssr: false,
});

// Compute uptime from a fixed start date (2018-09)
function computeUptime(): { years: number; months: number } {
  const start = new Date(2018, 8, 1); // September 2018
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
}

// Terminal lines to animate — real identity
interface TermLine {
  delay: number;
  content: React.ReactNode;
}

function TerminalBody() {
  const shouldReduceMotion = useReducedMotion();
  const stagger = shouldReduceMotion ? 0 : 0.18;

  const lines: TermLine[] = [
    {
      delay: stagger * 0,
      content: (
        <span>
          <span style={{ color: 'var(--teal)' }}>$</span>{' '}
          <span style={{ color: 'var(--text)' }}>whoami</span>
        </span>
      ),
    },
    {
      delay: stagger * 1,
      content: <span style={{ color: 'var(--muted)' }}>altan esmer</span>,
    },
    {
      delay: stagger * 2,
      content: (
        <span>
          <span style={{ color: 'var(--teal)' }}>$</span>{' '}
          <span style={{ color: 'var(--text)' }}>cat ~/identity.json</span>
        </span>
      ),
    },
    {
      delay: stagger * 3,
      content: <span style={{ color: 'var(--muted)' }}>{'{'}</span>,
    },
    {
      delay: stagger * 4,
      content: (
        <span style={{ paddingLeft: '1.5em', display: 'block' }}>
          <span style={{ color: 'var(--violet)' }}>&quot;role&quot;</span>
          <span style={{ color: 'var(--dim)' }}>: </span>
          <span style={{ color: '#b6e7d6' }}>&quot;full-stack engineer&quot;</span>
          <span style={{ color: 'var(--dim)' }}>,</span>
        </span>
      ),
    },
    {
      delay: stagger * 5,
      content: (
        <span style={{ paddingLeft: '1.5em', display: 'block' }}>
          <span style={{ color: 'var(--violet)' }}>&quot;based&quot;</span>
          <span style={{ color: 'var(--dim)' }}>: </span>
          <span style={{ color: '#b6e7d6' }}>&quot;Cyprus / EU&quot;</span>
          <span style={{ color: 'var(--dim)' }}>,</span>
        </span>
      ),
    },
    {
      delay: stagger * 6,
      content: (
        <span style={{ paddingLeft: '1.5em', display: 'block' }}>
          <span style={{ color: 'var(--violet)' }}>&quot;stack&quot;</span>
          <span style={{ color: 'var(--dim)' }}>: </span>
          <span style={{ color: 'var(--dim)' }}>[</span>
          <span style={{ color: '#b6e7d6' }}>&quot;TypeScript&quot;</span>
          <span style={{ color: 'var(--dim)' }}>, </span>
          <span style={{ color: '#b6e7d6' }}>&quot;React&quot;</span>
          <span style={{ color: 'var(--dim)' }}>, </span>
          <span style={{ color: '#b6e7d6' }}>&quot;Node&quot;</span>
          <span style={{ color: 'var(--dim)' }}>, </span>
          <span style={{ color: '#b6e7d6' }}>&quot;Python&quot;</span>
          <span style={{ color: 'var(--dim)' }}>],</span>
        </span>
      ),
    },
    {
      delay: stagger * 7,
      content: (
        <span style={{ paddingLeft: '1.5em', display: 'block' }}>
          <span style={{ color: 'var(--violet)' }}>&quot;currently&quot;</span>
          <span style={{ color: 'var(--dim)' }}>: </span>
          <span style={{ color: '#b6e7d6' }}>&quot;shipping AlesSystems&quot;</span>
        </span>
      ),
    },
    {
      delay: stagger * 8,
      content: <span style={{ color: 'var(--muted)' }}>{'}'}</span>,
    },
    {
      delay: stagger * 9,
      content: (
        <span>
          <span style={{ color: 'var(--teal)' }}>$</span>{' '}
          <span style={{ color: 'var(--text)' }}>echo &quot;ready&quot;</span>{' '}
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '1em',
              background: 'var(--magenta)',
              verticalAlign: '-2px',
              marginLeft: '2px',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </span>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: '22px 22px 28px',
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: '14px',
        lineHeight: '1.75',
        minHeight: '360px',
      }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: line.delay, duration: 0.22, ease: 'easeOut' }}
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {line.content}
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { years, months } = computeUptime();

  return (
    <section
      id="hero"
      style={{ padding: '120px 0 80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* .wrap.hero-grid */}
      <div
        className="wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '48px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* LEFT column — terminal + meta */}
        <div>
          {/* .terminal with .iri-border */}
          <div
            className="iri-border"
            style={{
              background: 'rgba(13,18,48,.85)',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px -20px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.02)',
              position: 'relative',
            }}
          >
            {/* .term-bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0))',
                borderBottom: '1px solid var(--line)',
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '12px',
                color: 'var(--dim)',
              }}
            >
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: '7px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '999px',
                    background: '#ff5f57',
                    boxShadow: '0 0 6px rgba(255,95,87,.5)',
                  }}
                />
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '999px',
                    background: '#febc2e',
                    boxShadow: '0 0 6px rgba(254,188,46,.5)',
                  }}
                />
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '999px',
                    background: '#28c840',
                    boxShadow: '0 0 6px rgba(40,200,64,.5)',
                  }}
                />
              </div>
              {/* Term title */}
              <div style={{ marginLeft: '8px' }}>
                <b style={{ color: 'var(--text)', fontWeight: 500 }}>altan</b>
                @portfolio — zsh — 96×24
              </div>
              {/* Term tabs */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                <div
                  style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: 'rgba(139,92,246,.18)',
                    color: 'var(--text)',
                  }}
                >
                  ~/intro.sh
                </div>
                <div
                  style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,.04)',
                  }}
                >
                  README.md
                </div>
              </div>
            </div>

            {/* .term-body */}
            <TerminalBody />
          </div>

          {/* .hero-meta */}
          <div
            style={{
              marginTop: '18px',
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '12px',
              color: 'var(--dim)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: 'var(--green)',
                  display: 'inline-block',
                  marginRight: '6px',
                  boxShadow: '0 0 10px var(--green)',
                  animation: 'pulse 2s infinite',
                }}
              />
              open to work · remote / EU
            </span>
            <span>📍 based in Cyprus</span>
            <span>
              uptime:{' '}
              <b style={{ color: 'var(--text)', fontWeight: 500 }}>
                {years}y {months}mo
              </b>
            </span>
          </div>
        </div>

        {/* RIGHT column — headline + 3D stage */}
        <div className="hero-right" style={{ position: 'relative' }}>
          <motion.h1
            className="display"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              margin: '0 0 16px',
            }}
          >
            Ship
            <br />
            <span className="grad-text">software</span>
            <br />
            that ships.
          </motion.h1>

          <motion.p
            className="mono"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              maxWidth: '460px',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            {`// I'm Altan — a full-stack engineer building`}
            <br />
            interfaces that respect your attention
            <br />
            and backends that don&apos;t wake you up at 3am.
          </motion.p>

          {/* .three-stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              maxWidth: '520px',
              marginLeft: 'auto',
              borderRadius: '24px',
              background:
                'radial-gradient(circle at 30% 30%, rgba(139,92,246,.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(20,184,166,.18), transparent 50%), rgba(13,18,48,.4)',
              border: '1px solid var(--line)',
              overflow: 'hidden',
            }}
          >
            {/* WebGL canvas — fills 100%x100% */}
            <IcosahedronScene />

            {/* .three-corner.tr */}
            <div
              className="mono"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                fontSize: '10px',
                color: 'var(--dim)',
                padding: '4px 8px',
                border: '1px solid var(--line)',
                borderRadius: '6px',
                background: 'rgba(13,18,48,.6)',
                pointerEvents: 'none',
              }}
            >
              webgl ◉ shader.frag
            </div>

            {/* .three-tag */}
            <div
              className="mono"
              style={{
                position: 'absolute',
                left: '16px',
                bottom: '14px',
                fontSize: '11px',
                color: 'var(--dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  background: 'var(--magenta)',
                  borderRadius: '999px',
                  boxShadow: '0 0 8px var(--magenta)',
                  flexShrink: 0,
                }}
              />
              iridescent · 60fps · drag to rotate
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive: collapse to 1-col under 1000px */}
      <style>{`
        @media (max-width: 1000px) {
          #hero .wrap {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

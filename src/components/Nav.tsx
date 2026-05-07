'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#hero', label: '~/home', section: 'hero' },
  { href: '#projects', label: '~/projects', section: 'projects' },
  { href: '#about', label: '~/about', section: 'about' },
  { href: '#skills', label: '~/skills', section: 'skills' },
  { href: '#contact', label: '~/contact', section: 'contact' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.section)).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setOpen(false);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9000]"
      style={{
        backdropFilter: 'blur(14px) saturate(160%)',
        WebkitBackdropFilter: 'blur(14px) saturate(160%)',
        background: 'rgba(10,14,39,0.55)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="nav-row"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '14px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '14px',
        }}
      >
        {/* Brand */}
        <a
          href="#hero"
          data-hot
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text)',
          }}
          className="brand-link"
          onClick={() => setOpen(false)}
        >
          <span
            className="brand-mark"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: '#1f2147',
              border: '1px solid #2f3170',
              display: 'grid',
              placeItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#E8EAF6" strokeWidth="1.6" />
              <path
                d="M7.5 17 L12 6.5 L16.5 17 M9.4 13.4 H14.6"
                stroke="#E8EAF6"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>
            ales<span style={{ color: 'var(--magenta)' }}>.</span>systems
          </span>
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: 4,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '13px',
            }}
          >
            {NAV_LINKS.map(({ href, label, section }) => {
              const isActive = active === section;
              return (
                <a
                  key={href}
                  href={href}
                  style={{
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    padding: '8px 14px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                    transition: 'color 0.15s, background 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)';
                    }
                  }}
                >
                  {isActive && (
                    <span style={{ color: 'var(--magenta)', marginRight: 2 }}>▸</span>
                  )}
                  {label}
                  {isActive && (
                    <span
                      style={{
                        color: 'var(--magenta)',
                        animation: 'blink 1s step-end infinite',
                        marginLeft: 2,
                      }}
                    >
                      ▍
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <a
            href="#contact"
            data-hot
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '12px',
              color: 'var(--text)',
              background: 'rgba(236,72,153,0.15)',
              border: '1px solid rgba(236,72,153,0.4)',
              padding: '8px 14px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'background 0.15s, transform 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(236,72,153,0.3)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(236,72,153,0.15)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            $ ./hire-me
          </a>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
            style={{
              width: 40,
              height: 40,
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              padding: 0,
              borderRadius: 8,
              background: open ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: '1px solid var(--line)',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: 18,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'transform 0.18s, opacity 0.18s',
                transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'opacity 0.18s',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                width: 18,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'transform 0.18s',
                transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        )}
      </div>

      {/* Mobile dropdown panel */}
      {isMobile && open && (
        <div
          id="mobile-nav-panel"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '12px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: '14px',
          }}
        >
          {NAV_LINKS.map(({ href, label, section }) => {
            const isActive = active === section;
            return (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  color: isActive ? 'var(--text)' : 'var(--muted)',
                  padding: '12px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {isActive && <span style={{ color: 'var(--magenta)' }}>▸</span>}
                {label}
              </a>
            );
          })}
          <a
            href="#contact"
            data-hot
            onClick={() => setOpen(false)}
            style={{
              marginTop: 8,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '13px',
              color: 'var(--text)',
              background: 'rgba(236,72,153,0.15)',
              border: '1px solid rgba(236,72,153,0.4)',
              padding: '12px 14px',
              borderRadius: 8,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            $ ./hire-me
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          nav .nav-row { padding: 12px 16px !important; }
        }
      `}</style>
    </nav>
  );
}

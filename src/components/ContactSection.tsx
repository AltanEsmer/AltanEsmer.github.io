'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  budget: string;
  message: string;
  submitted: boolean;
  errors: { name?: boolean; email?: boolean; message?: boolean };
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    budget: '',
    message: '',
    submitted: false,
    errors: {},
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll('.reveal').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!form.submitted) return;
    const timer = setTimeout(() => {
      setForm((f) => ({ ...f, submitted: false }));
    }, 4000);
    return () => clearTimeout(timer);
  }, [form.submitted]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors: FormState['errors'] = {};
    if (!form.name.trim()) errors.name = true;
    if (!form.email.trim()) errors.email = true;
    if (!form.message.trim()) errors.message = true;

    if (Object.keys(errors).length > 0) {
      setForm((f) => ({ ...f, errors }));
      return;
    }

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.budget ? `Budget: ${form.budget}` : '',
      '',
      form.message,
    ]
      .filter((line) => line !== undefined)
      .join('\n');

    const mailto =
      `mailto:esmeraltan@gmail.com` +
      `?subject=${encodeURIComponent('Hi Altan')}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setForm((f) => ({ ...f, errors: {}, submitted: true }));
  }

  function fieldBorderStyle(hasError?: boolean): React.CSSProperties {
    return hasError
      ? { borderBottomColor: 'rgba(239,68,68,0.6)', borderBottomStyle: 'dashed', borderBottomWidth: 1 }
      : {};
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact"
      style={{ padding: '100px 0' }}
    >
      <div
        className="wrap contact-wrap"
        style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}
      >
        {/* Section heading */}
        <div className="section-head reveal">
          <span className="num">05 //</span>
          <span>send-message.sh</span>
          <span className="line" />
        </div>

        {/* Hero copy */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2
            className="display"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(2.4rem,5vw,4.4rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              margin: '0 0 12px',
            }}
          >
            Got an idea?
            <br />
            <span className="grad-text">Let&apos;s compile it.</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
            Open to contract gigs, full-time, and weird side-quests. Replies in &lt; 24h.
          </p>
        </div>

        {/* Terminal card */}
        <div
          className="contact-term reveal"
          style={{
            background: 'rgba(13,18,48,.85)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {/* Term bar */}
          <div
            className="term-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              borderBottom: '1px solid var(--line)',
              background: 'rgba(0,0,0,.25)',
            }}
          >
            <div
              className="lights"
              style={{ display: 'flex', gap: 7 }}
            >
              <span
                className="light r"
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ff5f57',
                  boxShadow: '0 0 4px rgba(255,95,87,.5)',
                  display: 'inline-block',
                }}
              />
              <span
                className="light y"
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#febc2e',
                  boxShadow: '0 0 4px rgba(254,188,46,.5)',
                  display: 'inline-block',
                }}
              />
              <span
                className="light g"
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#28c840',
                  boxShadow: '0 0 4px rgba(40,200,64,.5)',
                  display: 'inline-block',
                }}
              />
            </div>
            <div
              className="term-title"
              style={{
                marginLeft: 8,
                fontSize: 12,
                color: 'var(--muted)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <b>./send-message.sh</b> — interactive prompt
            </div>
          </div>

          {/* Form body */}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="contact-body"
            style={{
              padding: '22px 26px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              lineHeight: 1.85,
            }}
          >
            {/* Name field */}
            <div
              className="field"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                padding: '6px 0',
                borderBottom: '1px dashed transparent',
                ...(form.errors.name
                  ? fieldBorderStyle(true)
                  : {}),
              }}
              onFocus={() =>
                setForm((f) => ({
                  ...f,
                  errors: { ...f.errors, name: false },
                }))
              }
            >
              <span style={{ color: 'var(--magenta)' }}>&gt;</span>
              <span
                className="lbl"
                style={{ color: 'var(--violet)', minWidth: 100 }}
              >
                name
              </span>
              <input
                type="text"
                placeholder="your name_"
                required
                data-hot=""
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: 'var(--text)',
                  font: 'inherit',
                }}
              />
            </div>

            {/* Email field */}
            <div
              className="field"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                padding: '6px 0',
                borderBottom: '1px dashed transparent',
                ...(form.errors.email
                  ? fieldBorderStyle(true)
                  : {}),
              }}
              onFocus={() =>
                setForm((f) => ({
                  ...f,
                  errors: { ...f.errors, email: false },
                }))
              }
            >
              <span style={{ color: 'var(--magenta)' }}>&gt;</span>
              <span
                className="lbl"
                style={{ color: 'var(--violet)', minWidth: 100 }}
              >
                email
              </span>
              <input
                type="email"
                placeholder="you@domain.com_"
                required
                data-hot=""
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: 'var(--text)',
                  font: 'inherit',
                }}
              />
            </div>

            {/* Budget field */}
            <div
              className="field"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                padding: '6px 0',
                borderBottom: '1px dashed transparent',
              }}
            >
              <span style={{ color: 'var(--magenta)' }}>&gt;</span>
              <span
                className="lbl"
                style={{ color: 'var(--violet)', minWidth: 100 }}
              >
                budget
              </span>
              <input
                type="text"
                placeholder="optional · €/$/range_"
                data-hot=""
                value={form.budget}
                onChange={(e) =>
                  setForm((f) => ({ ...f, budget: e.target.value }))
                }
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: 'var(--text)',
                  font: 'inherit',
                }}
              />
            </div>

            {/* Message field */}
            <div
              className="field"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '6px 0',
                borderBottom: '1px dashed transparent',
                ...(form.errors.message
                  ? fieldBorderStyle(true)
                  : {}),
              }}
              onFocus={() =>
                setForm((f) => ({
                  ...f,
                  errors: { ...f.errors, message: false },
                }))
              }
            >
              <span style={{ color: 'var(--magenta)', lineHeight: 1.85 }}>&gt;</span>
              <span
                className="lbl"
                style={{ color: 'var(--violet)', minWidth: 100, lineHeight: 1.85 }}
              >
                message
              </span>
              <textarea
                placeholder="what are we building?_"
                required
                data-hot=""
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: 'var(--text)',
                  font: 'inherit',
                  resize: 'none',
                  minHeight: 80,
                }}
              />
            </div>

            {/* Send button */}
            <button
              type="submit"
              data-hot=""
              className="send-btn"
              style={{
                marginTop: 18,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                background:
                  'linear-gradient(120deg, rgba(236,72,153,.25), rgba(139,92,246,.25))',
                color: 'var(--text)',
                border: '1px solid rgba(236,72,153,.4)',
                padding: '12px 18px',
                borderRadius: 10,
                cursor: 'pointer',
                transition: 'all .25s',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'linear-gradient(120deg, rgba(236,72,153,.4), rgba(139,92,246,.4))';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'linear-gradient(120deg, rgba(236,72,153,.25), rgba(139,92,246,.25))';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'translateY(0)';
              }}
            >
              $ ./send-message.sh{' '}
              <span style={{ color: 'var(--green)' }}>--ready</span>
            </button>

            {/* Toast */}
            {form.submitted && (
              <div
                style={{
                  marginTop: 14,
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'rgba(16,185,129,.1)',
                  border: '1px solid rgba(16,185,129,.3)',
                  color: '#a7f3d0',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  animation: 'toastIn .35s cubic-bezier(.2,.7,.2,1)',
                }}
              >
                <span style={{ color: 'var(--green)' }}>✓</span>
                queued — opening your mail client…
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

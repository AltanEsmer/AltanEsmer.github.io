'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import Kicker from '@/components/ui/Kicker';

type FormState = {
  name: string;
  email: string;
  budget: string;
  message: string;
};

type ErrorState = Partial<Record<keyof FormState, string>>;

const BUDGET_OPTIONS = [
  { v: '', l: 'Optional — pick a range' },
  { v: 'Under €5k', l: 'Under €5k' },
  { v: '€5k–€15k', l: '€5k–€15k' },
  { v: '€15k–€40k', l: '€15k–€40k' },
  { v: '€40k+', l: '€40k+' },
];

const EMPTY_FORM: FormState = { name: '', email: '', budget: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<ErrorState>({});
  const [sent, setSent] = useState(false);

  const setField =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: '' }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ErrorState = {};
    if (!form.name.trim()) newErrors.name = 'Please tell me your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      newErrors.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10)
      newErrors.message = 'A sentence or two helps — 10+ characters.';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const bodyLines = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      ...(form.budget ? [`Budget: ${form.budget}`] : []),
      '',
      form.message.trim(),
    ];
    const mailto =
      `mailto:esmeraltan@gmail.com` +
      `?subject=${encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;

    setSent(true);
  };

  const resetForm = () => {
    setSent(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const firstName = form.name.trim().split(' ')[0] || 'there';

  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '52px 28px 76px' }}>
      {/* Header */}
      <Reveal>
        <Kicker>Contact</Kicker>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 4.5vw, 52px)',
            letterSpacing: '-0.02em',
            margin: '10px 0 0',
          }}
        >
          Let&apos;s work together
        </h1>
        <p
          style={{
            fontSize: 'clamp(17px, 1.6vw, 20px)',
            lineHeight: 1.6,
            color: 'var(--secondary)',
            maxWidth: 560,
            margin: '16px 0 0',
          }}
        >
          Tell me about your project or role. I read every message and reply within 24 hours.
        </p>
      </Reveal>

      {/* Content row */}
      <Reveal
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 40,
          marginTop: 36,
          alignItems: 'flex-start',
        }}
      >
        {/* Form column */}
        <form
          onSubmit={handleSubmit}
          style={{ flex: '1 1 460px', minWidth: 300 }}
          noValidate
        >
          {sent ? (
            /* Success card */
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: 32,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#eaf6ec',
                  color: 'var(--green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  margin: '0 auto',
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  fontSize: 24,
                  margin: '18px 0 0',
                }}
              >
                Thanks, {firstName}!
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: 'var(--secondary)',
                  margin: '10px 0 0',
                }}
              >
                Your email app should have opened with the message ready to send.
                If it didn&apos;t, email me directly at esmeraltan@gmail.com — I reply
                within 24 hours.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginTop: 20 }}
                onClick={resetForm}
              >
                Send another
              </button>
            </div>
          ) : (
            /* Form fields */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Name */}
              <div>
                <label className="field-label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  className={`field${errors.name ? ' field-error' : ''}`}
                  type="text"
                  value={form.name}
                  placeholder="Your name"
                  onChange={setField('name')}
                  autoComplete="name"
                />
                {errors.name && <div className="field-msg">{errors.name}</div>}
              </div>

              {/* Email */}
              <div>
                <label className="field-label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  className={`field${errors.email ? ' field-error' : ''}`}
                  type="email"
                  value={form.email}
                  placeholder="you@example.com"
                  onChange={setField('email')}
                  autoComplete="email"
                />
                {errors.email && <div className="field-msg">{errors.email}</div>}
              </div>

              {/* Budget (optional) */}
              <div>
                <label className="field-label" htmlFor="contact-budget">
                  Budget{' '}
                  <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span>
                </label>
                <select
                  id="contact-budget"
                  className="field"
                  value={form.budget}
                  onChange={setField('budget')}
                >
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.v} value={o.v}>
                      {o.l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="field-label" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className={`field${errors.message ? ' field-error' : ''}`}
                  rows={5}
                  value={form.message}
                  placeholder="A sentence or two about what you have in mind…"
                  onChange={setField('message')}
                />
                {errors.message && <div className="field-msg">{errors.message}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start' }}
              >
                Send message →
              </button>
            </div>
          )}
        </form>

        {/* Aside */}
        <aside
          style={{
            flex: '0 1 300px',
            minWidth: 260,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Email card */}
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 22,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Email
            </div>
            <a
              href="mailto:esmeraltan@gmail.com"
              className="link-blue"
              style={{ display: 'inline-block', marginTop: 8, fontSize: 16 }}
            >
              esmeraltan@gmail.com
            </a>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
              Replies within 24 hours.
            </div>
          </div>

          {/* Status card */}
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 22,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {/* Open to work */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--green)',
                  boxShadow: '0 0 0 3px rgba(22,163,74,.16)',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--amber)' }}>
                Open to work — Remote / EU
              </span>
            </div>

            {/* Based in */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: 'var(--muted)' }}>Based in</span>
              <span style={{ fontWeight: 500 }}>Denmark / EU</span>
            </div>

            {/* Elsewhere */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: 'var(--muted)' }}>Elsewhere</span>
              <span style={{ display: 'flex', gap: 12 }}>
                <a
                  href="https://github.com/AltanEsmer"
                  className="link-blue"
                  style={{ fontWeight: 500 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </span>
            </div>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}

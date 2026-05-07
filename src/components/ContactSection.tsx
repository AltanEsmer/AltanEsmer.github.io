'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, ExternalLink, Mail } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
  step: number;
  sending: boolean;
  sent: boolean;
}

const stepVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    step: 0,
    sending: false,
    sent: false,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (form.step === 0) nameRef.current?.focus();
    else if (form.step === 1) emailRef.current?.focus();
    else if (form.step === 2) messageRef.current?.focus();
  }, [form.step]);

  function handleKeyDown(e: KeyboardEvent, currentStep: number) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentStep === 0 && form.name.trim()) {
        setForm((f) => ({ ...f, step: 1 }));
      } else if (currentStep === 1 && form.email.trim()) {
        setForm((f) => ({ ...f, step: 2 }));
      }
    }
  }

  async function handleSubmit() {
    if (!form.message.trim()) return;
    setForm((f) => ({ ...f, sending: true }));
    await new Promise((r) => setTimeout(r, 1500));
    setForm((f) => ({ ...f, sending: false, sent: true }));
  }

  const inputClass =
    'bg-transparent border-b border-accent-blue/50 focus:border-accent-blue outline-none text-port-text w-full py-1 font-mono text-sm caret-accent-teal';

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-12 lg:px-20 bg-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="gradient-text text-4xl md:text-5xl font-bold mb-4">
            Contact
          </h2>
          <p className="text-port-text/60 font-mono text-sm">
            Let&apos;s build something together
          </p>
        </div>

        {/* Terminal card */}
        <div className="glass-card max-w-2xl mx-auto overflow-hidden shadow-2xl">
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-surface/80">
            <span className="w-3 h-3 rounded-full bg-highlight" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-accent-teal" />
            <span className="ml-4 text-xs font-mono text-port-text/50 select-none">
              contact --init
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-black/60 p-6 font-mono text-sm min-h-[320px]">
            <AnimatePresence initial={false}>
              {/* Step 0 — name */}
              <motion.div key="step-name" variants={stepVariants} initial="hidden" animate="visible">
                <p className="text-accent-teal mb-1">$ contact --name</p>
                <p className="text-port-text/60 mb-2">&gt; What should I call you?</p>
                {form.step === 0 ? (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-accent-teal">&gt;</span>
                    <input
                      ref={nameRef}
                      type="text"
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      onKeyDown={(e) => handleKeyDown(e, 0)}
                      placeholder="your name"
                      autoComplete="off"
                    />
                  </div>
                ) : (
                  <p className="text-port-text mb-4">
                    <span className="text-accent-teal">&gt;</span> {form.name}
                  </p>
                )}
              </motion.div>

              {/* Step 1 — email */}
              {form.step >= 1 && (
                <motion.div key="step-email" variants={stepVariants} initial="hidden" animate="visible">
                  <p className="text-accent-teal mb-1">$ contact --email</p>
                  <p className="text-port-text/60 mb-2">&gt; What&apos;s your email address?</p>
                  {form.step === 1 ? (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-accent-teal">&gt;</span>
                      <input
                        ref={emailRef}
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        onKeyDown={(e) => handleKeyDown(e, 1)}
                        placeholder="you@example.com"
                        autoComplete="off"
                      />
                    </div>
                  ) : (
                    <p className="text-port-text mb-4">
                      <span className="text-accent-teal">&gt;</span> {form.email}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Step 2 — message */}
              {form.step >= 2 && (
                <motion.div key="step-message" variants={stepVariants} initial="hidden" animate="visible">
                  <p className="text-accent-teal mb-1">$ contact --message</p>
                  <p className="text-port-text/60 mb-2">&gt; What would you like to talk about?</p>
                  {!form.sent && (
                    <div className="flex items-start gap-2 mb-4">
                      <span className="text-accent-teal mt-1">&gt;</span>
                      <textarea
                        ref={messageRef}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Tell me about your project..."
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Submit button */}
              {form.step >= 2 && !form.sending && !form.sent && (
                <motion.div key="submit" variants={stepVariants} initial="hidden" animate="visible">
                  <button
                    onClick={handleSubmit}
                    disabled={!form.message.trim()}
                    className="text-accent-teal hover:text-accent-teal/80 disabled:text-port-text/30 transition-colors font-mono text-sm cursor-pointer disabled:cursor-not-allowed"
                  >
                    $ send --message
                  </button>
                </motion.div>
              )}

              {/* Sending indicator */}
              {form.sending && (
                <motion.div key="sending" variants={stepVariants} initial="hidden" animate="visible">
                  <p className="text-accent-blue">
                    Sending
                    <span className="inline-flex gap-0.5 ml-1">
                      <span className="animate-[blink_1s_step-end_infinite]">.</span>
                      <span className="animate-[blink_1s_step-end_0.33s_infinite]">.</span>
                      <span className="animate-[blink_1s_step-end_0.66s_infinite]">.</span>
                    </span>
                  </p>
                </motion.div>
              )}

              {/* Success */}
              {form.sent && (
                <motion.div key="success" variants={stepVariants} initial="hidden" animate="visible" className="space-y-1">
                  <p className="text-accent-teal">✓ Message sent successfully!</p>
                  <p className="text-port-text/60">&nbsp;</p>
                  <p className="text-port-text/80">I&apos;ll get back to you within 24 hours.</p>
                  <p className="text-port-text/80">Thank you, {form.name}!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mt-8">
          {[
            { icon: GitFork, label: 'GitHub', href: 'https://github.com/AltanEsmer' },
            { icon: ExternalLink, label: 'LinkedIn', href: '#' },
            { icon: Mail, label: 'Email', href: 'mailto:contact@altanesmer.dev' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass-card flex items-center gap-2 px-4 py-3 text-port-text/70 hover:text-port-text hover:border-accent-blue/50 transition-all duration-200 text-sm font-mono"
            >
              <Icon size={16} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

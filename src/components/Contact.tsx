'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Terminal, Send, Check } from 'lucide-react'

type Field = 'name' | 'email' | 'message'

const PROMPTS: Record<Field, string> = {
  name: '> Enter your name:',
  email: '> Enter your email:',
  message: '> Leave a message:',
}

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [currentField, setCurrentField] = useState<Field>('name')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [history, setHistory] = useState<{ prompt: string; value: string }[]>([])

  const fields: Field[] = ['name', 'email', 'message']
  const currentIndex = fields.indexOf(currentField)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const val = values[currentField].trim()
      if (!val) return

      setHistory((h) => [...h, { prompt: PROMPTS[currentField], value: val }])

      const nextIndex = currentIndex + 1
      if (nextIndex < fields.length) {
        setCurrentField(fields[nextIndex])
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    if (!values.name || !values.email || !values.message) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/20 to-bg pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-highlight/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-highlight mb-3 block">05. contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Say <span className="text-gradient">Hello</span>
          </h2>
          <p className="mt-4 text-foreground/60 max-w-md">
            Have a project in mind? Let&apos;s talk. Fill in the CLI below or reach me directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* CLI Form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-surface/60 border border-white/10 rounded-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                <Terminal size={12} className="ml-3 text-foreground/40" />
                <span className="text-foreground/40 text-xs font-mono">contact --interactive</span>
              </div>

              <div className="p-6 font-mono text-sm min-h-[340px] flex flex-col">
                {/* Init message */}
                <div className="text-foreground/40 mb-4">
                  <p>$ node contact.js</p>
                  <p className="text-accent-teal">Initializing contact form...</p>
                  <p className="text-foreground/60 mt-1">Press Enter to advance. Shift+Enter for newlines.</p>
                </div>

                {/* History */}
                <div className="space-y-2 mb-4">
                  {history.map((entry, i) => (
                    <div key={i}>
                      <p className="text-foreground/50">{entry.prompt}</p>
                      <p className="text-accent-teal pl-2">{'> '}{entry.value}</p>
                    </div>
                  ))}
                </div>

                {/* Current field */}
                <AnimatePresence mode="wait">
                  {!submitted && !sending && (
                    <motion.div
                      key={currentField}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-foreground/50 mb-2">{PROMPTS[currentField]}</p>
                      {currentField === 'message' ? (
                        <textarea
                          autoFocus
                          value={values.message}
                          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                          onKeyDown={handleKeyDown}
                          rows={4}
                          placeholder="Type your message... (Enter to send)"
                          className="w-full bg-transparent text-foreground placeholder-foreground/20 outline-none resize-none border-l-2 border-accent-blue pl-3"
                        />
                      ) : (
                        <div className="flex items-center gap-1 border-l-2 border-accent-blue pl-3">
                          <input
                            autoFocus
                            type={currentField === 'email' ? 'email' : 'text'}
                            value={values[currentField]}
                            onChange={(e) => setValues((v) => ({ ...v, [currentField]: e.target.value }))}
                            onKeyDown={handleKeyDown}
                            placeholder={`Type and press Enter...`}
                            className="bg-transparent text-foreground placeholder-foreground/20 outline-none flex-1"
                          />
                          <span className="animate-cursor-blink text-foreground">█</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sending */}
                {sending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-accent-blue"
                  >
                    <span className="animate-spin">⠋</span>
                    <span>Sending message...</span>
                  </motion.div>
                )}

                {/* Success */}
                {submitted && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-1"
                  >
                    <p className="text-accent-teal">✓ Message sent successfully!</p>
                    <p className="text-foreground/50">{'> '} I&apos;ll get back to you within 24 hours.</p>
                    <p className="text-foreground/30 mt-3">$ _</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col justify-center gap-8"
          >
            {[
              {
                label: 'Email',
                value: 'hello@altan.dev',
                href: 'mailto:hello@altan.dev',
                color: '#3B82F6',
              },
              {
                label: 'GitHub',
                value: 'github.com/altanesmer',
                href: '#',
                color: '#8B5CF6',
              },
              {
                label: 'LinkedIn',
                value: 'linkedin.com/in/altanesmer',
                href: '#',
                color: '#14B8A6',
              },
            ].map((contact) => (
              <div key={contact.label} className="group">
                <p className="font-mono text-xs text-foreground/40 mb-1">{contact.label}</p>
                <a
                  href={contact.href}
                  className="font-semibold text-foreground hover:underline underline-offset-4 transition-colors"
                  style={{ '--hover-color': contact.color } as React.CSSProperties}
                >
                  {contact.value}
                </a>
              </div>
            ))}

            <div className="mt-4 p-4 border border-white/10 rounded-xl bg-surface/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                <span className="font-mono text-xs text-accent-teal">Available</span>
              </div>
              <p className="text-sm text-foreground/60">
                Open to full-time roles and freelance projects. Response time: &lt;24h.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

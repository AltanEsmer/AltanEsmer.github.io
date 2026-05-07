'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ASCII_SIGNATURE = `
 ░█████╗░██╗░░░░░████████╗░█████╗░███╗░░██╗
 ██╔══██╗██║░░░░░╚══██╔══╝██╔══██╗████╗░██║
 ███████║██║░░░░░░░░██║░░░███████║██╔██╗██║
 ██╔══██║██║░░░░░░░░██║░░░██╔══██║██║╚████║
 ██║░░██║███████╗░░░██║░░░██║░░██║██║░╚███║
 ╚═╝░░╚═╝╚══════╝░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚══╝
`

const LINKS = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Resume', href: '#' },
]

export function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ASCII signature */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 overflow-x-auto"
        >
          <pre className="font-mono text-xs leading-tight text-gradient inline-block whitespace-pre">
            {ASCII_SIGNATURE}
          </pre>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Tagline */}
          <div className="space-y-1">
            <p className="font-mono text-sm text-foreground/60">
              <span className="text-accent-teal">$</span> Built with{' '}
              <span className="text-accent-blue">Next.js</span>,{' '}
              <span className="text-accent-purple">Three.js</span> &{' '}
              <span className="text-highlight">Framer Motion</span>
            </p>
            <p className="font-mono text-xs text-foreground/30">
              Designed & coded by Altan Esmer
            </p>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap gap-6">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-foreground/30">
            © {year} Altan Esmer. All rights reserved.
          </p>
          <p className="font-mono text-xs text-foreground/20">
            <span className="text-accent-teal">v1.0.0</span> — last deploy: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'

const IcosahedronScene = dynamic(
  () => import('./IcosahedronScene').then((m) => m.IcosahedronScene),
  { ssr: false }
)

const TERMINAL_LINES = [
  { prefix: '$ ', text: 'whoami', color: 'text-accent-teal' },
  { prefix: '> ', text: 'Altan Esmer', color: 'text-foreground' },
  { prefix: '$ ', text: 'cat role.txt', color: 'text-accent-teal' },
  { prefix: '> ', text: 'Full-Stack Developer & Creative Engineer', color: 'text-foreground' },
  { prefix: '$ ', text: 'ls skills/', color: 'text-accent-teal' },
  { prefix: '> ', text: 'TypeScript  React  Next.js  Node.js  WebGL', color: 'text-accent-blue' },
  { prefix: '$ ', text: 'status --verbose', color: 'text-accent-teal' },
  { prefix: '> ', text: 'Available for exciting projects ✓', color: 'text-accent-purple' },
]

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentText, setCurrentText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleLines(TERMINAL_LINES.length)
      return
    }

    const line = TERMINAL_LINES[lineIndex]
    if (!line) return

    const fullText = line.prefix + line.text

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      }, 35)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1)
        setCurrentText('')
        setCharIndex(0)
        setLineIndex((i) => Math.min(i + 1, TERMINAL_LINES.length - 1))
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [lineIndex, charIndex, prefersReducedMotion])

  return (
    <div className="bg-surface/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-foreground/40 text-xs">altan@dev:~</span>
      </div>
      {/* Terminal body */}
      <div className="p-5 space-y-1.5 min-h-[280px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex gap-1">
            <span className="text-accent-teal opacity-60">{line.prefix}</span>
            <span className={line.color}>{line.text}</span>
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && (
          <div className="flex gap-1">
            <span className={TERMINAL_LINES[lineIndex]?.color ?? 'text-foreground'}>
              {currentText}
            </span>
            <span className="animate-cursor-blink text-foreground">█</span>
          </div>
        )}
        {visibleLines >= TERMINAL_LINES.length && (
          <div className="flex gap-1 mt-2">
            <span className="text-accent-teal opacity-60">$ </span>
            <span className="animate-cursor-blink text-foreground">█</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-surface/50 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-accent-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-accent-purple/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-accent-teal border border-accent-teal/30 rounded-full px-3 py-1.5 bg-accent-teal/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                Open to work
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-foreground">Building </span>
                <span className="text-gradient">digital</span>
                <br />
                <span className="text-foreground">experiences</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-foreground/60 text-lg leading-relaxed max-w-md">
              Full-stack developer crafting fast, accessible, and visually striking web applications.
              Turning ideas into production-ready products.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-accent-blue text-white font-semibold rounded-lg hover:bg-accent-blue/90 transition-all hover:shadow-lg hover:shadow-accent-blue/25 hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-white/20 text-foreground font-semibold rounded-lg hover:border-accent-purple/50 hover:bg-surface/50 transition-all hover:-translate-y-0.5"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="space-y-6"
          >
            <TerminalWindow />

            {/* 3D Scene */}
            <div className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-white/10 bg-surface/30">
              <IcosahedronScene />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 font-mono text-xs text-foreground/30">
                WebGL • Three.js
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-foreground/30">scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

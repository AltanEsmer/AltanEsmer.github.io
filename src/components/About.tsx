'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const BIO_JSON = {
  name: 'Altan Esmer',
  title: 'Full-Stack Developer',
  location: 'Remote 🌍',
  yearsExperience: 6,
  focus: ['Web Performance', 'Creative Engineering', 'Open Source'],
  education: {
    degree: 'B.Sc. Computer Science',
    university: 'Istanbul Technical University',
    year: 2019,
  },
  interests: ['WebGL/Graphics', 'Systems Programming', 'Music Production'],
  languages: { Turkish: 'native', English: 'fluent', German: 'conversational' },
  openToWork: true,
}

const TIMELINE = [
  {
    year: '2024',
    role: 'Senior Full-Stack Engineer',
    company: 'Stealth AI Startup',
    description: 'Leading frontend architecture for an AI-native productivity suite. Built real-time collaboration features serving 10k+ daily users.',
    color: '#3B82F6',
  },
  {
    year: '2022',
    role: 'Software Engineer',
    company: 'Fintech Scale-up',
    description: 'Developed payment orchestration platform handling $2M+ daily transactions. Implemented comprehensive observability stack.',
    color: '#8B5CF6',
  },
  {
    year: '2021',
    role: 'Frontend Developer',
    company: 'Creative Agency',
    description: 'Crafted interactive web experiences for global brands. Specialized in WebGL animations and micro-interactions.',
    color: '#14B8A6',
  },
  {
    year: '2019',
    role: 'Junior Developer',
    company: 'B2B SaaS',
    description: 'Bootstrapped the frontend from scratch. Built internal tooling that reduced deployment time by 60%.',
    color: '#EC4899',
  },
]

function JsonHighlight({ data, indent = 0 }: { data: unknown; indent?: number }) {
  const pad = '  '.repeat(indent)

  if (typeof data === 'string') {
    return <span className="text-accent-teal">&quot;{data}&quot;</span>
  }
  if (typeof data === 'number') {
    return <span className="text-highlight">{data}</span>
  }
  if (typeof data === 'boolean') {
    return <span className="text-accent-blue">{String(data)}</span>
  }
  if (Array.isArray(data)) {
    return (
      <>
        <span className="text-foreground/60">[</span>
        {data.map((item, i) => (
          <div key={i} className="pl-4">
            {pad}  <JsonHighlight data={item} indent={indent + 1} />
            {i < data.length - 1 && <span className="text-foreground/60">,</span>}
          </div>
        ))}
        <span className="text-foreground/60">{pad}]</span>
      </>
    )
  }
  if (typeof data === 'object' && data !== null) {
    const entries = Object.entries(data)
    return (
      <>
        <span className="text-foreground/60">{'{'}</span>
        {entries.map(([key, val], i) => (
          <div key={key} className="pl-4">
            <span className="text-accent-purple">&quot;{key}&quot;</span>
            <span className="text-foreground/60">: </span>
            <JsonHighlight data={val} indent={indent + 1} />
            {i < entries.length - 1 && <span className="text-foreground/60">,</span>}
          </div>
        ))}
        <span className="text-foreground/60">{pad}{'}'}</span>
      </>
    )
  }
  return null
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
      {/* Timeline dot */}
      <div
        className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-bg"
        style={{ background: item.color }}
      />

      <div className="space-y-1 pb-8">
        <span className="font-mono text-xs text-foreground/40">{item.year}</span>
        <h4 className="font-bold text-foreground">{item.role}</h4>
        <p className="text-sm font-medium" style={{ color: item.color }}>
          {item.company}
        </p>
        <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-40, 40]
  )

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/15 to-bg pointer-events-none" />

      {/* Parallax BG element */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-accent-teal mb-3 block">04. about</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            The <span className="text-gradient">Person</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* JSON Bio */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-surface/60 border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Editor header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-foreground/40 text-xs font-mono">bio.json</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
              <JsonHighlight data={BIO_JSON} />
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-bold text-foreground/60 text-sm uppercase tracking-wider mb-8">
              Experience
            </h3>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year + item.company} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

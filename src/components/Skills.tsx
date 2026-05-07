'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ConstellationScene = dynamic(
  () => import('./ConstellationScene').then((m) => m.ConstellationScene),
  { ssr: false }
)

const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    color: '#3B82F6',
    skills: [
      { name: 'TypeScript', level: 95 },
      { name: 'React / Next.js', level: 93 },
      { name: 'WebGL / Three.js', level: 78 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    category: 'Backend',
    color: '#8B5CF6',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Redis', level: 75 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    category: 'DevOps',
    color: '#14B8A6',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 70 },
      { name: 'CI/CD', level: 83 },
      { name: 'AWS / GCP', level: 72 },
    ],
  },
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-sm text-foreground/80">{name}</span>
        <span className="font-mono text-xs text-foreground/40">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }
          }
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/20 to-bg pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-accent-purple mb-3 block">03. skills</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: 3D Constellation */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-surface/30"
          >
            <ConstellationScene />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-bg/60" />
            <div className="absolute bottom-4 left-4 font-mono text-xs text-foreground/30">
              Interactive 3D • Drag to explore
            </div>

            {/* Node labels */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5">
              {['TypeScript', 'React', 'WebGL'].map((skill, i) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-2 py-0.5 bg-bg/80 border border-white/10 rounded-full text-foreground/50"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Skill bars */}
          <div className="space-y-10">
            {SKILL_CATEGORIES.map((cat, catIdx) => (
              <motion.div
                key={cat.category}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.15 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <h3 className="font-bold text-foreground/80 text-sm uppercase tracking-wider">
                    {cat.category}
                  </h3>
                </div>
                <div className="space-y-3 pl-5">
                  {cat.skills.map((skill, skillIdx) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={catIdx * 0.1 + skillIdx * 0.07}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

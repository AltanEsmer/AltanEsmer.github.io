'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'NeuralOS',
    description: 'An AI-powered operating system interface with natural language commands, adaptive workflows, and real-time process visualization.',
    tech: ['Next.js', 'TypeScript', 'WebGL', 'OpenAI API'],
    accent: '#3B82F6',
    size: 'large',
    year: '2024',
    status: 'Production',
  },
  {
    id: 2,
    title: 'Synapse Graph',
    description: 'Real-time knowledge graph explorer for visualizing complex data relationships with force-directed layouts.',
    tech: ['React', 'D3.js', 'GraphQL'],
    accent: '#8B5CF6',
    size: 'medium',
    year: '2024',
    status: 'Open Source',
  },
  {
    id: 3,
    title: 'Pixel Ledger',
    description: 'NFT portfolio tracker with on-chain analytics and multi-chain support.',
    tech: ['Next.js', 'ethers.js', 'Tailwind'],
    accent: '#14B8A6',
    size: 'small',
    year: '2023',
    status: 'Production',
  },
  {
    id: 4,
    title: 'CodeSprint',
    description: 'Collaborative coding platform with real-time pair programming, code execution sandbox, and video chat integration.',
    tech: ['React', 'Socket.io', 'Monaco Editor', 'Docker'],
    accent: '#EC4899',
    size: 'medium',
    year: '2023',
    status: 'Beta',
  },
  {
    id: 5,
    title: 'Waveform',
    description: 'Audio visualizer built with Web Audio API and WebGL shaders.',
    tech: ['WebGL', 'GLSL', 'Web Audio API'],
    accent: '#3B82F6',
    size: 'small',
    year: '2023',
    status: 'Open Source',
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0]
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      className="group relative bg-surface/60 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col"
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      {/* Accent top bar */}
      <div
        className="h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: project.accent }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}, transparent 70%)` }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-foreground/40">{project.year}</span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded-full border"
                style={{ color: project.accent, borderColor: `${project.accent}40` }}
              >
                {project.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              aria-label="View on GitHub"
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Github size={14} />
            </button>
            <button
              aria-label="Open project"
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        <p className="text-foreground/60 text-sm leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-1 bg-bg/60 border border-white/10 rounded-md text-foreground/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/10 to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-accent-blue mb-3 block">02. projects</span>
          <div className="flex items-end gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Selected <span className="text-gradient">Work</span>
            </h2>
            <a
              href="#"
              className="mb-1 flex items-center gap-1 font-mono text-sm text-foreground/40 hover:text-accent-blue transition-colors group"
            >
              All projects <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {/* Large card — spans 2 cols */}
          <div className="lg:col-span-2">
            <ProjectCard project={PROJECTS[0]} index={0} />
          </div>

          {/* Regular */}
          <ProjectCard project={PROJECTS[1]} index={1} />
          <ProjectCard project={PROJECTS[2]} index={2} />

          {/* Medium card — spans 2 cols */}
          <div className="lg:col-span-2">
            <ProjectCard project={PROJECTS[3]} index={3} />
          </div>

          <ProjectCard project={PROJECTS[4]} index={4} />
        </div>
      </div>
    </section>
  )
}

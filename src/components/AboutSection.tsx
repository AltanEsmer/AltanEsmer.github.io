'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const timeline = [
  {
    year: '2026',
    title: 'Senior Engineer',
    org: 'Building the Future',
    desc: 'Leading frontend architecture for high-traffic products.',
    color: 'accent-blue',
  },
  {
    year: '2024',
    title: 'Full Stack Engineer',
    org: 'Tech Startup',
    desc: 'Built a real-time collaboration platform from the ground up.',
    color: 'accent-purple',
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    org: 'Digital Agency',
    desc: 'Delivered 20+ client projects with a focus on performance.',
    color: 'accent-teal',
  },
  {
    year: '2021',
    title: 'B.Sc. Computer Science',
    org: 'University',
    desc: 'Graduated with honors, specializing in distributed systems.',
    color: 'highlight',
  },
  {
    year: '2019',
    title: 'First Line of Code',
    org: 'Self-taught',
    desc: 'Started learning to code. Never looked back.',
    color: 'accent-blue',
  },
]

const colorMap: Record<string, string> = {
  'accent-blue': '#3B82F6',
  'accent-purple': '#8B5CF6',
  'accent-teal': '#14B8A6',
  highlight: '#EC4899',
}

const colorClassMap: Record<string, string> = {
  'accent-blue': 'text-accent-blue',
  'accent-purple': 'text-accent-purple',
  'accent-teal': 'text-accent-teal',
  highlight: 'text-highlight',
}

// Parallax offsets per timeline item index
const parallaxRanges: [number, number][] = [
  [0, -30],
  [0, -20],
  [0, -10],
  [0, -5],
  [0, 0],
]

function JsonBio({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card overflow-hidden h-full"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-surface/80">
        <span className="w-3 h-3 rounded-full bg-highlight" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-accent-teal" />
        <span className="ml-4 text-xs font-mono text-port-text/50 select-none">
          bio.json
        </span>
      </div>

      {/* JSON body */}
      <div className="bg-black/50 p-5 overflow-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code>
            <span className="text-port-text/50">{'{'}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;name&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-accent-blue">&quot;Altan Esmer&quot;</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;role&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-accent-blue">&quot;Software Engineer&quot;</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;location&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-accent-blue">&quot;Istanbul, Turkey&quot;</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;experience_years&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-accent-purple">5</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;focus&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-port-text/50">{'['}</span>
            {'\n'}

            {'    '}
            <span className="text-accent-blue">&quot;Web Performance&quot;</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'    '}
            <span className="text-accent-blue">&quot;Creative Coding&quot;</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'    '}
            <span className="text-accent-blue">&quot;Systems Design&quot;</span>
            {'\n'}

            {'  '}
            <span className="text-port-text/50">{']'}</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;currently_building&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-accent-blue">
              &quot;Next-gen portfolio experiences&quot;
            </span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;open_to&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-accent-blue">&quot;Exciting opportunities&quot;</span>
            <span className="text-port-text/60">{','}</span>
            {'\n'}

            {'  '}
            <span className="text-accent-teal">&quot;coffee_per_day&quot;</span>
            <span className="text-port-text/60">{': '}</span>
            <span className="text-accent-purple">3</span>
            {'\n'}

            <span className="text-port-text/50">{'}'}</span>
          </code>
        </pre>
      </div>
    </motion.div>
  )
}

function TimelineItem({
  item,
  index,
  scrollYProgress,
  reduced,
}: {
  item: (typeof timeline)[number]
  index: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  reduced: boolean
}) {
  const range = parallaxRanges[index] ?? [0, 0]
  const y = useTransform(scrollYProgress, [0, 1], range)

  return (
    <motion.div
      style={{ y: reduced ? 0 : y }}
      initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex gap-4"
    >
      {/* Left: year + line */}
      <div className="flex flex-col items-center gap-0 flex-shrink-0 w-14">
        <span className="font-mono text-xs text-port-text/50 leading-tight pt-0.5">
          {item.year}
        </span>
        {index < timeline.length - 1 && (
          <div
            className="mt-2 w-px flex-1 min-h-[2.5rem]"
            style={{
              background: `linear-gradient(to bottom, ${colorMap[item.color]}, transparent)`,
            }}
          />
        )}
      </div>

      {/* Dot connector */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-md"
          style={{ backgroundColor: colorMap[item.color] }}
        />
      </div>

      {/* Right: content */}
      <div className="pb-8">
        <p className="font-semibold text-port-text leading-tight">{item.title}</p>
        <p className={`text-sm mt-0.5 ${colorClassMap[item.color]}`}>
          {item.org}
        </p>
        <p className="text-port-text/70 text-sm mt-1">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const reduced = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center lg:text-left"
        >
          <h2 className="gradient-text text-4xl font-bold mb-3">About</h2>
          <p className="text-port-text/70 text-lg">The person behind the code</p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* LEFT — JSON bio */}
          <div className="w-full lg:w-1/2">
            <JsonBio reduced={reduced} />
          </div>

          {/* RIGHT — Timeline */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col">
              {timeline.map((item, index) => (
                <TimelineItem
                  key={item.year + item.title}
                  item={item}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  reduced={reduced}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

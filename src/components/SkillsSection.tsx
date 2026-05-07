'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const ConstellationScene = dynamic(() => import('./ConstellationScene'), { ssr: false })

const categories = [
  {
    name: 'Frontend',
    color: '#3B82F6',
    colorClass: 'text-accent-blue',
    skills: ['React', 'TypeScript', 'Next.js', 'Three.js', 'Tailwind', 'Framer'],
  },
  {
    name: 'Backend',
    color: '#8B5CF6',
    colorClass: 'text-accent-purple',
    skills: ['Node.js', 'Python', 'Rust', 'PostgreSQL', 'GraphQL'],
  },
  {
    name: 'Tools',
    color: '#14B8A6',
    colorClass: 'text-accent-teal',
    skills: ['Docker', 'Git', 'Figma'],
  },
]

export default function SkillsSection() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center lg:text-left">
            <h2 className="gradient-text text-4xl font-bold mb-3">Skills</h2>
            <p className="text-port-text/70 text-lg">Technologies I work with</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* 3D Constellation Canvas */}
            <div className="w-full lg:w-[60%]">
              <div className="glass-card overflow-hidden h-[500px] lg:h-[600px]">
                <ConstellationScene />
              </div>
            </div>

            {/* Legend */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className={`font-semibold text-sm ${cat.colorClass}`}>
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-surface border border-white/10 text-port-text/80 text-xs rounded-full px-2.5 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

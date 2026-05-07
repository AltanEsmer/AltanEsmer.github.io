'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Line } from '@react-three/drei'
import { Vector3, Mesh } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

/* ------------------------------------------------------------------ */
/* Skill data — 9 frontend / 7 backend / 5 devops / 4 design = 25     */
/* ------------------------------------------------------------------ */
type SkillNode = {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'design'
  position: [number, number, number]
  usage: string
}

const skills: SkillNode[] = [
  // Frontend (9)
  { name: 'TypeScript', category: 'frontend', position: [-2.2, 1.8, 0.3], usage: 'daily — type-driven design everywhere' },
  { name: 'React', category: 'frontend', position: [-1.0, 2.6, 0.0], usage: 'primary UI layer for all projects' },
  { name: 'Next.js', category: 'frontend', position: [0.8, 2.2, -0.4], usage: 'static + SSR deployments on Pages/Vercel' },
  { name: 'Tailwind', category: 'frontend', position: [2.0, 1.4, 0.5], usage: 'utility-first — no more CSS files' },
  { name: 'Framer Motion', category: 'frontend', position: [-2.0, 0.2, 1.0], usage: 'scroll animations, gestures, layout transitions' },
  { name: 'Three.js', category: 'frontend', position: [0.2, 0.8, 1.8], usage: 'when 2D won\'t cut it' },
  { name: 'Vite', category: 'frontend', position: [2.4, -0.6, 0.2], usage: 'default bundler for non-Next projects' },
  { name: 'Svelte', category: 'frontend', position: [-1.4, -1.0, 1.2], usage: 'lightweight dashboards, minimal bundle size' },
  { name: 'MDX', category: 'frontend', position: [1.2, -0.4, -1.4], usage: 'content authoring in React ecosystems' },

  // Backend (7)
  { name: 'Node', category: 'backend', position: [2.2, -1.8, -0.3], usage: 'APIs, scripts, tooling — daily driver' },
  { name: 'Python', category: 'backend', position: [1.0, -2.6, 0.4], usage: 'data pipelines, fast prototypes, FastAPI' },
  { name: 'Postgres', category: 'backend', position: [-0.6, -2.4, -0.6], usage: 'primary store everywhere — JSONB + full-text' },
  { name: 'Rust', category: 'backend', position: [-2.2, -1.6, 0.0], usage: 'performance-critical paths, small CLI tools' },
  { name: 'tRPC', category: 'backend', position: [0.0, -1.6, 1.4], usage: 'end-to-end type safety between Next + Node' },
  { name: 'FastAPI', category: 'backend', position: [-1.8, -0.8, -1.2], usage: 'Python micro-services with OpenAPI schemas' },
  { name: 'Redis', category: 'backend', position: [1.6, -2.0, -1.0], usage: 'pub/sub, caching, rate-limiting' },

  // DevOps (5)
  { name: 'Docker', category: 'devops', position: [3.0, 0.4, -0.2], usage: 'every project ships containerised' },
  { name: 'GitHub Actions', category: 'devops', position: [-3.0, 0.6, 0.0], usage: 'CI/CD — lint, build, deploy on every push' },
  { name: 'Vercel', category: 'devops', position: [2.6, 1.0, -1.0], usage: 'edge deploys for Next.js projects' },
  { name: 'Cloudflare', category: 'devops', position: [-2.6, 1.2, -0.6], usage: 'DNS, workers, R2 object storage' },
  { name: 'Linux', category: 'devops', position: [0.4, -0.8, 2.4], usage: 'daily OS — bash, systemd, nginx' },

  // Design (4)
  { name: 'Figma', category: 'design', position: [-0.4, 1.4, -2.2], usage: 'wireframes and component specs' },
  { name: 'Linear', category: 'design', position: [1.4, 1.0, -2.0], usage: 'issue tracking for every project' },
  { name: 'Notion', category: 'design', position: [-1.0, 0.0, -2.4], usage: 'docs, runbooks, async notes' },
  { name: 'Whimsical', category: 'design', position: [0.6, -1.2, -2.2], usage: 'quick flowcharts before writing code' },
]

const categoryColor: Record<SkillNode['category'], string> = {
  frontend: '#3B82F6',
  backend: '#8B5CF6',
  devops: '#14B8A6',
  design: '#EC4899',
}

/* ------------------------------------------------------------------ */
/* Auto-generate connections between nearby nodes (within distance 2.4) */
/* ------------------------------------------------------------------ */
function buildConnections(): [number, number][] {
  const edges: [number, number][] = []
  const maxDist = 2.4
  for (let i = 0; i < skills.length; i++) {
    for (let j = i + 1; j < skills.length; j++) {
      const a = new Vector3(...skills[i].position)
      const b = new Vector3(...skills[j].position)
      if (a.distanceTo(b) < maxDist) {
        edges.push([i, j])
      }
    }
  }
  return edges
}

const connections = buildConnections()

/* ------------------------------------------------------------------ */
/* Node sphere component                                                */
/* ------------------------------------------------------------------ */
function SkillSphere({
  skill,
  index,
  onHover,
  onUnhover,
  hovered,
}: {
  skill: SkillNode
  index: number
  onHover: (index: number) => void
  onUnhover: () => void
  hovered: boolean
}) {
  const meshRef = useRef<Mesh>(null)
  const color = categoryColor[skill.category]

  useFrame(() => {
    if (meshRef.current) {
      const scale = hovered ? 1.6 : 1.0
      meshRef.current.scale.setScalar(
        meshRef.current.scale.x + (scale - meshRef.current.scale.x) * 0.12
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={skill.position}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(index) }}
      onPointerLeave={() => onUnhover()}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.6}
      />
      {hovered && (
        <Html
          distanceFactor={6}
          style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        >
          <div
            style={{
              background: 'rgba(10,14,39,0.92)',
              border: '1px solid rgba(42,44,90,0.9)',
              borderRadius: '8px',
              padding: '7px 12px',
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '11px',
              color: '#E8EAF6',
              lineHeight: '1.5',
              boxShadow: `0 0 16px ${color}40`,
              transform: 'translate(-50%, -130%)',
            }}
          >
            <span style={{ color, fontWeight: 600 }}>{skill.name}</span>
            <br />
            <span style={{ color: '#9aa0d4' }}>{skill.usage}</span>
          </div>
        </Html>
      )}
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* Scene inner component                                               */
/* ------------------------------------------------------------------ */
function Scene({
  hoveredIndex,
  setHoveredIndex,
  orbitRef,
}: {
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
  orbitRef: React.MutableRefObject<OrbitControlsImpl | null>
}) {
  const reducedMotion = useRef(false)
  const userInteracting = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Control auto-rotate based on user interaction
  const handleStart = useCallback(() => {
    userInteracting.current = true
    if (orbitRef.current) orbitRef.current.autoRotate = false
  }, [orbitRef])

  const handleEnd = useCallback(() => {
    userInteracting.current = false
    if (orbitRef.current) orbitRef.current.autoRotate = !reducedMotion.current
  }, [orbitRef])

  return (
    <>
      <OrbitControls
        ref={orbitRef}
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion.current}
        autoRotateSpeed={0.5}
        onStart={handleStart}
        onEnd={handleEnd}
      />

      {/* Connections */}
      {connections.map(([a, b], i) => {
        const start = new Vector3(...skills[a].position)
        const end = new Vector3(...skills[b].position)
        return (
          <Line
            key={i}
            points={[start, end]}
            color="#2A2B4A"
            lineWidth={0.6}
            transparent
            opacity={0.5}
          />
        )
      })}

      {/* Nodes */}
      {skills.map((skill, i) => (
        <SkillSphere
          key={skill.name}
          skill={skill}
          index={i}
          hovered={hoveredIndex === i}
          onHover={setHoveredIndex}
          onUnhover={() => setHoveredIndex(null)}
        />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Export                                                               */
/* ------------------------------------------------------------------ */
export default function ConstellationScene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const orbitRef = useRef<OrbitControlsImpl>(null)

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', cursor: 'grab' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8B5CF6" />
      <Scene
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        orbitRef={orbitRef}
      />
    </Canvas>
  )
}

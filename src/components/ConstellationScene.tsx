'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, Line, OrbitControls } from '@react-three/drei'
import { Vector3, Group } from 'three'

const skills = [
  { name: 'React', category: 'frontend', position: [-2.5, 1.5, 0] as [number, number, number] },
  { name: 'TypeScript', category: 'frontend', position: [-1, 2.5, 0.5] as [number, number, number] },
  { name: 'Next.js', category: 'frontend', position: [1, 2, -0.5] as [number, number, number] },
  { name: 'Three.js', category: 'frontend', position: [2.5, 1, 0.3] as [number, number, number] },
  { name: 'Tailwind', category: 'frontend', position: [-2, -0.5, 0.8] as [number, number, number] },
  { name: 'Framer', category: 'frontend', position: [0, 0.5, 1.5] as [number, number, number] },
  { name: 'Node.js', category: 'backend', position: [2, -1.5, -0.5] as [number, number, number] },
  { name: 'Python', category: 'backend', position: [1.5, -2.5, 0.2] as [number, number, number] },
  { name: 'Rust', category: 'backend', position: [-1, -2, -0.8] as [number, number, number] },
  { name: 'PostgreSQL', category: 'backend', position: [-2.5, -1.5, 0.5] as [number, number, number] },
  { name: 'GraphQL', category: 'backend', position: [0, -1, -1.5] as [number, number, number] },
  { name: 'Docker', category: 'tools', position: [3, 0.5, -0.3] as [number, number, number] },
  { name: 'Git', category: 'tools', position: [-3, 0, 0.5] as [number, number, number] },
  { name: 'Figma', category: 'tools', position: [0.5, -0.5, 2] as [number, number, number] },
]

const categoryColor: Record<string, string> = {
  frontend: '#3B82F6',
  backend: '#8B5CF6',
  tools: '#14B8A6',
}

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 5], [5, 0], [5, 4], [4, 0],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 6], [6, 5],
  [11, 12], [12, 13], [13, 11], [11, 6], [12, 3],
]

function Scene() {
  const groupRef = useRef<Group>(null)
  const reducedMotion = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useFrame((_state, delta) => {
    if (!reducedMotion.current && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {connections.map(([a, b], i) => {
        const start = new Vector3(...skills[a].position)
        const end = new Vector3(...skills[b].position)
        return (
          <Line
            key={i}
            points={[start, end]}
            color="#2A2B4A"
            lineWidth={0.8}
          />
        )
      })}

      {skills.map((skill) => {
        const color = categoryColor[skill.category]
        return (
          <Billboard
            key={skill.name}
            position={skill.position}
          >
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
              />
            </mesh>
            <Text
              fontSize={0.18}
              color="#E8EAF6"
              anchorX="left"
              position={[0.12, 0, 0]}
              maxWidth={2}
            >
              {skill.name}
            </Text>
          </Billboard>
        )
      })}
    </group>
  )
}

export default function ConstellationScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7] }}
      gl={{ alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Scene />
      <OrbitControls enableZoom={false} autoRotate={false} />
    </Canvas>
  )
}

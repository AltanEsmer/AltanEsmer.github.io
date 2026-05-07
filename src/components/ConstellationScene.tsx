'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const SKILL_NODES = [
  { name: 'TypeScript', x: 0, y: 0, z: 0, color: '#3B82F6', size: 0.15 },
  { name: 'React', x: 1.5, y: 0.5, z: 0.3, color: '#14B8A6', size: 0.12 },
  { name: 'Next.js', x: -1.2, y: 0.8, z: -0.2, color: '#E8EAF6', size: 0.12 },
  { name: 'Node.js', x: 0.8, y: -1.2, z: 0.5, color: '#14B8A6', size: 0.1 },
  { name: 'PostgreSQL', x: -1.5, y: -0.6, z: 0.3, color: '#3B82F6', size: 0.1 },
  { name: 'WebGL', x: 0.3, y: 1.5, z: -0.4, color: '#8B5CF6', size: 0.1 },
  { name: 'Docker', x: -0.5, y: -1.5, z: -0.3, color: '#3B82F6', size: 0.09 },
  { name: 'Redis', x: 1.8, y: -0.3, z: -0.5, color: '#EC4899', size: 0.09 },
  { name: 'GraphQL', x: -1.8, y: 0.2, z: 0.6, color: '#EC4899', size: 0.09 },
  { name: 'Rust', x: 0.6, y: 0.9, z: 1.2, color: '#8B5CF6', size: 0.08 },
  { name: 'Python', x: -0.8, y: -0.4, z: 1.4, color: '#3B82F6', size: 0.1 },
  { name: 'Kubernetes', x: 1.2, y: 1.2, z: -0.9, color: '#14B8A6', size: 0.09 },
]

const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 3], [1, 7], [2, 4], [2, 8], [3, 6],
  [5, 9], [6, 10], [7, 11], [8, 9], [10, 11],
]

function ConstellationMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08 + mouse.x * 0.3
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1 + mouse.y * 0.1
  })

  const linePositions = useMemo(() => {
    const positions: number[] = []
    CONNECTIONS.forEach(([a, b]) => {
      const nodeA = SKILL_NODES[a]
      const nodeB = SKILL_NODES[b]
      if (!nodeA || !nodeB) return
      positions.push(nodeA.x, nodeA.y, nodeA.z)
      positions.push(nodeB.x, nodeB.y, nodeB.z)
    })
    return new Float32Array(positions)
  }, [])

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3B82F6" transparent opacity={0.15} />
      </lineSegments>

      {/* Nodes */}
      {SKILL_NODES.map((node) => (
        <mesh key={node.name} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export function ConstellationScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      className="!w-full !h-full"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3B82F6" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#8B5CF6" />
      <ConstellationMesh />
    </Canvas>
  )
}

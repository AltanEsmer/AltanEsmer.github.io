'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
  })

  return (
    <Icosahedron ref={meshRef} args={[1.4, 1]}>
      <MeshDistortMaterial
        color="#3B82F6"
        attach="material"
        distort={0.3}
        speed={2}
        wireframe={false}
        roughness={0.1}
        metalness={0.8}
        emissive="#8B5CF6"
        emissiveIntensity={0.3}
      />
    </Icosahedron>
  )
}

function WireframeIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
  })

  return (
    <Icosahedron ref={meshRef} args={[1.5, 1]}>
      <meshBasicMaterial color="#3B82F6" wireframe opacity={0.15} transparent />
    </Icosahedron>
  )
}

export function IcosahedronScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      className="!w-full !h-full"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
      <RotatingIcosahedron />
      <WireframeIcosahedron />
    </Canvas>
  )
}

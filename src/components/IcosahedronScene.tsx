'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Icosahedron() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const rotationSpeeds = useRef({ y: 0.4, x: 0.2 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      rotationSpeeds.current = { y: 0, x: 0 };
    }
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        rotationSpeeds.current = { y: 0, x: 0 };
      } else {
        rotationSpeeds.current = { y: 0.4, x: 0.2 };
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useFrame((state, delta) => {
    if (outerRef.current && innerRef.current) {
      outerRef.current.rotation.y += rotationSpeeds.current.y * delta;
      outerRef.current.rotation.x += rotationSpeeds.current.x * delta;
      innerRef.current.rotation.y = outerRef.current.rotation.y;
      innerRef.current.rotation.x = outerRef.current.rotation.x;

      const floatY = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      outerRef.current.position.y = floatY;
      innerRef.current.position.y = floatY;
    }
  });

  return (
    <>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#3B82F6"
          wireframe={true}
          emissive="#8B5CF6"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshStandardMaterial
          color="#0A0E27"
          transparent={true}
          opacity={0.6}
          emissive="#1A1B3A"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
}

export default function IcosahedronScene() {
  return (
    <Canvas
      style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#3B82F6" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#8B5CF6" />
      <Icosahedron />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}

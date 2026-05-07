'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const IcosahedronScene = dynamic(() => import('./IcosahedronScene'), {
  ssr: false,
});

const terminalLines = [
  { type: 'command', text: '$ whoami' },
  { type: 'output', text: 'altan_esmer' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ cat about.txt' },
  { type: 'output', text: 'Software Engineer & Creative Coder' },
  { type: 'output', text: 'Building the web, one pixel at a time.' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ ls skills/' },
  { type: 'output', text: 'react/   typescript/   threejs/   nextjs/' },
  { type: 'output', text: 'python/  rust/         docker/    figma/' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ git log --oneline -3' },
  { type: 'output', text: 'a3f9c2b feat: add WebGL particle system' },
  { type: 'output', text: 'e1d4b88 fix: optimize render pipeline' },
  { type: 'output', text: '9c7a301 chore: update dependencies' },
  { type: 'blank', text: '' },
];

function TerminalContent() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const lineVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, x: 0 }
      : { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-mono text-sm leading-relaxed"
    >
      {terminalLines.map((line, i) => (
        <motion.div key={i} variants={lineVariants}>
          {line.type === 'blank' ? (
            <span>&nbsp;</span>
          ) : line.type === 'command' ? (
            <span className="text-accent-teal">{line.text}</span>
          ) : (
            <span className="text-port-text/80">{line.text}</span>
          )}
        </motion.div>
      ))}
      <motion.div variants={lineVariants} className="flex items-center gap-1">
        <span className="text-accent-teal">$</span>
        <span className="text-port-text animate-blink">_</span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-bg bg-grid-pattern flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row items-center gap-8 px-6 py-16 md:py-0 max-w-6xl mx-auto w-full">
        {/* Left column — terminal */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="glass-card w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-surface/80">
              <span className="w-3 h-3 rounded-full bg-highlight" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-accent-teal" />
              <span className="ml-4 text-xs font-mono text-port-text/50 select-none">
                ~/portfolio — zsh
              </span>
            </div>
            {/* Terminal body */}
            <div className="bg-black/60 p-5 min-h-[300px]">
              <TerminalContent />
            </div>
          </div>
        </div>

        {/* Right column — 3D canvas */}
        <div className="w-full md:w-1/2 relative h-64 md:h-full md:min-h-[500px]">
          <IcosahedronScene />
          {/* Gradient overlay at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #0A0E27)',
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center pb-8 gap-2">
        <span className="text-xs font-mono text-port-text/40 tracking-widest uppercase">
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-port-text/40"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
}

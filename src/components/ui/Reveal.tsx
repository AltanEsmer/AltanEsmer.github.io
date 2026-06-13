'use client';

import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  style?: React.CSSProperties;
};

/**
 * Gentle fade + slide-up on scroll. Respects prefers-reduced-motion
 * (framer-motion disables transforms automatically when the user opts out).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  style,
}: RevealProps) {
  const MotionTag = motion(as as ElementType);
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}

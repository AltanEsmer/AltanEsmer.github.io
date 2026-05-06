'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionSection({
  children,
  className,
  delay = 0,
}: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}

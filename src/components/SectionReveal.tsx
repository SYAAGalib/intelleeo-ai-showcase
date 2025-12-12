import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

const getInitialPosition = (direction: string, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance, x: 0 };
    case 'down':
      return { y: -distance, x: 0 };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    default:
      return { y: distance, x: 0 };
  }
};

export const SectionReveal = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 60,
  duration = 0.8,
}: SectionRevealProps) => {
  const initialPosition = getInitialPosition(direction, distance);

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...initialPosition,
        filter: 'blur(8px)',
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

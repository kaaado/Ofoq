import React from 'react';
import { motion } from 'motion/react';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';
import { OFOQ_MOTION } from '../../utils/motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const { effectiveReducedMotion } = useSensoryPreferences();

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 24 };
      case 'down':
        return { opacity: 0, y: -24 };
      case 'left':
        return { opacity: 0, x: 24 };
      case 'right':
        return { opacity: 0, x: -24 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={effectiveReducedMotion ? false : getInitial()}
      animate={effectiveReducedMotion ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={effectiveReducedMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={
        effectiveReducedMotion
          ? { duration: 0.01 }
          : {
              duration: OFOQ_MOTION.durationSlow,
              delay,
              ease: OFOQ_MOTION.easeCalm,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

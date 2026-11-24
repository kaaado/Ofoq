import type { Transition, Variants } from 'motion/react';

/**
 * OFOQ Reusable Calm Motion System
 * Synchronized with CSS custom properties in index.css.
 */
export const OFOQ_MOTION = {
  easeCalm: [0.22, 1, 0.36, 1] as const,
  easeTactile: [0.34, 1.35, 0.64, 1] as const,
  durationFast: 0.16,
  durationBase: 0.26,
  durationSlow: 0.52,
  horizonDuration: 1.45,
} as const;

export const getModalBackdropVariants = (reducedMotion: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: reducedMotion ? 0.01 : 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: reducedMotion ? 0.01 : 0.16, ease: 'easeIn' },
  },
});

export const getModalDialogVariants = (reducedMotion: boolean): Variants => ({
  hidden: reducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.97, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0.01 : OFOQ_MOTION.durationBase,
      ease: OFOQ_MOTION.easeCalm,
    } satisfies Transition,
  },
  exit: reducedMotion
    ? { opacity: 0, transition: { duration: 0.01 } }
    : {
        opacity: 0,
        scale: 0.97,
        y: 12,
        transition: { duration: 0.18, ease: 'easeIn' },
      },
});

export const getCalmInteractionProps = (reducedMotion: boolean) =>
  reducedMotion
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.98 },
        transition: { duration: OFOQ_MOTION.durationFast, ease: OFOQ_MOTION.easeCalm },
      };

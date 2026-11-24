import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';
import { OFOQ_MOTION } from '../../utils/motion';
import { playTactileFeedback } from '../../services/audioService';

interface HorizonEntranceProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const STORAGE_KEY = 'ofoq_horizon_played';

export const HorizonEntrance: React.FC<HorizonEntranceProps> = ({
  onComplete,
  forceShow = false,
}) => {
  const { i18n } = useTranslation();
  const { preferences, effectiveReducedMotion } = useSensoryPreferences();
  const [isVisible, setIsVisible] = useState(false);
  const prevFocusedElementRef = useRef<HTMLElement | null>(null);
  const hasPlayedInSessionRef = useRef<boolean>(false);

  const currentLang = (i18n.language || 'fr').split('-')[0].toLowerCase();
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const ariaDialogLabel = isAr
    ? 'شاشة البداية — أفق'
    : isEn
    ? 'Intro — OFOQ Horizon'
    : 'Introduction — Horizon OFOQ';

  const dismiss = useCallback(() => {
    hasPlayedInSessionRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Safe fallback if sessionStorage is blocked
    }
    setIsVisible(false);
  }, []);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleExitComplete = useCallback(() => {
    if (prevFocusedElementRef.current && typeof prevFocusedElementRef.current.focus === 'function') {
      prevFocusedElementRef.current.focus();
    }
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  useEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      alreadyPlayed = false;
    }

    if (effectiveReducedMotion || ((alreadyPlayed || hasPlayedInSessionRef.current) && !forceShow)) {
      setIsVisible(false);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
      return;
    }

    // Save previous active element for focus restoration
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      prevFocusedElementRef.current = document.activeElement;
    }

    // Activate the horizon entrance
    setIsVisible(true);

    // Natural entrance duration (1650ms)
    const entranceDurationMs = Math.round(OFOQ_MOTION.horizonDuration * 1000) + 200;
    const timer = setTimeout(() => {
      dismiss();
    }, entranceDurationMs);

    return () => clearTimeout(timer);
  }, [effectiveReducedMotion, forceShow, dismiss]);

  // Escape key listener & body scroll lock (without intrusive skip button)
  useEffect(() => {
    if (!isVisible) return;

    // Lock body scroll during entrance
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, dismiss]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="ofoq-horizon-entrance"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: OFOQ_MOTION.easeCalm }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F1E32] overflow-hidden select-none"
          role="dialog"
          aria-modal="true"
          aria-label={ariaDialogLabel}
          tabIndex={-1}
        >
          {/* Ambient Deep Sky Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1726] via-[#172B46] to-[#1C3556] pointer-events-none" />

          {/* Top & Bottom Ambient Glassmorphism Atmosphere Curtain */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.9] }}
            transition={{ duration: 1.2, ease: OFOQ_MOTION.easeCalm }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Top Atmospheric Glass Bloom */}
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/10 via-[#A9C5D8]/10 to-transparent backdrop-blur-[2px] border-b border-white/[0.06]" />
            {/* Bottom Atmospheric Glass Mist */}
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0B1726] via-[#172B46]/60 to-transparent backdrop-blur-[2px] border-t border-white/[0.04]" />
          </motion.div>

          {/* Central Sunburst / Rotating Radiant Rays */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{
              opacity: [0, 0.45, 0.7, 0.5],
              scale: [0.8, 1.1, 1.25, 1.35],
              rotate: [0, 8, 18, 25],
            }}
            transition={{
              duration: OFOQ_MOTION.horizonDuration + 0.3,
              ease: OFOQ_MOTION.easeCalm,
            }}
            style={{
              background:
                'conic-gradient(from 0deg at 50% 50%, rgba(216,190,131,0.18) 0deg, transparent 40deg, rgba(40,104,199,0.22) 80deg, transparent 120deg, rgba(216,190,131,0.2) 180deg, transparent 220deg, rgba(40,104,199,0.25) 280deg, transparent 320deg, rgba(216,190,131,0.18) 360deg)',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1100px] sm:h-[1100px] rounded-full blur-2xl pointer-events-none transform-gpu"
          />

          {/* Golden Sunrise Light Bloom expanding from the horizon center (Vertical & Horizontal Spread) */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0.08, scaleX: 0.25 }}
            animate={{
              opacity: [0, 0.9, 1, 0.85],
              scaleY: [0.08, 1.3, 1.75, 2.0],
              scaleX: [0.25, 1.0, 1.35, 1.6],
            }}
            transition={{
              duration: OFOQ_MOTION.horizonDuration + 0.25,
              ease: OFOQ_MOTION.easeCalm,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1050px] h-[440px] bg-gradient-to-t from-[#2868C7]/50 via-[#D8BE83]/45 to-transparent rounded-full blur-3xl pointer-events-none transform-gpu"
          />

          {/* Top-Rising Ethereal Aurora Pillar */}
          <motion.div
            initial={{ opacity: 0, height: '0%' }}
            animate={{ opacity: [0, 0.65, 0.8, 0.55], height: ['0%', '40%', '75%', '85%'] }}
            transition={{ duration: OFOQ_MOTION.horizonDuration, ease: OFOQ_MOTION.easeCalm }}
            className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[280px] sm:w-[420px] bg-gradient-to-t from-[#D8BE83]/30 via-[#2868C7]/20 to-transparent blur-2xl pointer-events-none transform-gpu"
          />

          {/* Bottom Horizon Reflection Glow */}
          <motion.div
            initial={{ opacity: 0, height: '0%' }}
            animate={{ opacity: [0, 0.5, 0.7, 0.45], height: ['0%', '25%', '45%', '55%'] }}
            transition={{ duration: OFOQ_MOTION.horizonDuration, ease: OFOQ_MOTION.easeCalm }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[240px] sm:w-[360px] bg-gradient-to-b from-[#2868C7]/30 via-[#A9C5D8]/15 to-transparent blur-2xl pointer-events-none transform-gpu"
          />

          {/* Central Shining Radiant Core Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{
              opacity: [0, 0.8, 1, 0.9],
              scale: [0.2, 0.9, 1.35, 1.5],
            }}
            transition={{
              duration: OFOQ_MOTION.horizonDuration,
              ease: OFOQ_MOTION.easeCalm,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-radial from-[#FFFDF7] via-[#D8BE83]/85 to-transparent blur-xl pointer-events-none transform-gpu"
          />

          {/* Shining Multi-Stop Horizon Line emerging and glowing across width */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 0.35, 0.85, 1],
              opacity: [0, 0.9, 1, 0.85],
            }}
            transition={{
              duration: OFOQ_MOTION.horizonDuration,
              ease: OFOQ_MOTION.easeCalm,
            }}
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 0%, rgba(169, 197, 216, 0.25) 10%, #2868C7 30%, #D8BE83 48%, #FFFDF7 50%, #D8BE83 52%, #2868C7 70%, rgba(169, 197, 216, 0.25) 90%, transparent 100%)',
            }}
            className="absolute top-1/2 inset-x-0 h-[2.5px] shadow-[0_0_28px_rgba(216,190,131,0.95),0_0_14px_rgba(40,104,199,0.9)] pointer-events-none transform-gpu"
          />


          {/* Brand Reveal above the Shining Horizon */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 -translate-y-6 sm:-translate-y-10">
            {/* Logo Emblem with Ambient Golden Rim */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: OFOQ_MOTION.easeCalm }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 bg-white/10 backdrop-blur-md border border-[#D8BE83]/60 shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_20px_rgba(216,190,131,0.35)] mb-5 flex items-center justify-center transform-gpu"
            >
              <img
                src="/logo.webp"
                alt="OFOQ"
                className="w-full h-full object-contain rounded-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border-2 border-[#D8BE83] pointer-events-none"
              />
            </motion.div>

            {/* Title with Soft Golden Shimmer */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: OFOQ_MOTION.easeCalm }}
              className="text-4xl sm:text-5xl font-heading font-black text-white tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              {isAr ? 'أُفُـق' : 'OFOQ'}
            </motion.h1>

            {/* Subtitle / Horizon Promise */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: OFOQ_MOTION.easeCalm }}
              className="text-xs sm:text-sm font-semibold text-[#D8BE83] mt-2.5 tracking-wide max-w-sm px-2"
            >
              {isAr
                ? 'لكل طفل أفقه الخاص'
                : isEn
                ? 'Every child has their own horizon'
                : 'Chaque enfant a son propre horizon'}
            </motion.p>

            {/* Elegant Waiting / Entrance Pulse Indicator */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: [0, 0.9, 1], width: ['0px', '80px', '140px'] }}
              transition={{ duration: 1.1, delay: 0.6, ease: OFOQ_MOTION.easeCalm }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#D8BE83] to-transparent mt-6 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


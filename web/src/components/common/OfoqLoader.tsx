import React from 'react';
import { motion } from 'motion/react';

interface OfoqLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'page';
  text?: string;
}

export const OfoqLoader: React.FC<OfoqLoaderProps> = ({ size = 'md', text }) => {
  if (size === 'page') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F6F3]/90 backdrop-blur-md">
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Subtle breathing ambient halo */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#A9C5D8]/30"
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* OFOQ Brand Pulse */}
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#172B46] to-[#1f3757] shadow-lg flex items-center justify-center text-white border border-[#A9C5D8]/30"
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="font-extrabold text-xl tracking-tight text-[#D8BE83]">أفق</span>
          </motion.div>
        </div>
        {text && (
          <motion.p
            className="mt-4 text-sm font-medium text-[#172B46]/70 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Inline or card loader
  return (
    <div className="flex items-center gap-2 justify-center py-2">
      <motion.span
        className="w-2.5 h-2.5 rounded-full bg-[#172B46]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.span
        className="w-2.5 h-2.5 rounded-full bg-[#A9C5D8]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.span
        className="w-2.5 h-2.5 rounded-full bg-[#D58C7A]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};

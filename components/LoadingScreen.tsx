'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center">
      <motion.span
        className="font-bold tracking-[0.35em] uppercase text-white select-none text-5xl sm:text-6xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0.6], scale: [0.9, 1, 1, 0.95] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        EEL
      </motion.span>
    </div>
  );
}

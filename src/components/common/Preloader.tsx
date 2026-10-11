import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#140C08] flex flex-col items-center justify-center p-6 text-[#F5EDE0] select-none"
        >
          {/* Animated Coffee Pour & Cup Illustration */}
          <div className="relative w-28 h-32 mb-8 flex flex-col items-center justify-end">
            {/* Dripping coffee stream */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 48, opacity: [0.6, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="w-1 bg-gradient-to-b from-[#C68B59] to-[#DFB17B] rounded-full mb-1"
            />

            {/* Cup outline & liquid fill */}
            <div className="relative w-20 h-16 border-2 border-[#C68B59]/50 rounded-b-2xl rounded-t-sm flex items-end overflow-hidden p-1 bg-[#1E1410]/80 shadow-[0_0_25px_rgba(198,139,89,0.25)]">
              {/* Cup handle */}
              <div className="absolute -right-3 top-2 w-4 h-8 border-2 border-[#C68B59]/50 rounded-r-xl" />

              {/* Rising coffee fill */}
              <motion.div
                className="w-full bg-gradient-to-t from-[#6D4222] via-[#A06C3E] to-[#C68B59] rounded-b-xl"
                style={{ height: `${percent}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />

              {/* Rising steam wisps */}
              {percent > 50 && (
                <div className="absolute inset-x-0 -top-4 flex justify-around pointer-events-none opacity-70">
                  <span className="w-1 h-3 bg-[#F5EDE0]/40 rounded-full animate-steam" />
                  <span className="w-1 h-4 bg-[#F5EDE0]/40 rounded-full animate-steam-delay" />
                  <span className="w-1 h-3 bg-[#F5EDE0]/40 rounded-full animate-steam-delay-2" />
                </div>
              )}
            </div>
          </div>

          {/* Luxury Monogram & Brand Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C68B59] font-medium block mb-2">
              Artisanal Roastery & Kitchen
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-widest uppercase font-semibold text-[#F5EDE0]">
              Ember & Bean
            </h1>
            <p className="text-xs text-[#F5EDE0]/60 tracking-widest uppercase mt-1">
              Jubilee Hills · Hyderabad
            </p>
          </motion.div>

          {/* Sleek loading bar & percentage */}
          <div className="w-48 sm:w-64 mt-8 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-[#2E211A] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C68B59] via-[#DFB17B] to-[#F5EDE0] transition-all duration-150 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="w-full flex justify-between text-[11px] font-mono text-[#F5EDE0]/50 tracking-wider">
              <span>WARMING THE ROASTER</span>
              <span>{percent}%</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsDone(true);
              setTimeout(onComplete, 200);
            }}
            className="mt-8 text-[11px] tracking-widest uppercase text-[#C68B59]/60 hover:text-[#C68B59] transition-colors underline underline-offset-4"
          >
            Skip to Experience →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

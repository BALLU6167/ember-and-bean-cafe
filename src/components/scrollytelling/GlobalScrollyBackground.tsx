import React, { useState, useEffect, useRef } from 'react';
import { AtelierScrollyCanvas } from './AtelierScrollyCanvas';

interface GlobalScrollyBackgroundProps {
  currentPage: string;
}

export const GlobalScrollyBackground: React.FC<GlobalScrollyBackgroundProps> = ({ currentPage }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }

      const p = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setScrollProgress(p);
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Re-check after slight delays for DOM layout adjustments
    updateProgress();
    const t1 = setTimeout(updateProgress, 100);
    const t2 = setTimeout(updateProgress, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentPage]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#060504]">
      {/* 1. Hardware-Accelerated 192-Frame Scroll Canvas from ezgif-split.zip (Bright & Vivid) */}
      <AtelierScrollyCanvas progress={scrollProgress} hideProgressIndicator={true} />
    </div>
  );
};

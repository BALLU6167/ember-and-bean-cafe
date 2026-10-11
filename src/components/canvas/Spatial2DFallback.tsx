import React, { useEffect, useState } from 'react';
import { CustomBrewConfig } from '../../types/spatial';

interface Spatial2DFallbackProps {
  currentSection: number;
  customConfig?: CustomBrewConfig;
  isReducedMotion?: boolean;
}

export const Spatial2DFallback: React.FC<Spatial2DFallbackProps> = ({
  currentSection,
  customConfig,
  isReducedMotion = false
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReducedMotion]);

  // Determine liquid & froth color based on customConfig
  const getCoffeeGradient = () => {
    if (!customConfig) return 'from-[#2e1d14] to-[#0f0a07]';
    if (customConfig.roastLevel === 'light-golden') return 'from-[#634232] to-[#2e1c12]';
    if (customConfig.roastLevel === 'medium-velvet') return 'from-[#3d2417] to-[#170c06]';
    return 'from-[#1a0f0a] to-[#050302]';
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full perspective-1200"
      aria-hidden="true"
    >
      {/* Ambient Radial Depth Lighting */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 bg-[#d4a373] transition-transform duration-700 ease-out"
        style={{
          top: '20%',
          left: '50%',
          transform: `translate(-50%, -50%) translate3d(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px, -200px)`
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-20 bg-[#c89666] transition-transform duration-700 ease-out"
        style={{
          bottom: '10%',
          right: '15%',
          transform: `translate3d(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px, -100px)`
        }}
      />

      {/* Floating 2.5D Cup & Saucer Spatial Object Container */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out preserve-3d"
        style={{
          transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`
        }}
      >
        <div className="relative w-80 h-80 flex items-center justify-center preserve-3d">
          {/* Saucer */}
          <div className="absolute w-72 h-36 rounded-[100%] bg-gradient-to-b from-[#26201b] to-[#120f0d] border border-[#d4a373]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] translate-y-12 rotate-x-60 translate-z-neg-20" />

          {/* Cup Rim & Body */}
          <div className="relative w-56 h-56 rounded-full bg-gradient-to-b from-[#1c1815] to-[#0c0a09] p-3 border-2 border-[#d4a373]/40 shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex items-center justify-center preserve-3d">
            {/* Gold Lip Accent */}
            <div className="absolute inset-1 rounded-full border border-[#d4a373]/60 shadow-[inset_0_0_15px_rgba(212,163,115,0.3)]" />

            {/* Liquid Surface */}
            <div
              className={`relative w-44 h-44 rounded-full bg-gradient-to-br ${getCoffeeGradient()} shadow-inner overflow-hidden flex items-center justify-center transition-colors duration-500`}
            >
              {/* Crema Swirl Effect */}
              <div className="absolute w-36 h-36 rounded-full bg-[#d4a373]/15 blur-md animate-spin" style={{ animationDuration: '25s' }} />

              {/* Milk Froth Layer */}
              {customConfig && customConfig.milk !== 'none' && (
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#fceade]/80 via-[#f5ebe0]/90 to-[#faedcd]/80 blur-[2px] shadow-sm animate-pulse-glow" />
              )}
            </div>

            {/* Steam Particles */}
            <div className="absolute -top-12 flex space-x-4 opacity-70 pointer-events-none">
              <div className="w-4 h-16 bg-gradient-to-t from-[#faedcd]/20 to-transparent rounded-full blur-md animate-steam" style={{ animationDelay: '0s' }} />
              <div className="w-5 h-20 bg-gradient-to-t from-[#faedcd]/25 to-transparent rounded-full blur-md animate-steam" style={{ animationDelay: '1.2s' }} />
              <div className="w-3 h-14 bg-gradient-to-t from-[#faedcd]/15 to-transparent rounded-full blur-md animate-steam" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating 2.5D Beans */}
      {!isReducedMotion && (
        <>
          <div
            className="absolute top-1/4 left-1/6 w-10 h-14 bg-gradient-to-br from-[#3d2417] to-[#120a06] rounded-[50%] border border-[#d4a373]/20 shadow-2xl transition-transform duration-500 animate-float-slow opacity-60"
            style={{ transform: `translate3d(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px, -150px) rotate(25deg)` }}
          />
          <div
            className="absolute bottom-1/3 right-1/5 w-12 h-16 bg-gradient-to-br from-[#4a2e1d] to-[#190d07] rounded-[50%] border border-[#d4a373]/20 shadow-2xl transition-transform duration-500 animate-float-medium opacity-50"
            style={{ transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px, -80px) rotate(-35deg)` }}
          />
        </>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { originAudio } from '../../utils/soundEngine';
import { Volume2, VolumeX, Menu, X, Sparkles, Play, Pause } from 'lucide-react';

interface LuxuryNavbarProps {
  onOpenAllocation: () => void;
  onNavigateSection: (sectionId: string) => void;
  isAutoPlaying?: boolean;
  onToggleAutoPlay?: () => void;
}

export const LuxuryNavbar: React.FC<LuxuryNavbarProps> = ({
  onOpenAllocation,
  onNavigateSection,
  isAutoPlaying = false,
  onToggleAutoPlay,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = originAudio.toggleMute();
    setIsAudioActive(active);
  };

  // Apple-like fade in: at top (0-60px) opacity is subtle/0, fades in to full glassmorphism
  const navOpacity = Math.min(1, Math.max(0, (scrollY - 20) / 100));

  const navLinks = [
    { label: 'The Bean', id: 'section-genesis' },
    { label: 'Roast Architecture', id: 'section-roast' },
    { label: 'Extraction', id: 'section-extraction' },
    { label: 'Sensory Notes', id: 'section-sensory' },
    { label: 'Reserve Now', id: 'section-allocation' },
  ];

  const handleLinkClick = (id: string) => {
    originAudio.playClick();
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          opacity: scrollY < 20 ? 0.35 : 1,
          backdropFilter: scrollY > 20 ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrollY > 20 ? 'blur(20px)' : 'none',
          backgroundColor: scrollY > 20 ? `rgba(5, 5, 5, ${0.75 * navOpacity})` : 'transparent',
          borderBottom: scrollY > 20 ? `1px solid rgba(255, 255, 255, ${0.07 * navOpacity})` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Simple text logo */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              originAudio.playClick();
            }}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="flex flex-col">
              <span className="text-white/90 text-sm md:text-base font-semibold tracking-tight uppercase group-hover:text-white transition-colors duration-200">
                ORIGIN <span className="text-origin-cyan font-normal">No. 6</span>
              </span>
              <span className="text-[10px] tracking-widest text-white/40 uppercase font-mono">
                Reserve · Gesha 2,150M
              </span>
            </div>
          </div>

          {/* Center: Minimalist navigation links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-origin-cyan group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            ))}
          </nav>

          {/* Right: Video Auto-Play toggle + Sound toggle + Primary CTA button */}
          <div className="flex items-center gap-3">
            {/* Cinematic Auto-Play / Loop Toggle */}
            {onToggleAutoPlay && (
              <button
                onClick={() => {
                  originAudio.playClick();
                  onToggleAutoPlay();
                }}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider border transition-all ${
                  isAutoPlaying
                    ? 'border-origin-cyan bg-origin-cyan/15 text-origin-cyan shadow-glow-cyan'
                    : 'border-white/10 hover:border-white/30 text-white/50 hover:text-white bg-white/[0.02]'
                }`}
                title={isAutoPlaying ? 'Pause automatic video playback' : 'Play continuous cinematic video throughout page'}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-origin-cyan" />
                    <span>Auto-Playing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-white/60" />
                    <span>Play Film</span>
                  </>
                )}
              </button>
            )}

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleSound}
              aria-label="Toggle ambient atmosphere"
              className="p-2 rounded-full border border-white/10 hover:border-origin-cyan/50 text-white/60 hover:text-white transition-all duration-200 bg-white/[0.02]"
              title={isAudioActive ? 'Mute ambient soundscape' : 'Play ambient spatial soundscape'}
            >
              {isAudioActive ? (
                <Volume2 className="w-4 h-4 text-origin-cyan animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Primary CTA Button: "Secure Allocation" */}
            <button
              onClick={() => {
                originAudio.playClick();
                onOpenAllocation();
              }}
              className="relative group px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium overflow-hidden btn-gradient-border text-white/90 hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-origin-cyan" />
                Secure Allocation
              </span>
              <div className="absolute inset-0 bg-origin-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-origin-cyan font-mono">
              ORIGIN No. 6 Navigation
            </p>
            {navLinks.map((link) => (
              <div key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className="text-2xl font-light text-white/90 hover:text-origin-cyan tracking-tight transition-colors"
                >
                  {link.label}
                </button>
              </div>
            ))}
            <div className="pt-8 border-t border-white/10 space-y-3">
              {onToggleAutoPlay && (
                <button
                  onClick={() => {
                    onToggleAutoPlay();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl text-center text-xs uppercase tracking-widest font-mono border border-origin-cyan/40 text-origin-cyan"
                >
                  {isAutoPlaying ? 'Pause Video Playback' : 'Play Continuous Video'}
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAllocation();
                }}
                className="w-full py-4 rounded-xl text-center text-sm uppercase tracking-widest font-semibold bg-gradient-to-r from-origin-cyan to-origin-indigo text-black"
              >
                Secure Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

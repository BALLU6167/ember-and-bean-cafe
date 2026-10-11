import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Award, Star, Volume2, VolumeX, Instagram, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onViewCafe?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onViewCafe,
}) => {
  const { t } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log('Autoplay deferred until interaction:', err);
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.volume = 1;
        videoRef.current.play().catch((err) => {
          console.log('Audio playback error:', err);
        });
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-36 lg:pt-40 pb-20 sm:pb-12 overflow-hidden bg-transparent w-full max-w-full">
      {/* Ambient Roastery Subtle Accents (strictly overflow-hidden to prevent horizontal shift) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C68B59]/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full py-2 sm:py-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full max-w-full">
          
          {/* Left Column: Brand Story, Headline, Offerings, CTAs (Crisp typography with high contrast matching Image 2) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left p-0 rounded-3xl bg-transparent w-full max-w-full">
            {/* Top Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#140D09]/95 border border-[#D49B6A]/40 backdrop-blur-md mb-4 sm:mb-6 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#D49B6A] animate-ping" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D49B6A] font-bold">
                {t.heroTagline}
              </span>
            </motion.div>

            {/* Oversized Headline with High Contrast (As in Image 2) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1] max-w-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            >
              {t.heroTitle1} <br />
              <span className="text-[#F5AA67] italic font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">{t.heroTitle2}</span> <br />
              {t.heroTitle3}
            </motion.h1>

            {/* Subheadline Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 sm:mt-6 text-xs sm:text-base md:text-lg text-[#FAF6F0] max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
            >
              {t.heroDescription}
            </motion.p>

            {/* Food & Drink Category Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="my-4 sm:my-6 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 max-w-full"
            >
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#140D09]/95 border border-[#D49B6A]/30 text-[10px] sm:text-xs text-[#FAF6F0] font-semibold backdrop-blur-md shadow-md">
                ☕ {t.pillCoffee}
              </span>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#140D09]/95 border border-[#D49B6A]/30 text-[10px] sm:text-xs text-[#FAF6F0] font-semibold backdrop-blur-md shadow-md">
                🍔 {t.pillBurgers}
              </span>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#140D09]/95 border border-[#D49B6A]/30 text-[10px] sm:text-xs text-[#FAF6F0] font-semibold backdrop-blur-md shadow-md">
                🍕 {t.pillPizzas}
              </span>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#140D09]/95 border border-[#D49B6A]/30 text-[10px] sm:text-xs text-[#FAF6F0] font-semibold backdrop-blur-md shadow-md">
                🍟 {t.pillFries}
              </span>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#140D09]/95 border border-[#D49B6A]/30 text-[10px] sm:text-xs text-[#FAF6F0] font-semibold backdrop-blur-md shadow-md">
                🥤 {t.pillShakes}
              </span>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mt-2"
            >
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D49B6A] to-[#B86F43] hover:from-[#E0A878] hover:to-[#C67B4F] text-[#110C09] font-bold text-xs uppercase tracking-widest shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>{t.heroExploreMenu}</span>
              </button>

              {onViewCafe && (
                <button
                  onClick={onViewCafe}
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-[#140D09]/95 hover:bg-[#20150F] text-[#D49B6A] border border-[#D49B6A]/45 font-semibold text-xs uppercase tracking-widest transition-all duration-200 hover:border-[#D49B6A] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#D49B6A]" />
                  <span>{t.heroViewCafe}</span>
                </button>
              )}
            </motion.div>

            {/* Rating Badges & Social Proof */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#DDD3C4]/80">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#D49B6A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#FAF6F0]">{t.heroRatings}</span>
              </div>
              <span className="hidden sm:inline text-[rgba(212,155,106,0.4)]">•</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#D49B6A]" />
                <span>{t.heroAward}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Looping Reel Video with Sound Toggle Button */}
          <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[9/16] rounded-[2.2rem] p-2 bg-gradient-to-b from-[#D49B6A]/25 via-[rgba(212,155,106,0.12)] to-[#1A130E] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[rgba(212,155,106,0.3)] group"
            >
              {/* Inner Phone Screen Frame */}
              <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-[#100906] flex items-center justify-center">
                {/* Continuous Looping Video */}
                <video
                  ref={videoRef}
                  src="./videos/zen_v_cafe_reel.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100906]/50 via-transparent to-[#100906]/30 pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#140C08]/85 backdrop-blur-md border border-[rgba(212,155,106,0.35)] text-[10px] font-mono text-[#D49B6A]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.reelBadge}</span>
                  </div>

                  <a
                    href="https://www.instagram.com/zen_v_cafe_01/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-[#140C08]/85 text-[#D49B6A] hover:text-white border border-[rgba(212,155,106,0.3)] backdrop-blur-md hover:scale-110 transition-all"
                    title="Follow @zen_v_cafe_01 on Instagram"
                    aria-label="Instagram Account"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Bottom Sound Control & Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-mono text-[#D49B6A] block">@zen_v_cafe_01</span>
                      <p className="text-xs text-[#FAF6F0] font-medium line-clamp-1 drop-shadow-md">
                        #zen_v cafe · Food, Drinks & Vibes
                      </p>
                    </div>

                    {/* Small Sound Button to Manually Toggle Sound On/Off */}
                    <button
                      type="button"
                      onClick={toggleSound}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-200 cursor-pointer text-xs font-bold shadow-lg ${
                        isMuted
                          ? 'bg-[#18110D]/90 hover:bg-[#251B14] text-[#FAF6F0]/85 border-[rgba(212,155,106,0.35)] hover:text-white hover:border-[#D49B6A]'
                          : 'bg-[#D49B6A] text-[#110C09] border-[#D49B6A] shadow-[0_0_15px_rgba(212,155,106,0.5)]'
                      }`}
                      aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
                      title={isMuted ? 'Click to Turn Sound On' : 'Click to Mute Sound'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-[#D49B6A]" />
                          <span className="text-[11px]">{t.reelSoundOff}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#110C09]" />
                          <span className="text-[11px]">{t.reelSoundOn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Lights */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#D49B6A]/15 rounded-full blur-md pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-[#B86F43]/15 rounded-full blur-md pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Live Counter Strip */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full mt-8 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#140C08]/85 border border-[#C68B59]/30 backdrop-blur-md">
          <div className="text-center p-2">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#DFB17B]">98,400+</span>
            <span className="text-[11px] uppercase tracking-wider text-[#F5EDE0]/60">Smashed Burgers Flipped</span>
          </div>
          <div className="text-center p-2 border-l border-[#C68B59]/20">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#DFB17B]">74,200+</span>
            <span className="text-[11px] uppercase tracking-wider text-[#F5EDE0]/60">Sourdough Pizzas Baked</span>
          </div>
          <div className="text-center p-2 border-t md:border-t-0 md:border-l border-[#C68B59]/20">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#DFB17B]">65,000+</span>
            <span className="text-[11px] uppercase tracking-wider text-[#F5EDE0]/60">Loaded Fries Baskets</span>
          </div>
          <div className="text-center p-2 border-t md:border-t-0 border-l border-[#C68B59]/20">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#DFB17B]">185,000+</span>
            <span className="text-[11px] uppercase tracking-wider text-[#F5EDE0]/60">Specialty Coffees & Shakes</span>
          </div>
        </div>
      </div>

      {/* Rotating Marquee Ticker Strip */}
      <div className="relative z-10 w-full overflow-hidden bg-[#24150E] border-y border-[#C68B59]/30 py-2.5">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#DFB17B]">
          <span>🔥 Artisanal Sourdough Pizzas</span>
          <span className="text-white/40">✦</span>
          <span>🍔 Double Smashed Brioche Burgers</span>
          <span className="text-white/40">✦</span>
          <span>🍟 Loaded Truffle Parmesan Fries</span>
          <span className="text-white/40">✦</span>
          <span>🥤 Biscoff Monster Shakes & Cold Brew Floats</span>
          <span className="text-white/40">✦</span>
          <span>☕ Micro-Roasted Single Origin Arabica</span>
          <span className="text-white/40">✦</span>
          <span>🍕 Hot Honey Pepperoni Wood-Fired Pizza</span>
          <span className="text-white/40">✦</span>
          <span>✨ 320 Mbps Fiber Wi-Fi & Work Bar</span>
        </div>
      </div>
    </section>
  );
};

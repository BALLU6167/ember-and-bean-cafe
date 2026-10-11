import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Flame, Crown } from 'lucide-react';

interface HeroSpatialSectionProps {
  onExploreMenu: () => void;
  onOpenCustomizer: () => void;
  onOpenReservation: () => void;
}

export const HeroSpatialSection: React.FC<HeroSpatialSectionProps> = ({
  onExploreMenu,
  onOpenCustomizer,
  onOpenReservation
}) => {
  return (
    <section className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 pointer-events-none">
      {/* Foreground Floating Spatial Panel */}
      <div className="max-w-5xl mx-auto w-full pointer-events-auto text-center space-y-8">
        {/* Luxury Tag Badge */}
        <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full spatial-glass border border-[#dfb17b]/40 text-xs font-mono text-[#dfb17b] tracking-[0.25em] uppercase shadow-gold-glow">
          <Crown className="w-3.5 h-3.5 text-[#f5cb98]" />
          <span>Bespoke Private Reserve • 2026 Collection</span>
        </div>

        {/* Hero Title with Luxury Cinzel & Cormorant Typography */}
        <div className="space-y-4 preserve-3d">
          <h1 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] drop-shadow-2xl">
            THE ART OF SPATIAL <br />
            <span className="font-serif italic font-normal text-[#dfb17b] gold-shimmer-text">
              Extraction & Craft
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#a39790] font-sans leading-relaxed">
            Step into an architectural physical realm where 98+ SCA single-origin microlots meet high-precision infrared roasting and interactive 3D spatial perspective.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreMenu}
            className="group relative flex items-center space-x-3 bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#b3844f] text-[#060504] font-bold text-sm tracking-wider uppercase px-9 py-4 rounded-2xl shadow-gold-glow hover:scale-[1.03] active:scale-95 transition-all duration-300"
          >
            <span>Explore Curated Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center space-x-3 spatial-glass hover:bg-white/10 text-white font-medium text-sm tracking-wider uppercase px-8 py-4 rounded-2xl border border-[#dfb17b]/30 hover:border-[#dfb17b]/60 transition-all duration-300"
          >
            <Compass className="w-4 h-4 text-[#dfb17b]" />
            <span>Open Brew Studio 3D</span>
          </button>
        </div>

        {/* Spatial Key Metrics Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-12 max-w-4xl mx-auto">
          <div className="spatial-glass p-6 rounded-2xl text-center space-y-2 border border-[#dfb17b]/25 shadow-spatial hover:border-[#dfb17b]/60 transition-all duration-300 hover:translate-y-[-4px]">
            <ShieldCheck className="w-5 h-5 text-[#dfb17b] mx-auto" />
            <div className="font-cinzel text-2xl font-bold text-white">98.5 SCA</div>
            <div className="font-mono text-[11px] text-[#a39790] uppercase tracking-wider">Certified Microlots</div>
          </div>

          <div className="spatial-glass p-6 rounded-2xl text-center space-y-2 border border-[#dfb17b]/25 shadow-spatial hover:border-[#dfb17b]/60 transition-all duration-300 hover:translate-y-[-4px]">
            <Crown className="w-5 h-5 text-[#dfb17b] mx-auto" />
            <div className="font-cinzel text-2xl font-bold text-white">100% Direct</div>
            <div className="font-mono text-[11px] text-[#a39790] uppercase tracking-wider">High Elevation Canopy</div>
          </div>

          <div className="spatial-glass p-6 rounded-2xl text-center space-y-2 border border-[#dfb17b]/25 shadow-spatial hover:border-[#dfb17b]/60 transition-all duration-300 hover:translate-y-[-4px]">
            <Flame className="w-5 h-5 text-[#dfb17b] mx-auto" />
            <div className="font-cinzel text-2xl font-bold text-white">Infrared Roast</div>
            <div className="font-mono text-[11px] text-[#a39790] uppercase tracking-wider">Zero Emissions Profile</div>
          </div>
        </div>

        {/* Reservation Prompt */}
        <div className="pt-6">
          <button
            onClick={onOpenReservation}
            className="text-xs font-mono text-[#dfb17b] hover:underline uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
          >
            ✦ Request Private Alcove in Tasting Vault ✦
          </button>
        </div>
      </div>
    </section>
  );
};

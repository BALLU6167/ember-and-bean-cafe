import React from 'react';
import { ArrowDown, Flame, Droplets, Sparkles, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { originAudio } from '../../utils/soundEngine';

interface ScrollyOverlayProps {
  progress: number; // 0 to 1
  onOpenAllocation: () => void;
  onOpenFlavorProfile: () => void;
}

export const ScrollyOverlay: React.FC<ScrollyOverlayProps> = ({
  progress,
  onOpenAllocation,
  onOpenFlavorProfile,
}) => {
  // Helper to calculate smooth bell-curve opacity and translateY
  const getBeatStyle = (start: number, end: number) => {
    const pad = (end - start) * 0.22;
    if (progress < start || progress > end) {
      return {
        opacity: 0,
        pointerEvents: 'none' as const,
        transform: 'translateY(20px)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
      };
    }
    let opacity = 1;
    if (progress < start + pad) {
      opacity = (progress - start) / pad;
    } else if (progress > end - pad) {
      opacity = (end - progress) / pad;
    }
    opacity = Math.max(0, Math.min(1, opacity));
    const translateY = (1 - opacity) * 18;
    return {
      opacity,
      pointerEvents: (opacity > 0.35 ? 'auto' : 'none') as 'auto' | 'none',
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
    };
  };

  const beat1 = getBeatStyle(0.00, 0.16);
  const beat2 = getBeatStyle(0.18, 0.40);
  const beat3 = getBeatStyle(0.42, 0.64);
  const beat4 = getBeatStyle(0.66, 0.85);
  const beat5 = getBeatStyle(0.86, 1.00);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-12 lg:p-16">
      {/* ========================================================
          BEAT 1: THE GENESIS / INTRO (0 - 15%)
          ======================================================== */}
      <div
        style={beat1}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-origin-cyan animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
              RESERVE HARVEST · GESHA VILLAGE BLOCK 42
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-white/90 uppercase leading-[0.95]">
            ORIGIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-origin-cyan to-origin-indigo">No. 6</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white/80">
            Purity, perfected. <span className="text-white/40">Taste only what matters.</span>
          </p>

          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto font-normal leading-relaxed">
            Flagship single-origin reserve, re-engineered for the modern epicurean.
          </p>

          <div className="pt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-xs tracking-widest font-mono text-white/40 uppercase">
              <span>Scroll to deconstruct</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-origin-cyan" />
            </div>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* ========================================================
          BEAT 2: ROAST ARCHITECTURE (15 - 40%)
          ======================================================== */}
      <div
        style={beat2}
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-indigo/30 bg-origin-indigo/10 backdrop-blur-md text-origin-cyan text-[11px] font-mono tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5 text-origin-cyan" />
            Phase 01 // Cellular Thermodynamics
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/90 leading-tight">
            Precision-roasted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-origin-cyan">
              for clarity.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            Controlled micro-batch convection isolates the bean’s core cellular matrix. By stabilizing thermal penetration at 204.8°C, pyrolytic development occurs with zero scorching—retaining natural enzymatic brightness and molecular balance.
          </p>

          {/* Telemetry HUD Cards */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="glass-origin-card p-3 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Convection</span>
              <span className="text-sm font-semibold text-white/90 font-mono">204.8°C</span>
              <span className="text-[9px] text-origin-cyan block mt-0.5">Laminar Flow</span>
            </div>
            <div className="glass-origin-card p-3 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Pyrolysis Index</span>
              <span className="text-sm font-semibold text-white/90 font-mono">0.04Δ</span>
              <span className="text-[9px] text-origin-cyan block mt-0.5">Zero Scorching</span>
            </div>
            <div className="glass-origin-card p-3 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Porosity</span>
              <span className="text-sm font-semibold text-white/90 font-mono">94.2%</span>
              <span className="text-[9px] text-origin-cyan block mt-0.5">Uniform Core</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          BEAT 3: THERMAL EXTRACTION (40 - 65%)
          ======================================================== */}
      <div
        style={beat3}
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl space-y-6 text-left md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-cyan/30 bg-origin-cyan/10 backdrop-blur-md text-origin-cyan text-[11px] font-mono tracking-widest uppercase">
            <Droplets className="w-3.5 h-3.5 text-origin-cyan" />
            Phase 02 // Hydro-Dynamic Percolation
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/90 leading-tight">
            Adaptive extraction, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-origin-cyan to-origin-indigo">
              redefined.
            </span>
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-white/70 font-light">
            <p className="flex items-start md:justify-end gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-origin-cyan mt-2 shrink-0 md:order-last" />
              <span>Targeted thermal dynamics track extraction in real-time.</span>
            </p>
            <p className="flex items-start md:justify-end gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-origin-cyan mt-2 shrink-0 md:order-last" />
              <span>Optimized flow paths eliminate bitterness.</span>
            </p>
            <p className="flex items-start md:justify-end gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-origin-cyan mt-2 shrink-0 md:order-last" />
              <span className="text-white/90 font-medium">The terroir stays pure—harshness fades away.</span>
            </p>
          </div>

          {/* Precision Metrics HUD */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 md:justify-items-end">
            <div className="glass-origin-card p-3 rounded-lg border border-white/10 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Pressure</span>
              <span className="text-sm font-semibold text-white/90 font-mono">9.2 Bar</span>
              <span className="text-[9px] text-origin-cyan block mt-0.5">Micro-Pulsed</span>
            </div>
            <div className="glass-origin-card p-3 rounded-lg border border-white/10 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Flow Rate</span>
              <span className="text-sm font-semibold text-white/90 font-mono">1.8 ml/s</span>
              <span className="text-[9px] text-origin-cyan block mt-0.5">Laminar Micro-Jet</span>
            </div>
            <div className="glass-origin-card p-3 rounded-lg border border-white/10 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Gold Cup TDS</span>
              <span className="text-sm font-semibold text-white/90 font-mono">21.4%</span>
              <span className="text-[9px] text-origin-cyan block mt-0.5">SCA Standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          BEAT 4: SENSORY SYMPHONY (65 - 85%)
          ======================================================== */}
      <div
        style={beat4}
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-2xl space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-indigo/40 bg-origin-indigo/15 backdrop-blur-md text-origin-cyan text-[11px] font-mono tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 text-origin-cyan" />
            Phase 03 // Volatile Compound Matrix
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/90 leading-tight">
            Immersive, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-origin-cyan">
              lifelike flavor.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            High-altitude volcanic origins at 2,150m. An AI-profiled roasting curve synchronizes thermodynamic milestones, preserving volatile terpenes and delicate esters to restore delicate floral and citrus notes to their absolute maximum presence.
          </p>

          {/* Volatile Compound Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="glass-origin-card p-3 rounded-lg border border-white/10">
              <span className="text-xs font-semibold text-white/90 block">Jasmine Floral</span>
              <span className="text-[10px] font-mono text-origin-cyan block mt-1">C10H16O · Monoterpenes</span>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-origin-cyan h-full w-[96%]" />
              </div>
            </div>

            <div className="glass-origin-card p-3 rounded-lg border border-white/10">
              <span className="text-xs font-semibold text-white/90 block">Bergamot Zest</span>
              <span className="text-[10px] font-mono text-origin-cyan block mt-1">Limonene · Crisp Acidity</span>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-origin-cyan h-full w-[92%]" />
              </div>
            </div>

            <div className="glass-origin-card p-3 rounded-lg border border-white/10">
              <span className="text-xs font-semibold text-white/90 block">White Peach</span>
              <span className="text-[10px] font-mono text-origin-cyan block mt-1">γ-Decalactone · Stone Fruit</span>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-origin-cyan h-full w-[94%]" />
              </div>
            </div>

            <div className="glass-origin-card p-3 rounded-lg border border-white/10">
              <span className="text-xs font-semibold text-white/90 block">Wild Honeycomb</span>
              <span className="text-[10px] font-mono text-origin-cyan block mt-1">Phenethyl · Resonant Body</span>
              <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-origin-cyan h-full w-[88%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          BEAT 5: REASSEMBLY & ALLOCATION (85 - 100%)
          ======================================================== */}
      <div
        style={beat5}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-cyan/30 bg-origin-cyan/10 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-origin-cyan" />
            <span className="text-[11px] font-mono tracking-widest text-origin-cyan uppercase font-semibold">
              ALLOCATION BATCH #006 · 48 OF 500 REMAINING
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white/95 uppercase leading-[0.98]">
            Taste everything. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-origin-cyan via-white to-origin-indigo">
              Settle for nothing else.
            </span>
          </h2>

          <p className="text-base sm:text-xl font-light text-white/70 max-w-xl mx-auto">
            ORIGIN No. 6. Designed for focus, crafted for the connoisseur.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={() => {
                originAudio.playClick();
                onOpenAllocation();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase btn-gradient-border text-white shadow-glow-cyan transition-transform active:scale-95 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-origin-cyan" />
              Secure Allocation
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => {
                originAudio.playClick();
                onOpenFlavorProfile();
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-full text-xs sm:text-sm font-medium tracking-widest uppercase text-white/70 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md bg-white/[0.02] transition-colors flex items-center justify-center gap-2 group"
            >
              View Flavor Profile
              <ChevronRight className="w-4 h-4 text-origin-cyan group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-[11px] font-mono text-white/40 tracking-wider uppercase pt-2">
            Complimentary Temperature-Monitored Vault Shipping Worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowDown, Sparkles, Layers, Activity, Mountain, Compass, ChevronRight } from 'lucide-react';

interface AtelierScrollyOverlayProps {
  progress: number; // 0 to 1
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenEngine: () => void;
  onOpenOrigins: () => void;
}

export const AtelierScrollyOverlay: React.FC<AtelierScrollyOverlayProps> = ({
  progress,
  onOpenReservation,
  onOpenMenu,
  onOpenEngine,
  onOpenOrigins,
}) => {
  // Helper for smooth bell-curve opacity and subtle vertical parallax
  const getBeatStyle = (start: number, end: number) => {
    const pad = (end - start) * 0.22;
    if (progress < start || progress > end) {
      return {
        opacity: 0,
        pointerEvents: 'none' as const,
        transform: 'translateY(24px)',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }
    let opacity = 1;
    if (progress < start + pad) {
      opacity = (progress - start) / pad;
    } else if (progress > end - pad) {
      opacity = (end - progress) / pad;
    }
    opacity = Math.max(0, Math.min(1, opacity));
    const translateY = (1 - opacity) * 20;

    return {
      opacity,
      pointerEvents: (opacity > 0.4 ? 'auto' : 'none') as 'auto' | 'none',
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  const beat1 = getBeatStyle(0.00, 0.16); // 0–15% The Ritual Unveiled
  const beat2 = getBeatStyle(0.16, 0.41); // 15–40% The Anatomy of Bloom
  const beat3 = getBeatStyle(0.41, 0.66); // 40–65% Dynamic Hydro-Dynamics
  const beat4 = getBeatStyle(0.66, 0.85); // 65–85% Terroir & Origin
  const beat5 = getBeatStyle(0.85, 1.00); // 85–100% Reassembly & Reservation

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between">
      {/* ========================================================
          STAGE 1: 0–15% SCROLL (THE RITUAL UNVEILED)
          ======================================================== */}
      <div
        style={beat1}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#0C0A09]/70 backdrop-blur-md shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] animate-pulse shadow-[0_0_8px_#E58A2B]" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-[#C6A15B] uppercase">
              ARCHITECTURAL BREWING SYSTEM · 2026 EDITION
            </span>
          </div>

          {/* Main Architectural Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-[#F5F2EB] uppercase leading-none">
            ATELIER KŌHĪ
          </h1>

          {/* Subheadline */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#F5F2EB]/90">
            Extraction, <span className="font-serif italic text-[#C6A15B]">elevated.</span>
          </p>

          {/* Micro-Copy */}
          <p className="text-xs sm:text-sm md:text-base text-[#E8E3D9]/60 max-w-xl mx-auto font-light leading-relaxed">
            Single-origin micro-lot roasts, engineered down to the micron.
          </p>

          {/* Scroll Cue */}
          <div className="pt-10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.25em] text-[#C6A15B]/70 uppercase">
              <span>Scroll to deconstruct assembly</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#E58A2B] animate-bounce" />
            </div>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B]/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* ========================================================
          STAGE 2: 15–40% SCROLL (THE ANATOMY OF BLOOM)
          ======================================================== */}
      <div
        style={beat2}
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl space-y-6 text-left bg-[#0C0A09]/75 backdrop-blur-xl border border-[#C6A15B]/25 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 text-[#C6A15B] text-[10px] font-mono tracking-widest uppercase">
            <Layers className="w-3 h-3 text-[#E58A2B]" />
            Phase 01 // The Anatomy of Bloom
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F2EB] tracking-tight leading-tight">
            Precision in every micron.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#E8E3D9]/70 font-light leading-relaxed border-t border-[#C6A15B]/15 pt-5">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Dual-Layer Thermal Retention:</strong> Slip-cast matte Hasami ceramic insulates against ambient heat drops, maintaining a constant 93.4°C core slurry.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Calibrated 60° Rib Geometry:</strong> Convective spiral flutes accelerate continuous gas escape without liquid channel stagnation.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Zero-Bypass Saturation:</strong> Eliminates side-wall water bypass, forcing 100% of water through the blooming grinds bed.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenEngine}
            className="pt-2 text-xs font-mono uppercase tracking-wider text-[#C6A15B] hover:text-[#E58A2B] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explore Technical Blueprints</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          STAGE 3: 40–65% SCROLL (DYNAMIC HYDRO-DYNAMICS)
          ======================================================== */}
      <div
        style={beat3}
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl space-y-6 text-left bg-[#0C0A09]/75 backdrop-blur-xl border border-[#C6A15B]/25 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E58A2B]/30 bg-[#E58A2B]/10 text-[#E58A2B] text-[10px] font-mono tracking-widest uppercase">
            <Activity className="w-3 h-3 text-[#E58A2B]" />
            Phase 02 // Hydrodynamic Kinetics
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F2EB] tracking-tight leading-tight">
            The Physics of Pure Flavor.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#E8E3D9]/70 font-light leading-relaxed border-t border-[#C68B59]/15 pt-5">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Uniform 93°C Laminar Dispersion:</strong> Dual-concentric shower head prevents channeling, keeping turbulence strictly molecular.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Dynamic Degassing Kinetics:</strong> Negative-pressure relief channels allow seamless release of CO₂ during the 45-second bloom.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Pristine Clarity Without Bitterness:</strong> 30-micron laser-perforated brass filter captures fine dust while passing rich aromatic oils.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          STAGE 4: 65–85% SCROLL (TERROIR & ORIGIN)
          ======================================================== */}
      <div
        style={beat4}
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl space-y-6 text-left bg-[#0C0A09]/75 backdrop-blur-xl border border-[#C6A15B]/25 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 text-[#C6A15B] text-[10px] font-mono tracking-widest uppercase">
            <Mountain className="w-3 h-3 text-[#E58A2B]" />
            Phase 03 // Micro-Lot Terroir
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F2EB] tracking-tight leading-tight">
            Single-Estate Heritage.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#E8E3D9]/70 font-light leading-relaxed border-t border-[#C68B59]/15 pt-5">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">High-Altitude Volcanic Soil:</strong> Sourced exclusively from 1,800m+ slopes where slow maturation concentrates cellular sugars.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Anaerobic Natural Fermentation:</strong> 72-hour whole-cherry nitrogen maceration yielding notes of night jasmine, candied bergamot, and dark cacao.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] mt-2 shrink-0" />
              <p>
                <strong className="text-[#F5F2EB] font-medium">Master-Roaster Thermodynamic Curves:</strong> Convective airflow roasting calibrated to ±0.2°C per second for complete core solubility.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenOrigins}
            className="pt-2 text-xs font-mono uppercase tracking-wider text-[#C6A15B] hover:text-[#E58A2B] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Inspect Terroir Estates</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          STAGE 5: 85–100% SCROLL (REASSEMBLY & RESERVATION)
          ======================================================== */}
      <div
        style={beat5}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        <div className="max-w-2xl mx-auto space-y-6 bg-[#0C0A09]/85 backdrop-blur-2xl border border-[#C6A15B]/30 p-10 sm:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 text-[#C6A15B] text-[10px] font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#E58A2B]" />
            The Masterwork // Reassembly
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F5F2EB] tracking-tight leading-tight">
            Taste the Uncompromised.
          </h2>

          <p className="text-base sm:text-lg text-[#E8E3D9]/80 font-light max-w-lg mx-auto">
            Available exclusively by flight and private reservation.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] hover:from-[#DFB17B] hover:to-[#C6A15B] text-[#060504] font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              Reserve Your Table
            </button>

            <button
              onClick={onOpenMenu}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#060504] border border-[#C6A15B]/40 hover:border-[#C6A15B] text-[#F5F2EB] font-medium text-xs uppercase tracking-widest transition-all hover:bg-[#0C0A09] cursor-pointer whitespace-nowrap"
            >
              Explore The Seasonal Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

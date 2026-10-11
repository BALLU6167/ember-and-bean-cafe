import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  Compass, 
  Sliders, 
  ShieldCheck, 
  ChevronRight,
  Flame,
  Droplets,
  Wind,
  Check
} from 'lucide-react';
import { originAudio } from '../../utils/soundEngine';

interface EditorialDetailsProps {
  onOpenAllocation: () => void;
  onOpenFlavorProfile: () => void;
}

export const EditorialDetails: React.FC<EditorialDetailsProps> = ({
  onOpenAllocation,
  onOpenFlavorProfile,
}) => {
  // Interactive Brew Simulator State
  const [dose, setDose] = useState<number>(18.5);
  const [water, setWater] = useState<number>(300);
  const [temperature, setTemperature] = useState<number>(93.5);
  const [grindMicrons, setGrindMicrons] = useState<number>(650);

  // Approximate extraction yield calculation
  const ratio = (water / dose).toFixed(1);
  const extractionYield = ((water * 0.0135 * (temperature / 93) * (700 / grindMicrons) / dose) * 100).toFixed(1);
  const estimatedTDS = ((parseFloat(extractionYield) * dose) / water).toFixed(2);

  return (
    <div className="relative z-10 bg-transparent text-white">
      {/* Subtle divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* SECTION: TERROIR PROVENANCE */}
      <section id="section-genesis" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-origin-cyan text-[10px] font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5" />
              Origin Provenance // Gesha Block 42
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/95 leading-tight">
              Grown in volcanic mist. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-origin-cyan to-origin-indigo">
                Harvested by hand.
              </span>
            </h2>

            <p className="text-white/60 leading-relaxed text-sm sm:text-base">
              Resting at 2,150 meters above sea level within Ethiopia’s pristine Bench Maji forest, Gesha Village Block 42 experiences steep diurnal temperature swings of 18°C. This forces the coffee cherry to synthesize dense sugars and rare enzymatic precursors over 240 days of maturation.
            </p>

            <div className="pt-4 flex items-center gap-6 text-xs font-mono text-white/50 border-t border-white/10">
              <div>
                <span className="text-origin-cyan block text-sm font-bold">2,150 M</span>
                <span>Elevation AMSL</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-origin-cyan block text-sm font-bold">72 HRS</span>
                <span>Cold Carbonic Anaerobic</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-origin-cyan block text-sm font-bold">0.68 g/ml</span>
                <span>Green Density Index</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-origin-card glass-origin-card-hover p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-origin-indigo/20 border border-origin-indigo/40 text-origin-cyan flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white/90">Micro-Climate Canopy</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Native shade canopy preserves sub-soil moisture and shelters the cherries from direct equatorial irradiation, locking in crisp, tea-like clarity.
              </p>
            </div>

            <div className="glass-origin-card glass-origin-card-hover p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-origin-cyan/20 border border-origin-cyan/40 text-origin-cyan flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white/90">Cryo-Monitored Fermentation</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Slow-sealed anaerobic tanks cooled to 14°C stall volatile acid degradation, preserving delicate white peach and bergamot terpenes.
              </p>
            </div>

            <div className="glass-origin-card glass-origin-card-hover p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white/90">Multi-Tier Raised Beds</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Slow dried for 28 days under parabolic shade tunnels with hourly moisture equilibrium monitoring, reaching optimal 10.4% bound moisture.
              </p>
            </div>

            <div className="glass-origin-card glass-origin-card-hover p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-origin-indigo/20 border border-origin-indigo/40 text-origin-cyan flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white/90">Optical Spectrometry Sorting</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Tri-chromatic lasers evaluate every individual bean for chlorophyll density and internal moisture variance, yielding zero defect tolerance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ROAST ARCHITECTURE */}
      <section id="section-roast" className="py-24 sm:py-32 px-6 bg-black/45 backdrop-blur-md border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-indigo/40 bg-origin-indigo/10 text-origin-cyan text-[10px] font-mono tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5" />
              Thermal Architecture // Micro-Batch Convection
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/95">
              Heat transferred with zero scorching.
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Traditional drum roasters scorch the bean exterior through conduction. ORIGIN No. 6 utilizes a fluid-bed laminar convection envelope, transferring thermal energy through pressurized micro-currents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-origin-cyan uppercase tracking-wider">Milestone 01</span>
              <h3 className="text-xl font-bold text-white/90">Enzymatic Desiccation</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Moisture is gently evacuated from the inner cellular matrix at 145°C. Cell walls remain fully elastic without fracturing.
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
                Rate of Rise: +11.2°C/min
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-origin-cyan/5 rounded-full blur-2xl" />
              <span className="text-xs font-mono text-origin-cyan uppercase tracking-wider">Milestone 02</span>
              <h3 className="text-xl font-bold text-white/90">Pyrolytic Caramelization</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Complex sucrose molecules disassemble into aromatic furanones and pyrazines. Acidity shifts from sharp malic to sweet nectarine.
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
                Development Time Ratio: 12.4%
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-origin-cyan uppercase tracking-wider">Milestone 03</span>
              <h3 className="text-xl font-bold text-white/90">Cryogenic Drop Quench</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                At the exact apex of fragrance (204.8°C), the batch is evacuated into a chilled nitrogen fluidized chamber, freezing the roast curve instantly.
              </p>
              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
                Agtron Ground: 82.4 Nordic Light
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EXTRACTION SCIENCE & SIMULATOR */}
      <section id="section-extraction" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-cyan/30 bg-black/40 backdrop-blur-md text-origin-cyan text-[10px] font-mono tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              Ceramic Engineering // The No. 6 Vessel
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/95 leading-tight">
              Slip-cast matte black ceramic. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-origin-cyan to-origin-indigo">
                Engineered for thermal inertia.
              </span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Every ORIGIN No. 6 brewing vessel is hand slip-cast from volcanic clay, fired at 1,320°C, and finished in a silky, non-porous matte-black tactile glaze. An internal micro-fluted borosilicate funnel stabilizes the water column, preventing channeling and channeling micro-jets with 100% laminar precision.
            </p>

            <div className="space-y-3 pt-2 text-xs text-white/70">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-origin-cyan" />
                <span>60° Fluting Angle matches capillary brew extraction kinetics</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-origin-cyan" />
                <span>Dual-wall thermal insulation holds brew slurry at ±0.2°C stability</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-origin-cyan" />
                <span>Hand-blown ultra-thin crystalline glassware with zero lead content</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  originAudio.playClick();
                  onOpenAllocation();
                }}
                className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase btn-gradient-border text-white shadow-glow-cyan"
              >
                Inspect Vessel Allocation
              </button>
            </div>
          </div>

          {/* Interactive Extraction Calculator */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-black/55 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-origin-cyan" />
                  <h3 className="text-sm font-mono uppercase tracking-wider text-white/90">
                    SCA Gold Cup Extraction Simulator
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-origin-cyan/10 text-origin-cyan border border-origin-cyan/20">
                  Real-Time Kinetics
                </span>
              </div>

              {/* Slider 1: Dose */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/50">Dose (Whole Bean)</span>
                  <span className="text-white font-bold">{dose} g</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={24}
                  step={0.5}
                  value={dose}
                  onChange={(e) => setDose(parseFloat(e.target.value))}
                  className="w-full accent-origin-cyan cursor-pointer"
                />
              </div>

              {/* Slider 2: Water */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/50">Water Volume</span>
                  <span className="text-white font-bold">{water} ml</span>
                </div>
                <input
                  type="range"
                  min={240}
                  max={380}
                  step={10}
                  value={water}
                  onChange={(e) => setWater(parseInt(e.target.value))}
                  className="w-full accent-origin-cyan cursor-pointer"
                />
              </div>

              {/* Slider 3: Temperature */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/50">Brew Temperature</span>
                  <span className="text-white font-bold">{temperature} °C</span>
                </div>
                <input
                  type="range"
                  min={90}
                  max={97}
                  step={0.5}
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-origin-cyan cursor-pointer"
                />
              </div>

              {/* Slider 4: Grind Microns */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/50">Grind Particle Size</span>
                  <span className="text-white font-bold">{grindMicrons} μm</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={850}
                  step={25}
                  value={grindMicrons}
                  onChange={(e) => setGrindMicrons(parseInt(e.target.value))}
                  className="w-full accent-origin-cyan cursor-pointer"
                />
              </div>

              {/* Computed Results Matrix */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center font-mono text-xs">
                <div>
                  <span className="text-[10px] text-white/40 block">BREW RATIO</span>
                  <span className="text-sm font-bold text-white mt-1 block">1:{ratio}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">EXTRACTION YIELD</span>
                  <span className="text-sm font-bold text-origin-cyan mt-1 block">{extractionYield}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">CALCULATED TDS</span>
                  <span className="text-sm font-bold text-white mt-1 block">{estimatedTDS}%</span>
                </div>
              </div>

              <div className="text-[10px] text-white/40 text-center font-mono">
                Target Gold Cup Envelope: 18.0% – 22.0% Extraction Yield · Optimal Clarity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SENSORY NOTES */}
      <section id="section-sensory" className="py-24 sm:py-32 px-6 bg-black/45 backdrop-blur-md border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-indigo/40 bg-origin-indigo/10 text-origin-cyan text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Epicurean Flavor Matrix
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/95">
              The Four Sensory Pillars
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              Identified and profiled through gas-chromatography mass spectrometry to preserve volatile aromatics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-origin-card p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-origin-cyan uppercase tracking-wider block">Top Note</span>
              <h3 className="text-xl font-bold text-white">Jasmine Flower</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Effervescent white blossoms, high-altitude aromatic ester release, and faint honeysuckle on the dry aroma.
              </p>
              <div className="text-[10px] font-mono text-white/30 pt-2 border-t border-white/5">
                Molecular ID: Linalool / Methyl Jasmonate
              </div>
            </div>

            <div className="glass-origin-card p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-origin-cyan uppercase tracking-wider block">Mid Acidity</span>
              <h3 className="text-xl font-bold text-white">Bergamot & Meyer Lemon</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Crystalline citric sparkle that brightens the palate without astringency, reminiscent of Earl Grey tea.
              </p>
              <div className="text-[10px] font-mono text-white/30 pt-2 border-t border-white/5">
                Molecular ID: Limonene
              </div>
            </div>

            <div className="glass-origin-card p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-origin-cyan uppercase tracking-wider block">Core Sweetness</span>
              <h3 className="text-xl font-bold text-white">White Peach Nectar</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Luscious stone fruit sweetness, lingering juicy texture, and clean malic structure across the mid-palate.
              </p>
              <div className="text-[10px] font-mono text-white/30 pt-2 border-t border-white/5">
                Molecular ID: γ-Decalactone
              </div>
            </div>

            <div className="glass-origin-card p-6 rounded-2xl border border-white/10 space-y-4 bg-black/40 backdrop-blur-xl">
              <span className="text-[10px] font-mono text-origin-cyan uppercase tracking-wider block">Finish</span>
              <h3 className="text-xl font-bold text-white">Wild Mountain Honey</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Resonant, floral sweetness that coats the palate with silky elegance, enduring for over six minutes.
              </p>
              <div className="text-[10px] font-mono text-white/30 pt-2 border-t border-white/5">
                Molecular ID: Phenethyl Alcohol
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                originAudio.playClick();
                onOpenFlavorProfile();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-origin-cyan border border-origin-cyan/30 bg-origin-cyan/5 hover:bg-origin-cyan/15 transition-colors"
            >
              Open Full Lab Cupping Dossier
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: RESERVE ALLOCATION TIERS */}
      <section id="section-allocation" className="py-24 sm:py-36 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-cyan/30 bg-black/40 backdrop-blur-md text-origin-cyan text-[10px] font-mono tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Batch 006 // Limited to 500 Numbered Vessels Globally
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white/95 uppercase">
            Secure Your Allocation
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Each allocation is custom-prepared to order, vacuum-sealed under food-grade argon, and shipped in a custom velvet-lined presentation vault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-black/55 backdrop-blur-2xl border border-white/10 flex flex-col justify-between space-y-8 glass-origin-card-hover">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Tier I</span>
              <h3 className="text-2xl font-bold text-white">The Reserve Vessel</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                The bespoke matte-black ceramic brewing vessel paired with 250g nitrogen-sealed whole bean reserve.
              </p>
              <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>Matte Black Ceramic Vessel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>250g Whole Bean Gesha Village</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>Crystalline Borosilicate Collector</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white">$240</span>
                <span className="text-xs text-white/40 font-mono">USD</span>
              </div>
              <button
                onClick={() => {
                  originAudio.playClick();
                  onOpenAllocation();
                }}
                className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 hover:border-origin-cyan text-white hover:text-origin-cyan transition-colors"
              >
                Reserve Tier I
              </button>
            </div>
          </div>

          {/* Card 2 (Recommended) */}
          <div className="p-8 rounded-3xl bg-black/70 backdrop-blur-2xl border-2 border-origin-cyan flex flex-col justify-between space-y-8 relative shadow-glow-cyan">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-origin-cyan text-black font-mono text-[10px] uppercase font-bold tracking-wider">
              Connoisseur Edition · Most Popular
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono text-origin-cyan uppercase tracking-widest block">Tier II</span>
              <h3 className="text-2xl font-bold text-white">The Laboratory Flight</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                The full epicurean experience: The Vessel + 3x 250g Rare Gesha Micro-Lots (Natural, Washed, Anaerobic 72h).
              </p>
              <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>Matte Black Ceramic Vessel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>3x 250g Single Terroir Lots (750g Total)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>Complimentary Laser Engraving</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>Vault Presentation Box</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-origin-cyan">$480</span>
                <span className="text-xs text-white/40 font-mono">USD</span>
              </div>
              <button
                onClick={() => {
                  originAudio.playClick();
                  onOpenAllocation();
                }}
                className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest btn-gradient-border text-white shadow-glow-cyan"
              >
                Secure Allocation
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-black/55 backdrop-blur-2xl border border-white/10 flex flex-col justify-between space-y-8 glass-origin-card-hover">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Tier III</span>
              <h3 className="text-2xl font-bold text-white">Founder's Private Vault</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Serialized Numbered 1-of-50 Vessel with 24K titanium collar, plus quarterly reserve shipments for one year.
              </p>
              <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>Serialized Collector Ceramic Vessel (#001–#050)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>4x Quarterly Reserve Shipments (1kg / Season)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-origin-cyan" />
                  <span>Direct Sommelier Consultation Line</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white">$1,200</span>
                <span className="text-xs text-white/40 font-mono">USD</span>
              </div>
              <button
                onClick={() => {
                  originAudio.playClick();
                  onOpenAllocation();
                }}
                className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/20 hover:border-origin-cyan text-white hover:text-origin-cyan transition-colors"
              >
                Inquire for Vault VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL FOOTER */}
      <footer className="border-t border-white/[0.08] py-16 px-6 bg-black/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="text-lg font-bold uppercase tracking-tight text-white/90">
              ORIGIN <span className="text-origin-cyan">No. 6</span>
            </div>
            <p className="text-xs text-white/40 font-mono max-w-sm">
              Flagship single-origin reserve, re-engineered for the modern epicurean. Bench Maji, Ethiopia · Zurich Roastery Laboratory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 font-mono">
            <span>© 2026 ORIGIN RESERVE AG</span>
            <span>TERROIR REGISTRY</span>
            <span>LABORATORY PROTOCOLS</span>
            <span>VAULT DISPATCH</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

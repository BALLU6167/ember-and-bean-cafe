import React from 'react';
import { Sparkles, ArrowRight, Compass, Shield, Feather, Clock, CheckCircle2, Heart } from 'lucide-react';
import { AtelierPage } from '../types/atelier';

interface PhilosophyPageProps {
  onNavigate: (page: AtelierPage) => void;
  onOpenReservation: () => void;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = ({
  onNavigate,
  onOpenReservation,
}) => {
  const pillars = [
    {
      num: '01',
      title: 'Ma (間) — The Sacred Pause',
      subtitle: 'The Architecture of Negative Space',
      desc: 'In Japanese aesthetics, Ma is the pregnant void between actions that gives shape to meaning. In extraction, this manifests in the 45-second bloom: unhurried silence where water penetrates coffee cell walls, releasing trapped volatile compounds without chaotic hydraulic turbulence.',
      metric: '45s Bloom Interval',
      quote: '“We do not rush the dissolution of aromatics; we surrender to their natural kinetics.”',
    },
    {
      num: '02',
      title: 'Takumi (匠) — Hasami Ceramic Heritage',
      subtitle: '400 Years of Isothermal Alchemy',
      desc: 'Our extraction chambers are individually slip-cast in Hasami, Nagasaki, using volcanic clay fired at 1,300°C. The resulting matte porcelain achieves unparalleled thermal retention, holding an exact 93.4°C core temperature throughout the pour.',
      metric: '1,300°C Kiln Fired',
      quote: '“Ceramic that breathes heat evenly, eliminating cold thermal pockets.”',
    },
    {
      num: '03',
      title: 'Shun (旬) — Ephemeral Peak Seasonality',
      subtitle: 'Harvested at Moonrise, Rested in Cedar',
      desc: 'Coffee is living fruit. We roast only seasonal micro-lots from boutique estates producing fewer than 50 bags annually. Every allocation is rested for exactly 14 days and served exclusively within an 18-day sensory window.',
      metric: '18-Day Golden Window',
      quote: '“A cup tasted today will never exist in precisely the same chemical harmony tomorrow.”',
    },
    {
      num: '04',
      title: 'Chowa (調和) — Harmonic Hydro-Dynamics',
      subtitle: 'Zero-Bypass Micro-Perforated Filtration',
      desc: 'Traditional paper filters adsorb natural coffee oils and leach paper lignins. Our 30-micron laser-etched brass mesh allows the full lipid spectrum to pass, yielding a velvety, mouth-coating body with laser-sharp terroir clarity.',
      metric: '30μm Laser Filtration',
      quote: '“Pristine clarity without the loss of precious aromatic oils.”',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060504] text-[#F5F2EB] pt-28 pb-32 selection:bg-[#C6A15B] selection:text-[#060504]">
      {/* Hero Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#0C0A09]/80 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-bold">
              ATELIER MANIFESTO // WABI-SABI & COFFEE CRAFT
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F2EB] leading-[1.05] mb-8">
            The Philosophy of Pure Extraction.
          </h1>

          <p className="text-lg sm:text-xl text-[#E8E3D9]/75 font-light leading-relaxed">
            Atelier Kōhī exists at the confluence of Japanese ceramic minimalism and precision fluid mechanics. We believe coffee is not a stimulant, but an unhurried sensory ceremony worthy of the highest architectural rigor.
          </p>
        </div>
      </section>

      {/* Hero Visual Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="relative rounded-3xl overflow-hidden border border-[#C6A15B]/25 h-[420px] sm:h-[540px] shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=85&w=1800"
            alt="Atelier Kōhī Ceramic Pour-Over Ritual"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060504] via-[#060504]/40 to-transparent" />
          
          <div className="absolute bottom-10 left-8 sm:left-12 max-w-xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C6A15B] uppercase font-bold block mb-2">
              THE SALON RITUAL
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] font-bold leading-tight">
              “Every pour is a private conversation between heat, mineralized water, and volcanic soil.”
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Architectural Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-3">
            THE CORNERSTONES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F2EB] tracking-tight">
            Four Tenets of the Atelier Brew.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#0C0A09]/80 border border-[#C6A15B]/20 hover:border-[#C6A15B]/60 rounded-3xl p-8 sm:p-12 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#C6A15B] tracking-widest font-bold">
                    TENET {pillar.num}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/20 text-[10px] font-mono text-[#E58A2B] tracking-wider">
                    {pillar.metric}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB] mb-2 group-hover:text-[#C6A15B] transition-colors">
                  {pillar.title}
                </h3>
                <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#C6A15B]/80 mb-5">
                  {pillar.subtitle}
                </h4>

                <p className="text-sm text-[#E8E3D9]/70 font-light leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>

              <div className="border-t border-[#C6A15B]/15 pt-5">
                <p className="font-serif italic text-xs sm:text-sm text-[#F5F2EB]/85 leading-snug">
                  {pillar.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architectural Materiality Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="bg-gradient-to-br from-[#0C0A09] via-[#060504] to-[#0C0A09] border border-[#C6A15B]/30 rounded-3xl p-10 sm:p-16 lg:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#C6A15B] uppercase font-bold block">
                MATERIAL ARCHAEOLOGY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F2EB] leading-tight">
                Brushed Brass & Raw Matte Ceramic.
              </h2>
              <p className="text-sm sm:text-base text-[#E8E3D9]/75 font-light leading-relaxed">
                We reject planned obsolescence. Every element of our brewing apparatus is forged from non-ferrous architectural brass and unglazed tactile stoneware. Over hundreds of extraction flights, the brass develops a warm, personal amber patina—a physical diary of heat, water, and human touch.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onNavigate('extraction-engine')}
                  className="px-6 py-3.5 rounded-xl bg-[#060504] border border-[#C6A15B]/50 hover:border-[#C6A15B] text-xs font-mono uppercase tracking-[0.2em] text-[#F5F2EB] hover:text-[#C6A15B] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore The Extraction Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenReservation}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:scale-105 transition-all shadow-xl cursor-pointer"
                >
                  Book Private Tasting Flight
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-[#060504]/80 border border-[#C6A15B]/20 rounded-2xl p-6 text-center">
                <span className="font-serif text-3xl font-bold text-[#C6A15B] block mb-1">0%</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8E3D9]/60">Paper Leaching</span>
              </div>
              <div className="bg-[#060504]/80 border border-[#C6A15B]/20 rounded-2xl p-6 text-center">
                <span className="font-serif text-3xl font-bold text-[#E58A2B] block mb-1">93.4°C</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8E3D9]/60">Isothermal Core</span>
              </div>
              <div className="bg-[#060504]/80 border border-[#C6A15B]/20 rounded-2xl p-6 text-center">
                <span className="font-serif text-3xl font-bold text-[#C6A15B] block mb-1">±12μm</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8E3D9]/60">Chamber Rib Precision</span>
              </div>
              <div className="bg-[#060504]/80 border border-[#C6A15B]/20 rounded-2xl p-6 text-center">
                <span className="font-serif text-3xl font-bold text-[#E58A2B] block mb-1">21.4%</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8E3D9]/60">Optimal Extraction Yield</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Flame, Activity, ArrowRight, Gauge, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';
import { AtelierPage } from '../types/atelier';

interface RoastPageProps {
  onNavigate: (page: AtelierPage) => void;
  onOpenReservation: () => void;
}

export const RoastPage: React.FC<RoastPageProps> = ({
  onNavigate,
  onOpenReservation,
}) => {
  const [selectedArchetype, setSelectedArchetype] = useState<number>(1);

  const archetypes = [
    {
      id: 'nordic',
      name: 'Nordic Cinnamon',
      dropTemp: '196.2°C',
      dtr: '10.2%',
      agtron: '88 (Very Light)',
      focus: 'High Acidic Liveliness & Terroir Florals',
      description: 'Dropped immediately following First Crack completion. Preserves delicate enzymatic organic acids (citric, malic, phosphoric) with zero Maillard caramel masking.',
      sensoryNotes: ['White Nectarine', 'Jasmine Flower', 'Earl Grey Bergamot', 'Meyer Lemon'],
      bestFor: 'Gesha Village Gori Gesha 1931 & High-Altitude Washed Micro-Lots',
      color: '#E58A2B',
    },
    {
      id: 'convective',
      name: 'Ultra-Light Convective',
      dropTemp: '198.4°C',
      dtr: '11.8%',
      agtron: '82 (Light)',
      focus: 'Enzymatic Sweetness & Tea-Like Silky Texture',
      description: 'Roasted entirely via recirculating superheated clean air (convective heat transfer). Ensures uniform core penetration without scorching bean cellulose surfaces.',
      sensoryNotes: ['Candied Bergamot', 'Papaya', 'Wild Forest Honeycomb', 'Lychee'],
      bestFor: 'Panama Finca Deborah ‘Echo’ Nitrogen Anaerobic Geisha',
      color: '#C6A15B',
    },
    {
      id: 'volcanic',
      name: 'Medium-Light Volcanic',
      dropTemp: '202.1°C',
      dtr: '13.5%',
      agtron: '74 (Medium-Light)',
      focus: 'Complex Esters, Cacao Terroir & Velvety Body',
      description: 'Extended gentle development phase cultivating complex sucrose caramelization while retaining vibrant acidity. Never crosses into roast smoke or bitter pyrolysis.',
      sensoryNotes: ['Smoked Cacao', 'Dried Figs', 'Cardamom', 'Dark Wild Honey'],
      bestFor: 'Araku Cloud Reserve Biodynamic Double Fermentation',
      color: '#DFB17B',
    },
  ];

  const currentProfile = archetypes[selectedArchetype];

  return (
    <div className="min-h-screen bg-[#060504] text-[#F5F2EB] pt-28 pb-32 selection:bg-[#C6A15B] selection:text-[#060504]">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#0C0A09]/80 backdrop-blur-md mb-8">
            <Flame className="w-3.5 h-3.5 text-[#E58A2B] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-bold">
              THERMODYNAMIC DISCIPLINE // FLUID AIR ROASTING
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F2EB] leading-[1.05] mb-8">
            The Science of the Roast Curve.
          </h1>

          <p className="text-lg sm:text-xl text-[#E8E3D9]/75 font-light leading-relaxed">
            We reject the burnt bitterness of commercial roasts. Using state-of-the-art single-pass convective airflow burners, our master roasters calibrate heat transfer down to 0.2°C per second, unlocking clean terroir brightness.
          </p>
        </div>
      </section>

      {/* Interactive Roast Archetype Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-2">
              SELECT ROAST CURVE ARCHETYPE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
              Calibrated Core Solubilities
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0C0A09] border border-[#C6A15B]/30">
            {archetypes.map((arch, idx) => (
              <button
                key={arch.id}
                onClick={() => setSelectedArchetype(idx)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedArchetype === idx
                    ? 'bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold shadow-lg'
                    : 'text-[#E8E3D9]/60 hover:text-[#F5F2EB] hover:bg-[#060504]'
                }`}
              >
                {arch.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Profile Detailed Card */}
        <div className="bg-[#0C0A09]/90 border border-[#C6A15B]/30 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A15B]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#C6A15B] tracking-widest uppercase font-bold">
                  ARCHETYPE PROFILE 0{selectedArchetype + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B]" />
                <span className="text-xs text-[#E8E3D9]/60 font-mono">{currentProfile.focus}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F2EB] leading-tight">
                {currentProfile.name}
              </h3>

              <p className="text-sm sm:text-base text-[#E8E3D9]/75 font-light leading-relaxed">
                {currentProfile.description}
              </p>

              {/* Sensory Notes Badges */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C6A15B] block">
                  Aromatic Fingerprint
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {currentProfile.sensoryNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-[#060504] border border-[#C6A15B]/30 text-xs font-serif text-[#F5F2EB] shadow-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#C6A15B]/15 text-xs text-[#E8E3D9]/70 font-light">
                <strong className="text-[#C6A15B] font-mono uppercase tracking-wider">Ideal Pairing: </strong>
                {currentProfile.bestFor}
              </div>
            </div>

            {/* Telemetry Gauge Display */}
            <div className="lg:col-span-5 bg-[#060504]/90 border border-[#C6A15B]/25 rounded-2xl p-8 space-y-6 shadow-inner">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase block">
                BATCH TELEMETRY METRICS
              </span>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#C6A15B]/15">
                  <span className="text-xs text-[#E8E3D9]/70 font-mono">Drop Temperature</span>
                  <span className="font-serif text-xl font-bold text-[#E58A2B]">{currentProfile.dropTemp}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#C6A15B]/15">
                  <span className="text-xs text-[#E8E3D9]/70 font-mono">Development Time Ratio (DTR)</span>
                  <span className="font-serif text-xl font-bold text-[#C6A15B]">{currentProfile.dtr}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#C6A15B]/15">
                  <span className="text-xs text-[#E8E3D9]/70 font-mono">Agtron Commercial Color</span>
                  <span className="font-serif text-xl font-bold text-[#F5F2EB]">{currentProfile.agtron}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#E8E3D9]/70 font-mono">First Crack Kinetics</span>
                  <span className="font-mono text-xs text-[#C6A15B]">8:45 min @ 191.0°C</span>
                </div>
              </div>

              <button
                onClick={onOpenReservation}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-widest transition-transform hover:scale-[1.02] shadow-xl cursor-pointer"
              >
                Sample in Omakase Flight
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Roasting Stage Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="max-w-2xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-3">
            ROAST STAGE KINETICS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F2EB]">
            From Green Embryo to Soluble Nectar.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0C0A09]/70 border border-[#C6A15B]/20 rounded-3xl p-8 space-y-4">
            <span className="font-mono text-xs text-[#C6A15B] tracking-widest uppercase">PHASE 01 // 0–4 MIN</span>
            <h3 className="font-serif text-2xl font-bold text-[#F5F2EB]">Drying & Thermal Equilibrium</h3>
            <p className="text-xs sm:text-sm text-[#E8E3D9]/70 font-light leading-relaxed">
              Green beans absorb conductive ambient heat. Free moisture is vaporized uniformly without boiling cellular moisture, preventing inner core cracking.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#E58A2B]">End temp: 150°C · Color: Pale Gold</div>
          </div>

          <div className="bg-[#0C0A09]/70 border border-[#C6A15B]/20 rounded-3xl p-8 space-y-4">
            <span className="font-mono text-xs text-[#C6A15B] tracking-widest uppercase">PHASE 02 // 4–9 MIN</span>
            <h3 className="font-serif text-2xl font-bold text-[#F5F2EB]">Maillard & Strecker Degradation</h3>
            <p className="text-xs sm:text-sm text-[#E8E3D9]/70 font-light leading-relaxed">
              Amino acids bond with reducing sugars to generate over 800 distinct aromatic volatile compounds: florals, ketones, and pyrazines.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#E58A2B]">Yellowing phase to 175°C · RoR: 8.5°C/min</div>
          </div>

          <div className="bg-[#0C0A09]/70 border border-[#C6A15B]/20 rounded-3xl p-8 space-y-4">
            <span className="font-mono text-xs text-[#C6A15B] tracking-widest uppercase">PHASE 03 // 9–11 MIN</span>
            <h3 className="font-serif text-2xl font-bold text-[#F5F2EB]">First Crack & Caramelization</h3>
            <p className="text-xs sm:text-sm text-[#E8E3D9]/70 font-light leading-relaxed">
              Cell walls rupture releasing aromatic steam. Master roaster halts thermal input and drops the batch into rapid vortex cooling within 90 seconds.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#E58A2B]">Exothermic release @ 191°C · Rapid Nitrogen quench</div>
          </div>
        </div>
      </section>

      {/* Origin Navigation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-[#0C0A09] border border-[#C6A15B]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block mb-2">
              TERROIR CONTINUUM
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB]">
              Discover the high-altitude volcanic soils shaping these roast curves.
            </h3>
          </div>
          <button
            onClick={() => onNavigate('origins')}
            className="shrink-0 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all cursor-pointer shadow-xl"
          >
            Explore Micro-Lot Origins
          </button>
        </div>
      </section>
    </div>
  );
};

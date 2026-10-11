import React, { useState } from 'react';
import { Mountain, Compass, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Droplets, MapPin } from 'lucide-react';
import { AtelierPage, OriginEstate } from '../types/atelier';
import { ORIGIN_ESTATES } from '../data/atelierData';

interface OriginsPageProps {
  onNavigate: (page: AtelierPage) => void;
  onOpenReservation: () => void;
}

export const OriginsPage: React.FC<OriginsPageProps> = ({
  onNavigate,
  onOpenReservation,
}) => {
  const [selectedEstateId, setSelectedEstateId] = useState<string>(ORIGIN_ESTATES[0].id);

  const selectedEstate = ORIGIN_ESTATES.find((e) => e.id === selectedEstateId) || ORIGIN_ESTATES[0];

  return (
    <div className="min-h-screen bg-[#060504] text-[#F5F2EB] pt-28 pb-32 selection:bg-[#C6A15B] selection:text-[#060504]">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#0C0A09]/80 backdrop-blur-md mb-8">
            <Mountain className="w-3.5 h-3.5 text-[#E58A2B]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-bold">
              MICRO-LOT ALLOCATIONS // CELLAR TERROIR
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F2EB] leading-[1.05] mb-8">
            Single-Estate Heritage.
          </h1>

          <p className="text-lg sm:text-xl text-[#E8E3D9]/75 font-light leading-relaxed">
            High-altitude volcanic soil, anaerobic natural fermentation, and ancient heirloom genetics. Sourced exclusively through direct-guild partnerships with masters cultivating fewer than 40 hectares globally.
          </p>
        </div>
      </section>

      {/* Featured Terroir Atlas Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Estate Selector Cards */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block mb-2">
              SELECT MICRO-LOT ESTATE
            </span>

            {ORIGIN_ESTATES.map((estate) => {
              const isSelected = estate.id === selectedEstate.id;
              return (
                <div
                  key={estate.id}
                  onClick={() => setSelectedEstateId(estate.id)}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0C0A09] border-[#C6A15B] shadow-2xl ring-1 ring-[#C6A15B]/30'
                      : 'bg-[#060504] border-[#C6A15B]/20 hover:border-[#C6A15B]/50 hover:bg-[#0C0A09]/60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E58A2B]">
                      {estate.country} · {estate.altitudeMeters}m
                    </span>
                    <span className="text-[10px] font-mono text-[#C6A15B] bg-[#C6A15B]/10 px-2.5 py-0.5 rounded-full">
                      {estate.varietal}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F2EB] mb-2">
                    {estate.name}
                  </h3>

                  <p className="text-xs text-[#E8E3D9]/60 line-clamp-2 font-light">
                    {estate.curatorNotes}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Immersive Estate Dossier */}
          <div className="lg:col-span-7 bg-[#0C0A09] border border-[#C6A15B]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            {/* Visual Header Image */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedEstate.image}
                alt={selectedEstate.name}
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-transparent to-transparent" />
              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-[#060504]/80 backdrop-blur-md border border-[#C6A15B]/30 text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest">
                {selectedEstate.harvestBatch}
              </div>
            </div>

            {/* Content Dossier */}
            <div className="p-8 sm:p-12 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#C6A15B] tracking-widest uppercase block mb-1">
                  {selectedEstate.region}, {selectedEstate.country}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
                  {selectedEstate.name}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#C6A15B]/15">
                <div>
                  <span className="text-[10px] font-mono text-[#E8E3D9]/50 block">Elevation</span>
                  <span className="font-serif text-lg text-[#F5F2EB] font-bold">{selectedEstate.altitudeMeters}m</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#E8E3D9]/50 block">Varietal</span>
                  <span className="font-serif text-sm text-[#C6A15B] font-bold">{selectedEstate.varietal}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#E8E3D9]/50 block">Process</span>
                  <span className="font-serif text-xs text-[#E58A2B] font-bold">{selectedEstate.process}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#E8E3D9]/50 block">Drop Curve</span>
                  <span className="font-serif text-xs text-[#F5F2EB] font-bold">{selectedEstate.roastProfile}</span>
                </div>
              </div>

              <p className="text-sm text-[#E8E3D9]/80 font-light leading-relaxed">
                {selectedEstate.curatorNotes}
              </p>

              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C6A15B] block">
                  Aromatic Cup Signature
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedEstate.sensoryNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-[#060504] border border-[#C6A15B]/30 text-xs font-serif text-[#F5F2EB]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenReservation}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl cursor-pointer"
                >
                  Book Terroir Flight Featuring This Lot
                </button>
                <button
                  onClick={() => onNavigate('the-roast')}
                  className="px-6 py-4 rounded-xl bg-[#060504] border border-[#C6A15B]/30 text-xs font-mono uppercase tracking-wider text-[#F5F2EB] hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  View Roast Curve
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Guild Alliances */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0C0A09]/80 border border-[#C6A15B]/20 rounded-3xl p-10 sm:p-14">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C6A15B] uppercase font-bold block mb-2">
              ETHICAL DIRECT COMMERCE
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#F5F2EB]">
              The Micro-Lot Producer Guild.
            </h3>
            <p className="text-sm text-[#E8E3D9]/70 font-light mt-3 leading-relaxed">
              We pay up to 450% above Fair Trade commodity prices directly to estate curators. This guarantees living wages, reforestation canopy projects, and micro-lot biodiversity preservation in Panama, Ethiopia, and India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#C6A15B]/15">
            <div>
              <span className="font-serif text-3xl font-bold text-[#C6A15B] block mb-1">4.5×</span>
              <span className="text-xs text-[#E8E3D9]/60 font-light">Above Fair-Trade Market Commodity Floor</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#E58A2B] block mb-1">100%</span>
              <span className="text-xs text-[#E8E3D9]/60 font-light">Shade-Grown Forest Canopy Biodiversity</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-[#F5F2EB] block mb-1">0%</span>
              <span className="text-xs text-[#E8E3D9]/60 font-light">Middlemen Brokers · Direct Farm Cellar Gate</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

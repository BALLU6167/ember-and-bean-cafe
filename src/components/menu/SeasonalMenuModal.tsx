import React, { useState } from 'react';
import { X, Sparkles, Coffee, ArrowRight, ShieldCheck } from 'lucide-react';
import { TASTING_FLIGHTS, ORIGIN_ESTATES } from '../../data/atelierData';

interface SeasonalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookFlight: () => void;
}

export const SeasonalMenuModal: React.FC<SeasonalMenuModalProps> = ({
  isOpen,
  onClose,
  onBookFlight,
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'single-origins' | 'cold-extract' | 'pairings'>('flights');

  if (!isOpen) return null;

  const coldExtractions = [
    {
      name: 'Kyoto 16-Hour Slow Drip Cold Essence',
      origin: 'Finca Deborah Geisha · Single-Drop Extraction',
      notes: 'Wild Jasmine, Bergamot Honey, Chilled White Peach',
      price: '₹550',
      description: 'Extracted drop-by-drop through ice-melt water at 2°C over sixteen continuous hours. Served over hand-carved crystal ice spheres.',
    },
    {
      name: 'Nitro Cascara Botanical Elixir',
      origin: 'Sun-Dried Gesha Village Cascara Husks',
      notes: 'Rosehip, Hibiscus, Wild Cranberry, Blood Orange',
      price: '₹480',
      description: 'Brewed from whole dried Geisha cherry pulp and infused with high-pressure nitrogen for a creamy, stout-like botanical head.',
    },
    {
      name: 'Smoked Tonka & Cacao Vacuum Siphon',
      origin: 'Araku Cloud Reserve Heirloom',
      notes: 'Smoked Vanilla, Toasted Hazelnut, 85% Dark Chocolate',
      price: '₹520',
      description: 'Extracted via twin-globe glass vacuum siphon over a butane flame, steeped with organic roasted tonka bean shavings.',
    },
  ];

  const wagashiPairings = [
    {
      name: '24K Gold Leaf Uji Matcha Canelé',
      pair: 'Recommended with Geisha Terroir Flight',
      notes: 'Ceremonial Grade Matcha, Caramelized Crust, Pure Gold Flake',
      price: '₹380',
      description: 'Crisp caramelized shell with a custardy, vibrant jade center baked fresh each dawn in copper molds.',
    },
    {
      name: 'Yuzu & Candied Bergamot Tartlet',
      pair: 'Recommended with Nordic Cinnamon Pour',
      notes: 'Kochi Yuzu Curd, Torched Meringue, Bergamot Zest',
      price: '₹420',
      description: 'High-acid citrus curd balanced with buttery almond pâte sablée.',
    },
    {
      name: 'Volcanic Basalt Smoked Cacao Bonbon',
      pair: 'Recommended with Anaerobic Natural Flight',
      notes: 'Single-Estate Panama Cacao, Hinoki Smoked Sea Salt',
      price: '₹350',
      description: 'Single-origin bean-to-bar dark chocolate infused with Japanese Hinoki wood smoke.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0A09] border border-[#C6A15B]/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#C6A15B]/20 flex items-center justify-between bg-[#060504]">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase block mb-1">
              HAUTE ROASTERY // AUTUMN / WINTER 2026
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB]">
              Seasonal Atelier Gastronomy Menu
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#0C0A09] border border-[#C6A15B]/30 text-[#E8E3D9]/70 hover:text-[#F5F2EB] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#C6A15B]/15 bg-[#080706] px-6 sm:px-8 gap-2 overflow-x-auto">
          {[
            { id: 'flights', label: 'Tasting Flights' },
            { id: 'single-origins', label: 'Single-Estate Pours' },
            { id: 'cold-extract', label: 'Cold Extractions' },
            { id: 'pairings', label: 'Wagashi & Pairings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#C6A15B] text-[#C6A15B] font-bold'
                  : 'border-transparent text-[#E8E3D9]/50 hover:text-[#F5F2EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Menu Items */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#060504]">
          {activeTab === 'flights' && (
            <div className="space-y-6">
              {TASTING_FLIGHTS.map((flight) => (
                <div
                  key={flight.id}
                  className="p-6 rounded-2xl bg-[#0C0A09] border border-[#C6A15B]/20 hover:border-[#C6A15B]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-[#F5F2EB]">
                        {flight.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#E58A2B] bg-[#E58A2B]/10 px-2 py-0.5 rounded-full">
                        {flight.coursesCount} Courses · {flight.durationMinutes} min
                      </span>
                    </div>
                    <p className="text-xs text-[#E8E3D9]/70 font-light leading-relaxed">
                      {flight.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {flight.tastingNotes.map((note, idx) => (
                        <span key={idx} className="text-[10px] font-serif text-[#C6A15B] bg-[#060504] px-2.5 py-0.5 rounded-md border border-[#C6A15B]/20">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-3">
                    <span className="font-serif text-2xl font-bold text-[#C6A15B]">
                      ₹{flight.priceInr}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onBookFlight();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-105 transition-transform"
                    >
                      Book Flight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'single-origins' && (
            <div className="space-y-6">
              {ORIGIN_ESTATES.map((estate) => (
                <div
                  key={estate.id}
                  className="p-6 rounded-2xl bg-[#0C0A09] border border-[#C6A15B]/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xl font-bold text-[#F5F2EB]">
                        {estate.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#C6A15B]">
                        ({estate.region}, {estate.country})
                      </span>
                    </div>
                    <p className="text-xs text-[#E8E3D9]/70 font-light leading-relaxed">
                      {estate.curatorNotes}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-[#E58A2B]">
                      <span>{estate.varietal}</span>
                      <span>·</span>
                      <span>{estate.process}</span>
                      <span>·</span>
                      <span>{estate.altitudeMeters}m</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-serif text-2xl font-bold text-[#C6A15B] block mb-2">
                      ₹650
                    </span>
                    <span className="text-[10px] font-mono text-[#E8E3D9]/50 block">Single 250ml Pour</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cold-extract' && (
            <div className="space-y-6">
              {coldExtractions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0C0A09] border border-[#C6A15B]/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-xl">
                    <span className="font-serif text-xl font-bold text-[#F5F2EB] block">
                      {item.name}
                    </span>
                    <p className="text-xs text-[#E8E3D9]/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[10px] font-mono text-[#E58A2B]">
                      Notes: {item.notes}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-serif text-2xl font-bold text-[#C6A15B] block mb-2">
                      {item.price}
                    </span>
                    <span className="text-[10px] font-mono text-[#E8E3D9]/50 block">Artisanal Cold Extraction</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pairings' && (
            <div className="space-y-6">
              {wagashiPairings.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0C0A09] border border-[#C6A15B]/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-xl">
                    <span className="font-serif text-xl font-bold text-[#F5F2EB] block">
                      {item.name}
                    </span>
                    <p className="text-xs text-[#E8E3D9]/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[10px] font-mono text-[#C6A15B]">
                      {item.pair}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-serif text-2xl font-bold text-[#C6A15B] block mb-2">
                      {item.price}
                    </span>
                    <span className="text-[10px] font-mono text-[#E8E3D9]/50 block">Pastry Atelier</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#C6A15B]/20 bg-[#060504] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#E8E3D9]/60">
            All prices inclusive of taxes · Gratuity at guest discretion
          </span>
          <button
            onClick={() => {
              onClose();
              onBookFlight();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer"
          >
            Reserve Your Table Now
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { COFFEE_REGIONS } from '../../data/cafeData';
import { CoffeeRegion } from '../../types/cafe';
import { MapPin, Mountain, User, Sparkles, Flame, Droplets, Compass } from 'lucide-react';

export const CoffeeJourneySection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<CoffeeRegion>(COFFEE_REGIONS[0]);
  const [roastSlider, setRoastSlider] = useState<number>(2); // 1 to 5

  const journeyStages = [
    {
      step: '01',
      title: 'Biodynamic Terroir & Shade',
      desc: 'Our coffee grows under natural forest canopies alongside wild pepper, jackfruit, and silver oaks in the mist-laden Eastern and Western Ghats. Volcanic soil and cool high-altitude nights allow sugars to concentrate slowly.',
      icon: Mountain,
    },
    {
      step: '02',
      title: 'Selective Hand-Picking & Fermentation',
      desc: 'Only crimson, sugar-dense coffee cherries (measured at 22°+ Brix) are harvested by hand. Cherries undergo 48 to 72 hours of controlled anaerobic maceration or clean washed fermentation in natural mountain spring water.',
      icon: Droplets,
    },
    {
      step: '03',
      title: 'Small-Batch Cast-Iron Roasting',
      desc: 'Roasted in our custom 12kg cast-iron roaster right here in Jubilee Hills. We use artisanal airflow profiling and slow temperature development to unlock delicate floral volatiles without charring.',
      icon: Flame,
    },
    {
      step: '04',
      title: 'Barista Precision Extraction',
      desc: 'We brew using TDS-refractometers, 9.2-bar pressure profiling on custom Slayer espresso machines, and 93°C water mineralized with magnesium and calcium for crystalline clarity.',
      icon: Compass,
    },
  ];

  const roastNames = ['Light Blonde (Floral & Tea-Like)', 'Light-Medium (Stone Fruit & Citrus)', 'Medium (Caramel & Milk Chocolate)', 'Medium-Dark (Dark Cocoa & Molasses)', 'Dark Obsidian (Charred Plum & Stout)'];
  const roastHexColors = ['#A3754F', '#845330', '#673D21', '#4A2B16', '#2A170C'];

  return (
    <section id="journey" className="py-24 bg-[#170E0A] text-[#F5EDE0] border-t border-[#C68B59]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold block mb-2">
            Terroir & Traceability
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] tracking-tight">
            The Bean to Cup Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5EDE0]/70 font-light">
            We partner directly with smallholder farming communities. Trace every bean from mountain cloud forests to your morning cup.
          </p>
        </div>

        {/* 4-Stage Horizontal Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {journeyStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="bg-[#1F140F] border border-[#C68B59]/30 rounded-3xl p-6 relative overflow-hidden group hover:border-[#DFB17B] transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[#C68B59]/50 group-hover:text-[#DFB17B] transition-colors">
                    {stage.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#2C1E18] flex items-center justify-center text-[#DFB17B]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#F5EDE0] mb-2">{stage.title}</h3>
                <p className="text-xs text-[#F5EDE0]/70 leading-relaxed font-light">{stage.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Sourcing Map & Farmer Spotlight */}
        <div className="bg-[#211510] border border-[#C68B59]/40 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: Origin Region Selector & Interactive Map Pinpoint */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#DFB17B] font-mono block mb-1">
                  Interactive Origin Explorer
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F5EDE0]">Direct Sourcing Regions</h3>
                <p className="text-xs text-[#F5EDE0]/70 mt-1">Select a microlot region to inspect altitude, farmer guild & flavor profiles.</p>
              </div>

              {/* Region Pill Tabs */}
              <div className="grid grid-cols-2 gap-2">
                {COFFEE_REGIONS.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedRegion.id === reg.id
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B] shadow-md'
                        : 'bg-[#140C08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{reg.name}</span>
                    <span className="block text-[10px] opacity-75">{reg.country}</span>
                  </button>
                ))}
              </div>

              {/* Stylized Coffee Map Diagram */}
              <div className="relative h-56 w-full bg-[#140C08] border border-[#C68B59]/30 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#DFB17B_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="flex justify-between items-center text-[10px] font-mono text-[#F5EDE0]/50 z-10">
                  <span>EQUATORIAL COFFEE BELT (15°N – 15°S)</span>
                  <span>GPS: 17°N, 78°E</span>
                </div>

                {/* Animated Region Marker on Diagram */}
                <div
                  className="absolute z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                  style={{ left: `${selectedRegion.coordinates.x}%`, top: `${selectedRegion.coordinates.y}%` }}
                >
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFB17B] opacity-75" />
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-[#C85A32] border-2 border-white items-center justify-center">
                      <MapPin className="w-3 h-3 text-white" />
                    </span>
                  </span>
                  <span className="bg-[#1E1410] text-[#DFB17B] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#C68B59] mt-1 shadow-md whitespace-nowrap">
                    {selectedRegion.name}
                  </span>
                </div>

                <div className="z-10 text-[11px] text-[#F5EDE0]/70">
                  <span>Current Harvest Status: </span>
                  <strong className="text-emerald-400">Sun-Dried on Raised African Beds</strong>
                </div>
              </div>
            </div>

            {/* Right: Selected Region Profile Card */}
            <div className="w-full lg:w-1/2 bg-[#170E0A] border border-[#C68B59]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedRegion.image}
                    alt={selectedRegion.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#170E0A] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#1E1410]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#DFB17B] border border-[#C68B59]/40">
                    {selectedRegion.country}
                  </div>
                </div>

                <h4 className="font-serif text-2xl font-bold text-[#F5EDE0] mb-2">{selectedRegion.name}</h4>
                <p className="text-xs text-[#F5EDE0]/80 leading-relaxed mb-6 font-light">{selectedRegion.story}</p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs mb-6">
                  <div className="bg-[#120B08] p-3 rounded-xl border border-[#C68B59]/20">
                    <span className="text-[10px] text-[#F5EDE0]/50 uppercase tracking-wider block">Elevation</span>
                    <strong className="text-[#F5EDE0] text-sm mt-0.5 block">{selectedRegion.elevation}</strong>
                  </div>
                  <div className="bg-[#120B08] p-3 rounded-xl border border-[#C68B59]/20">
                    <span className="text-[10px] text-[#F5EDE0]/50 uppercase tracking-wider block">Farm / Guild</span>
                    <strong className="text-[#F5EDE0] text-sm mt-0.5 block line-clamp-1">{selectedRegion.farmer}</strong>
                  </div>
                  <div className="bg-[#120B08] p-3 rounded-xl border border-[#C68B59]/20">
                    <span className="text-[10px] text-[#F5EDE0]/50 uppercase tracking-wider block">Processing Method</span>
                    <strong className="text-[#F5EDE0] text-sm mt-0.5 block line-clamp-1">{selectedRegion.process}</strong>
                  </div>
                  <div className="bg-[#120B08] p-3 rounded-xl border border-[#C68B59]/20">
                    <span className="text-[10px] text-[#F5EDE0]/50 uppercase tracking-wider block">Tasting Notes</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedRegion.notes.map((n, i) => (
                        <span key={i} className="text-[10px] bg-[#C68B59]/20 text-[#DFB17B] px-1.5 py-0.5 rounded">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Roast Level Sensory Slider */}
        <div className="bg-gradient-to-r from-[#211510] via-[#2A1B14] to-[#211510] border border-[#C68B59]/40 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] uppercase tracking-widest text-[#DFB17B] font-mono">
              Roaster Lab Demonstration
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EDE0] mt-1">
              Interactive Roast Spectrum Slider
            </h3>
            <p className="text-xs text-[#F5EDE0]/70 mt-1">
              Slide to observe how heat profiling transforms bean pigmentation, acid brightness, and sugar caramelization.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Visual Bean Color Orb Indicator */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full border-2 border-white/20 shadow-2xl transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: roastHexColors[roastSlider - 1] }}
              >
                <div className="w-10 h-10 border-t-2 border-l-2 border-white/30 rounded-full" />
              </div>
              <div className="text-left">
                <span className="text-xs uppercase tracking-wider text-[#C68B59] font-bold block">
                  Roast Profile Level {roastSlider} of 5
                </span>
                <span className="font-serif text-lg font-bold text-[#F5EDE0]">
                  {roastNames[roastSlider - 1]}
                </span>
              </div>
            </div>

            {/* Slider Track */}
            <div className="space-y-2 mb-8">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={roastSlider}
                onChange={(e) => setRoastSlider(Number(e.target.value))}
                className="w-full accent-[#DFB17B] h-2 bg-[#120B08] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#F5EDE0]/60">
                <span>1 (Light Floral)</span>
                <span>3 (Medium Caramel)</span>
                <span>5 (Dark Obsidian)</span>
              </div>
            </div>

            {/* Dynamic Sensor Gauge Bars */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-[#140C08] p-3 rounded-xl border border-[#C68B59]/20">
                <span className="text-[10px] uppercase text-[#F5EDE0]/60 block mb-1">Acidity & Brightness</span>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${Math.max(15, (6 - roastSlider) * 20)}%` }}
                  />
                </div>
                <span className="font-bold text-xs text-[#DFB17B]">{6 - roastSlider}/5</span>
              </div>

              <div className="bg-[#140C08] p-3 rounded-xl border border-[#C68B59]/20">
                <span className="text-[10px] uppercase text-[#F5EDE0]/60 block mb-1">Sweetness & Fruit</span>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-[#DFB17B] transition-all duration-300"
                    style={{ width: `${roastSlider === 2 || roastSlider === 3 ? 95 : 60}%` }}
                  />
                </div>
                <span className="font-bold text-xs text-[#DFB17B]">{roastSlider === 2 || roastSlider === 3 ? '5/5' : '3/5'}</span>
              </div>

              <div className="bg-[#140C08] p-3 rounded-xl border border-[#C68B59]/20">
                <span className="text-[10px] uppercase text-[#F5EDE0]/60 block mb-1">Body & Roast Depth</span>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-[#C85A32] transition-all duration-300"
                    style={{ width: `${roastSlider * 20}%` }}
                  />
                </div>
                <span className="font-bold text-xs text-[#DFB17B]">{roastSlider}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

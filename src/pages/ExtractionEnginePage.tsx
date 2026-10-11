import React, { useState } from 'react';
import { Layers, Activity, Sliders, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Scale, Thermometer, Droplets } from 'lucide-react';
import { AtelierPage } from '../types/atelier';
import { EXTRACTION_SPECS } from '../data/atelierData';

interface ExtractionEnginePageProps {
  onNavigate: (page: AtelierPage) => void;
  onOpenReservation: () => void;
}

export const ExtractionEnginePage: React.FC<ExtractionEnginePageProps> = ({
  onNavigate,
  onOpenReservation,
}) => {
  // Interactive Pour Calculator State
  const [coffeeDose, setCoffeeDose] = useState<number>(18);
  const [brewRatio, setBrewRatio] = useState<number>(16.5);
  const [waterTemp, setWaterTemp] = useState<number>(93.4);

  // Dynamic calculations
  const totalWater = Math.round(coffeeDose * brewRatio);
  const bloomWater = Math.round(coffeeDose * 2.8);
  const pourOne = Math.round((totalWater - bloomWater) * 0.55);
  const pourTwo = totalWater - bloomWater - pourOne;
  const estimatedTds = (1.38 + (93.4 - waterTemp) * 0.02).toFixed(2);
  const estimatedYield = ((totalWater * parseFloat(estimatedTds)) / coffeeDose).toFixed(1);

  const [activeComponentIdx, setActiveComponentIdx] = useState<number>(0);

  const technicalComponents = [
    {
      title: 'Hasami Matte-Ceramic Extraction Chamber',
      subtitle: 'Isothermal 60° Geometric Cone',
      material: 'Hand-Slip Cast Hasami Porcelain',
      tolerance: '±12 Microns',
      specs: [
        '93.4°C steady-state isothermal core eliminating temperature drop',
        'Calibrated interior vertical spiral ribs for uniform laminar capillary flow',
        'Unglazed tactile matte exterior with hydrophobic glazed interior chamber',
      ],
      detailText: 'Engineered in collaboration with 16th-generation ceramic masters in Nagasaki. The steep 60° conical angle and precise rib depth force water to migrate downward through the geometric centroid of the coffee bed, achieving zero peripheral water bypass.',
    },
    {
      title: 'Brushed-Brass Suspension Cradle',
      subtitle: 'Counter-Weighted Structural Chassis',
      material: 'Solid C36000 Architectural Brass',
      tolerance: 'CNC Milled to 0.05mm',
      specs: [
        'Kinetic balanced ring allowing micro-level horizontal alignment',
        'Unlacquered surface maturing into a bespoke golden amber patina',
        'Thermal decoupling ring separating hot chamber from cold ambient air',
      ],
      detailText: 'The brewer rests on an open-architecture cantilevered brass cradle. Its mass acts as an acoustic dampener and stabilizes the assembly during high-precision circular pours, while allowing clear 360° visibility of the extraction vapor trail.',
    },
    {
      title: '316L Laser-Perforated Micro-Mesh',
      subtitle: 'Zero-Paper Lipid Liberation Filter',
      material: 'Surgical Grade 316L Stainless Steel',
      tolerance: '30-Micron Laser Etched Conical Orifices',
      specs: [
        'Chemically inert with 0% paper lignin taste contamination',
        'Retains 99.8% of micro-particulate fines for crystalline visual clarity',
        'Allows fragile aromatic lipids and diterpenes (kahweol & cafestol) to enrich body',
      ],
      detailText: 'Conventional bleached paper filters strip out delicate aromatic fatty acids that carry floral top notes. Our conical laser-perforated mesh delivers the crystalline clarity of a pour-over combined with the rich tactile viscosity of a French press.',
    },
    {
      title: 'Double-Walled Borosilicate Carafe',
      subtitle: 'Thermal Vacuum Sensory Decanter',
      material: 'Ultra-Pure Borosilicate 3.3 Glass',
      tolerance: 'Annealed at 560°C',
      specs: [
        'Double-walled vacuum chamber preserving volatile aromatics for 30+ minutes',
        'Ergonomic drip-free pouring lip with anti-capillary lip profile',
        'Flared aromatic bulb bowl concentrating jasmine and bergamot vapor heads',
      ],
      detailText: 'Hand-blown by laboratory glass artisans. The flared bulb shape concentrates the rising aroma headspace, enabling the guest to inhale the volatile organic bloom before taking the first sip.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060504] text-[#F5F2EB] pt-28 pb-32 selection:bg-[#C6A15B] selection:text-[#060504]">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#0C0A09]/80 backdrop-blur-md mb-8">
            <Layers className="w-3.5 h-3.5 text-[#E58A2B]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-bold">
              ENGINEERING DOSSIER // EXTRACTION ENGINE
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F2EB] leading-[1.05] mb-8">
            Engineered Down to the Micron.
          </h1>

          <p className="text-lg sm:text-xl text-[#E8E3D9]/75 font-light leading-relaxed">
            The Atelier Brewer is a bespoke instrument designed to eliminate thermal loss, turbulent channeling, and paper adsorption. Explore its exploded anatomy and calibrated fluid dynamics.
          </p>
        </div>
      </section>

      {/* Interactive Exploded Blueprint Component Browser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-2">
              ASSEMBLY SCHEMATIC
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
              The Four Critical Assemblies
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {technicalComponents.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveComponentIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeComponentIdx === idx
                    ? 'bg-[#C6A15B] text-[#060504] font-bold shadow-lg'
                    : 'bg-[#0C0A09] text-[#E8E3D9]/60 border border-[#C6A15B]/20 hover:text-[#F5F2EB]'
                }`}
              >
                Part 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Component Blueprint Card */}
        <div className="bg-[#0C0A09] border border-[#C6A15B]/30 rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#C6A15B] tracking-widest uppercase">
                  COMPONENT 0{activeComponentIdx + 1} // 120-FRAME EXPLODED SEQUENCE
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F2EB] leading-tight">
                {technicalComponents[activeComponentIdx].title}
              </h3>
              <p className="text-sm font-mono text-[#E58A2B] uppercase tracking-wider">
                {technicalComponents[activeComponentIdx].subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#E8E3D9]/80 font-light leading-relaxed">
                {technicalComponents[activeComponentIdx].detailText}
              </p>

              <div className="space-y-3 pt-3">
                {technicalComponents[activeComponentIdx].specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#E8E3D9]/75 font-light">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#060504] border border-[#C6A15B]/30 rounded-2xl p-8 space-y-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block">
                METROLOGICAL TOLERANCES
              </span>
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#C6A15B]/15">
                  <span className="text-[11px] font-mono text-[#E8E3D9]/60 block">Base Material</span>
                  <span className="font-serif text-lg text-[#F5F2EB] font-bold">
                    {technicalComponents[activeComponentIdx].material}
                  </span>
                </div>
                <div className="pb-3 border-b border-[#C6A15B]/15">
                  <span className="text-[11px] font-mono text-[#E8E3D9]/60 block">Machining Tolerance</span>
                  <span className="font-serif text-lg text-[#E58A2B] font-bold">
                    {technicalComponents[activeComponentIdx].tolerance}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#E8E3D9]/60 block">Hydro-Thermal Function</span>
                  <span className="text-xs text-[#E8E3D9]/80 font-light mt-1 block">
                    Zero-bypass laminar liquid velocity calibrated for optimal contact duration (3:30 min).
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Extraction Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-3">
            INTERACTIVE EXTRACTION CALCULATOR
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F2EB] tracking-tight">
            Calibrate Your Hydro-Dynamics.
          </h2>
          <p className="text-sm text-[#E8E3D9]/70 font-light mt-3">
            Adjust the dry dose, brewing ratio, and thermal parameters to model the fluid extraction stages.
          </p>
        </div>

        <div className="bg-[#0C0A09]/90 border border-[#C6A15B]/30 rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-8">
              {/* Dose Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#E8E3D9]/70 uppercase tracking-wider flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C6A15B]" />
                    Dry Micro-Lot Dose
                  </span>
                  <span className="text-[#C6A15B] font-bold text-base">{coffeeDose}g</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="28"
                  step="0.5"
                  value={coffeeDose}
                  onChange={(e) => setCoffeeDose(parseFloat(e.target.value))}
                  className="w-full accent-[#C6A15B] bg-[#060504] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#E8E3D9]/40">
                  <span>14g (Single)</span>
                  <span>18g (Atelier Spec)</span>
                  <span>28g (Double Flight)</span>
                </div>
              </div>

              {/* Brew Ratio Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#E8E3D9]/70 uppercase tracking-wider flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-[#E58A2B]" />
                    Brew Ratio (Coffee : Water)
                  </span>
                  <span className="text-[#E58A2B] font-bold text-base">1:{brewRatio}</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="18"
                  step="0.5"
                  value={brewRatio}
                  onChange={(e) => setBrewRatio(parseFloat(e.target.value))}
                  className="w-full accent-[#E58A2B] bg-[#060504] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#E8E3D9]/40">
                  <span>1:14 (Concentrated)</span>
                  <span>1:16.5 (Optimal Claritas)</span>
                  <span>1:18 (Extended Tea-Body)</span>
                </div>
              </div>

              {/* Water Temperature Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#E8E3D9]/70 uppercase tracking-wider flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-[#C6A15B]" />
                    Water Temperature
                  </span>
                  <span className="text-[#F5F2EB] font-bold text-base">{waterTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="96"
                  step="0.2"
                  value={waterTemp}
                  onChange={(e) => setWaterTemp(parseFloat(e.target.value))}
                  className="w-full accent-[#C6A15B] bg-[#060504] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#E8E3D9]/40">
                  <span>90.0°C (Heavy Honey)</span>
                  <span>93.4°C (Atelier Isothermal)</span>
                  <span>96.0°C (High Acidity)</span>
                </div>
              </div>
            </div>

            {/* Kinetic Outputs */}
            <div className="lg:col-span-6 bg-[#060504] border border-[#C6A15B]/30 rounded-2xl p-8 space-y-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block">
                POUR PROFILE TELEMETRY
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0C0A09] border border-[#C6A15B]/15">
                  <span className="text-[10px] font-mono uppercase text-[#E8E3D9]/60 block mb-1">Total Water</span>
                  <span className="font-serif text-2xl font-bold text-[#F5F2EB]">{totalWater}g</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0C0A09] border border-[#C6A15B]/15">
                  <span className="text-[10px] font-mono uppercase text-[#E8E3D9]/60 block mb-1">Bloom (0:00 - 0:45)</span>
                  <span className="font-serif text-2xl font-bold text-[#E58A2B]">{bloomWater}g</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0C0A09] border border-[#C6A15B]/15">
                  <span className="text-[10px] font-mono uppercase text-[#E8E3D9]/60 block mb-1">Pour 1 (0:45 - 1:45)</span>
                  <span className="font-serif text-2xl font-bold text-[#C6A15B]">{pourOne}g</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0C0A09] border border-[#C6A15B]/15">
                  <span className="text-[10px] font-mono uppercase text-[#E8E3D9]/60 block mb-1">Pour 2 (1:45 - 3:00)</span>
                  <span className="font-serif text-2xl font-bold text-[#F5F2EB]">{pourTwo}g</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C6A15B]/15 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#E8E3D9]/60 block">Target Refractometer TDS</span>
                  <span className="font-serif text-xl font-bold text-[#C6A15B]">{estimatedTds}% TDS</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#E8E3D9]/60 block">Extraction Yield (EY)</span>
                  <span className="font-serif text-xl font-bold text-[#E58A2B]">{estimatedYield}% EY</span>
                </div>
              </div>

              <button
                onClick={onOpenReservation}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl cursor-pointer"
              >
                Experience This Extraction in Private Flight
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrological Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-2">
            BENCHMARK COMPARISON
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
            Atelier Brewer vs Classical Systems
          </h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[#C6A15B]/30 bg-[#0C0A09]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#060504] border-b border-[#C6A15B]/30 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C6A15B]">
              <tr>
                <th className="py-5 px-6">System</th>
                <th className="py-5 px-6">Thermal Retention</th>
                <th className="py-5 px-6">Bypass Velocity</th>
                <th className="py-5 px-6">Lipid Retention</th>
                <th className="py-5 px-6">Extraction Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C6A15B]/15 text-[#E8E3D9]/80 font-light">
              <tr className="bg-[#C6A15B]/5 font-medium text-[#F5F2EB]">
                <td className="py-5 px-6 font-serif font-bold text-[#C6A15B] text-base">Atelier Brewer</td>
                <td className="py-5 px-6">93.4°C Isothermal Core</td>
                <td className="py-5 px-6">0% (Zero Peripheral Bypass)</td>
                <td className="py-5 px-6">100% Intact Micro-Lipids</td>
                <td className="py-5 px-6 text-[#E58A2B] font-bold">21.4% (Optimal Claritas)</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-serif">Standard Glass Cone (V60)</td>
                <td className="py-5 px-6">87.5°C (Rapid Dissipation)</td>
                <td className="py-5 px-6">18% Uncontrolled Bypass</td>
                <td className="py-5 px-6">Adsorbed by Bleached Paper</td>
                <td className="py-5 px-6">18.2% (Uneven Dissolution)</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-serif">Thick Paper Carafe (Chemex)</td>
                <td className="py-5 px-6">84.2°C (High Heat Loss)</td>
                <td className="py-5 px-6">12% Wall Channeling</td>
                <td className="py-5 px-6">Completely Stripped</td>
                <td className="py-5 px-6">17.6% (Thin Body)</td>
              </tr>
              <tr>
                <td className="py-5 px-6 font-serif">Flat-Bed Metal Basket</td>
                <td className="py-5 px-6">89.1°C (Moderate)</td>
                <td className="py-5 px-6">8% Geometry Stagnation</td>
                <td className="py-5 px-6">Moderate Oil Transmission</td>
                <td className="py-5 px-6">19.1% (Standard Claritas)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

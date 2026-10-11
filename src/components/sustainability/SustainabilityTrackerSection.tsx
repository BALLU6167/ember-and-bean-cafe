import React from 'react';
import { SUSTAINABILITY_STATS } from '../../data/cafeData';
import { Leaf, RefreshCw, Sun, TreePine, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SustainabilityTrackerSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-transparent text-[#F5EDE0] border-t border-[#C68B59]/20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6B8E7B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#6B8E7B] font-bold block mb-2">
            {t.sustBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] tracking-tight">
            {t.sustTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5EDE0]/70 font-light">
            {t.sustDesc}
          </p>
        </div>

        {/* 4 Main Impact Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* 1. Cups Recycled */}
          <div className="bg-[#1A110D] border border-[#6B8E7B]/30 rounded-3xl p-6 text-center hover:border-[#6B8E7B] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#6B8E7B]/15 border border-[#6B8E7B]/30 flex items-center justify-center text-[#88A997] mx-auto mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#F5EDE0] block">
              {SUSTAINABILITY_STATS.cupsRecycled.toLocaleString()}+
            </span>
            <span className="text-xs uppercase tracking-wider text-[#6B8E7B] font-semibold mt-1 block">
              {t.sustStat1Title}
            </span>
            <p className="text-[11px] text-[#F5EDE0]/60 mt-2 font-light">
              {t.sustStat1Desc}
            </p>
          </div>

          {/* 2. Direct Trade Premium */}
          <div className="bg-[#1A110D] border border-[#6B8E7B]/30 rounded-3xl p-6 text-center hover:border-[#6B8E7B] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#6B8E7B]/15 border border-[#6B8E7B]/30 flex items-center justify-center text-[#88A997] mx-auto mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#DFB17B] block">
              +{SUSTAINABILITY_STATS.farmerPremiumPercent}%
            </span>
            <span className="text-xs uppercase tracking-wider text-[#6B8E7B] font-semibold mt-1 block">
              {t.sustStat2Title}
            </span>
            <p className="text-[11px] text-[#F5EDE0]/60 mt-2 font-light">
              {t.sustStat2Desc}
            </p>
          </div>

          {/* 3. Native Shade Trees */}
          <div className="bg-[#1A110D] border border-[#6B8E7B]/30 rounded-3xl p-6 text-center hover:border-[#6B8E7B] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#6B8E7B]/15 border border-[#6B8E7B]/30 flex items-center justify-center text-[#88A997] mx-auto mb-4">
              <TreePine className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#F5EDE0] block">
              {SUSTAINABILITY_STATS.treesPlantedInAraku.toLocaleString()}+
            </span>
            <span className="text-xs uppercase tracking-wider text-[#6B8E7B] font-semibold mt-1 block">
              {t.sustStat3Title}
            </span>
            <p className="text-[11px] text-[#F5EDE0]/60 mt-2 font-light">
              {t.sustStat3Desc}
            </p>
          </div>

          {/* 4. Solar Roasting */}
          <div className="bg-[#1A110D] border border-[#6B8E7B]/30 rounded-3xl p-6 text-center hover:border-[#6B8E7B] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#6B8E7B]/15 border border-[#6B8E7B]/30 flex items-center justify-center text-[#88A997] mx-auto mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#DFB17B] block">
              {SUSTAINABILITY_STATS.solarPoweredRoastingPercent}%
            </span>
            <span className="text-xs uppercase tracking-wider text-[#6B8E7B] font-semibold mt-1 block">
              {t.sustStat4Title}
            </span>
            <p className="text-[11px] text-[#F5EDE0]/60 mt-2 font-light">
              {t.sustStat4Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

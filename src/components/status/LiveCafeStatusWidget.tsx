import React, { useState, useEffect } from 'react';
import { Activity, Clock, Flame, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LiveCafeStatusWidget: React.FC = () => {
  const { t, lang } = useLanguage();
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const bakes = [
    { 
      name: lang === 'hi' ? 'इलायची और पिस्ता बन्स' : lang === 'te' ? 'యాలకుల & పిస్తా బన్స్' : 'Cardamom & Iranian Pistachio Buns', 
      timeAgo: lang === 'hi' ? '14 मि. पहले बेक' : lang === 'te' ? '14ని. క్రితం బేకింగ్' : 'Baked 14m ago', 
      remaining: 4, 
      soldOut: false 
    },
    { 
      name: lang === 'hi' ? 'बादाम फ्रैंगिपैन क्रोइसैन' : lang === 'te' ? 'ఆల్మండ్ ఫ్రాంగిపేన్ క్రోసెంట్స్' : '72-Layer Almond Frangipane Croissants', 
      timeAgo: lang === 'hi' ? '32 मि. पहले बेक' : lang === 'te' ? '32ని. క్రితం బేకింగ్' : 'Baked 32m ago', 
      remaining: 7, 
      soldOut: false 
    },
    { 
      name: lang === 'hi' ? 'साल्टेड कारमेल टार्ट' : lang === 'te' ? 'సాల్టెడ్ కారమెల్ టార్ట్' : 'Valrhona Salted Caramel Tart', 
      timeAgo: lang === 'hi' ? '1 घंटे पहले बेक' : lang === 'te' ? '1గం. క్రితం బేకింగ్' : 'Baked 1h ago', 
      remaining: 2, 
      soldOut: false 
    },
    { 
      name: lang === 'hi' ? 'सॉरडो कंट्री लोफ (प्री-ऑर्डर)' : lang === 'te' ? 'సార్డో కంట్రీ లోఫ్ (ప్రీ-ఆర్డర్)' : 'Sourdough Country Loaf (Pre-orders)', 
      timeAgo: lang === 'hi' ? 'सुबह का बैच' : lang === 'te' ? 'ఉదయపు బ్యాచ్' : 'Morning Bake', 
      remaining: 0, 
      soldOut: true 
    },
  ];

  // Simulate real-time updates every 45s
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(lang === 'hi' ? 'अभी अपडेट हुआ' : lang === 'te' ? 'ఇప్పుడే అప్‌డేట్ అయింది' : 'Updated just now');
    }, 45000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <section className="py-12 bg-transparent border-b border-[#D49B6A]/20 text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#160F0B]/85 to-[#120D0A]/85 border border-[#D49B6A]/25 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D49B6A]/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <div>
                <h3 className="font-serif font-bold text-xl text-[#FAF6F0] flex items-center gap-2">
                  {t.pulseHeaderTitle}
                  <span className="text-xs font-sans font-normal text-[#D49B6A] bg-[#120D0A] px-2.5 py-0.5 rounded-full border border-[#D49B6A]/30">
                    {t.pulseHeaderBadge}
                  </span>
                </h3>
                <p className="text-xs text-[#DDD3C4]/70 mt-0.5">{t.pulseHeaderDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#DDD3C4]/60 font-mono">
              <RefreshCw className="w-3.5 h-3.5 text-[#D49B6A] animate-spin" style={{ animationDuration: '6s' }} />
              <span>{lastUpdated}</span>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            {/* Busyness meter */}
            <div className="bg-[#160F0B]/80 border border-[#D49B6A]/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A]">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#DDD3C4]/70 block font-medium">
                  {t.pulsePaceTitle}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg font-bold text-[#FAF6F0]">{t.pulsePaceValue}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/40">
                    {t.pulsePaceBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Estimated Wait Time */}
            <div className="bg-[#160F0B]/80 border border-[#D49B6A]/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#DDD3C4]/70 block font-medium">
                  {t.pulseWaitTitle}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg font-bold text-[#D49B6A]">{t.pulseWaitValue}</span>
                  <span className="text-xs text-[#DDD3C4]/70">{t.pulseWaitSub}</span>
                </div>
              </div>
            </div>

            {/* Fresh Oven Status */}
            <div className="bg-[#160F0B]/80 border border-[#D49B6A]/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#B86F43]/15 border border-[#B86F43]/30 flex items-center justify-center text-[#B86F43]">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#DDD3C4]/70 block font-medium">
                  {t.pulseOvenTitle}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg font-bold text-[#FAF6F0]">{t.pulseOvenValue}</span>
                  <span className="text-xs text-[#B86F43] font-semibold">{t.pulseOvenBadge}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fresh Baked Batch Tracker */}
          <div className="mt-4 pt-4 border-t border-[#D49B6A]/15">
            <span className="text-xs uppercase tracking-wider text-[#D49B6A] font-semibold block mb-3">
              {t.pulseBakesHeader}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {bakes.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    item.soldOut
                      ? 'bg-[#120D0A]/50 border-white/5 opacity-60'
                      : 'bg-[#1A130E] border-[#D49B6A]/25 hover:border-[#D49B6A]/50'
                  }`}
                >
                  <div className="pr-2">
                    <span className="font-medium text-[#FAF6F0] block line-clamp-1">{item.name}</span>
                    <span className="text-[11px] text-[#DDD3C4]/60">{item.timeAgo}</span>
                  </div>
                  <div>
                    {item.soldOut ? (
                      <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800/40 rounded text-[10px] uppercase font-bold tracking-wider">
                        {t.pulseSoldOut}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#D49B6A]/15 text-[#D49B6A] border border-[#D49B6A]/35 rounded text-[10px] font-bold">
                        {item.remaining} {t.pulseLeft}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

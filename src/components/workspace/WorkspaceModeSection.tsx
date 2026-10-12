import React, { useState } from 'react';
import { 
  Wifi, 
  Zap, 
  Volume2, 
  Clock, 
  Laptop, 
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface WorkspaceModeSectionProps {
  onBookDesk?: () => void;
}

export const WorkspaceModeSection: React.FC<WorkspaceModeSectionProps> = ({ onBookDesk }) => {
  const { t } = useLanguage();
  const [wifiTesting, setWifiTesting] = useState(false);
  const [wifiSpeed, setWifiSpeed] = useState('328 Mbps');
  const [passClaimed, setPassClaimed] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const runSpeedTest = () => {
    setWifiTesting(true);
    setTimeout(() => {
      setWifiSpeed(`${Math.floor(310 + Math.random() * 30)} Mbps`);
      setWifiTesting(false);
    }, 1200);
  };

  const handleClaimPass = () => {
    setPassClaimed(true);
    if (onBookDesk) {
      onBookDesk();
    }
  };

  const handleCopyPass = () => {
    navigator.clipboard.writeText('EB-FOCUS-7075');
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  return (
    <section id="workspace" className="py-24 bg-transparent text-[#FAF6F0] border-t border-[#D49B6A]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-bold block mb-2">
            {t.wsBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6F0] tracking-tight">
            {t.wsTitle}
          </h2>
          <p className="mt-3 text-sm text-[#DDD3C4]/75 font-light leading-relaxed">
            {t.wsDesc}
          </p>
        </div>

        {/* 4 Infrastructure Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. Wi-Fi Gauge */}
          <div className="bg-[#160F0B] border border-[#D49B6A]/25 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A]">
                  <Wifi className="w-6 h-6" />
                </div>
                <button
                  onClick={runSpeedTest}
                  disabled={wifiTesting}
                  className="text-[10px] font-mono text-[#D49B6A] hover:text-[#FAF6F0] underline underline-offset-2 cursor-pointer"
                >
                  {wifiTesting ? t.wsPinging : t.wsSpeedTest}
                </button>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#DDD3C4]/70 block font-medium">{t.wsWifiTitle}</span>
              <span className="font-serif text-3xl font-bold text-[#D49B6A] mt-1 block">
                {wifiSpeed}
              </span>
            </div>
            <p className="text-[11px] text-[#DDD3C4]/50 mt-4 border-t border-[#D49B6A]/15 pt-3">
              {t.wsWifiDesc}
            </p>
          </div>

          {/* 2. Power Outlets */}
          <div className="bg-[#160F0B] border border-[#D49B6A]/25 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A] mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#DDD3C4]/70 block font-medium">{t.wsPowerTitle}</span>
              <span className="font-serif text-3xl font-bold text-[#FAF6F0] mt-1 block">
                {t.wsPowerSeats}
              </span>
            </div>
            <p className="text-[11px] text-[#DDD3C4]/50 mt-4 border-t border-[#D49B6A]/15 pt-3">
              {t.wsPowerDesc}
            </p>
          </div>

          {/* 3. Ambient Noise Level */}
          <div className="bg-[#160F0B] border border-[#D49B6A]/25 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A] mb-4">
                <Volume2 className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#DDD3C4]/70 block font-medium">{t.wsSoundTitle}</span>
              <span className="font-serif text-3xl font-bold text-[#D49B6A] mt-1 block">
                {t.wsSoundAmbient}
              </span>
            </div>
            <p className="text-[11px] text-[#DDD3C4]/50 mt-4 border-t border-[#D49B6A]/15 pt-3">
              {t.wsSoundDesc}
            </p>
          </div>

          {/* 4. Laptop-Friendly Hours */}
          <div className="bg-[#160F0B] border border-[#D49B6A]/25 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A] mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[#DDD3C4]/70 block font-medium">{t.wsHoursTitle}</span>
              <span className="font-serif text-3xl font-bold text-[#FAF6F0] mt-1 block">
                {t.wsHoursTimes}
              </span>
            </div>
            <p className="text-[11px] text-[#DDD3C4]/50 mt-4 border-t border-[#D49B6A]/15 pt-3">
              {t.wsHoursDesc}
            </p>
          </div>
        </div>

        {/* Dedicated Remote Work Desk Pass Banner */}
        <div className="bg-gradient-to-r from-[#221610] via-[#2A1B14] to-[#221610] border border-[#D49B6A]/30 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#D49B6A]/15 border border-[#D49B6A]/35 flex items-center justify-center text-[#D49B6A]">
              <Laptop className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D49B6A]">
                  {t.wsPassBadge}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                  {t.wsPassPerk}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FAF6F0] mt-1">
                {t.wsPassTitle}
              </h3>
              <p className="text-xs text-[#DDD3C4]/75 mt-1 max-w-xl">
                {t.wsPassDesc}
              </p>
            </div>
          </div>

          {!passClaimed ? (
            <button
              onClick={handleClaimPass}
              className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-[#D49B6A] to-[#B86F43] hover:from-[#E2AA79] hover:to-[#C67B4E] text-[#120D0A] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.wsPassCta}</span>
            </button>
          ) : (
            <div className="w-full lg:w-auto p-4 bg-[#120D0A] border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono text-emerald-400 block font-bold">✓ Pass Reserved</span>
                <span className="font-mono text-xs text-[#FAF6F0] font-bold">Token: #EB-FOCUS-7075</span>
              </div>
              <button
                onClick={handleCopyPass}
                className="px-4 py-2 bg-[#D49B6A] text-[#120D0A] font-bold text-[11px] uppercase rounded-xl hover:bg-white transition-colors cursor-pointer"
              >
                {copiedToken ? '✓ Copied Token' : 'Copy Pass Token'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

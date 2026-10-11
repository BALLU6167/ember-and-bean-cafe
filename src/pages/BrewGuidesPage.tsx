import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { BREW_GUIDES } from '../data/cafeData';
import { BrewGuide } from '../types/cafe';
import { cafeAudio } from '../utils/audio';
import { Play, Pause, RotateCcw, Clock, Calculator, Flame } from 'lucide-react';

interface BrewGuidesPageProps {
  onBackToHome: () => void;
}

export const BrewGuidesPage: React.FC<BrewGuidesPageProps> = ({ onBackToHome }) => {
  const [selectedGuide, setSelectedGuide] = useState<BrewGuide>(BREW_GUIDES[0]);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(15);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setCoffeeGrams(selectedGuide.recommendedCoffeeGrams);
  }, [selectedGuide]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev + 1 >= selectedGuide.totalTimeSeconds) {
            setIsTimerRunning(false);
            cafeAudio.playBrewChime();
            return selectedGuide.totalTimeSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, selectedGuide.totalTimeSeconds]);

  const ratioNumber = parseFloat(selectedGuide.ratio.split(':')[1]) || 16.6;
  const calculatedWaterGrams = Math.round(coffeeGrams * ratioNumber);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeStepIdx = (() => {
    let elapsed = 0;
    for (let i = 0; i < selectedGuide.steps.length; i++) {
      elapsed += selectedGuide.steps[i].seconds;
      if (timerSeconds <= elapsed) return i;
    }
    return selectedGuide.steps.length - 1;
  })();

  return (
    <div className="min-h-screen bg-[#1A110D] text-[#F5EDE0]">
      <PageHeader
        badge="Extraction Protocols"
        title="Master Brew Guide Library & Barista Academy"
        description="Dial in your morning pour-over, immersion press, or cold steep with precision water-to-coffee ratio calculators, grind size charts, and an interactive stopwatch."
        onBackToHome={onBackToHome}
        breadcrumbs={['Brew Guides']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Method Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {BREW_GUIDES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGuide(g)}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedGuide.id === g.id
                  ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B] shadow-xl scale-[1.02]'
                  : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
              }`}
            >
              <span className="block text-sm font-bold">{g.name}</span>
              <span className="block text-[11px] opacity-80 mt-1">{g.subtitle}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Calculator & Equipment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#120B08] border border-[#C68B59]/40 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-[#DFB17B]">
                <Calculator className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg">Interactive Ratio Calculator</h3>
              </div>

              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[#F5EDE0]/70">Dose (Ground Coffee):</span>
                    <strong className="font-mono text-base text-[#DFB17B]">{coffeeGrams}g</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="1"
                    value={coffeeGrams}
                    onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                    className="w-full accent-[#C68B59] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#C68B59]/20">
                  <div className="bg-[#1E1410] p-3 rounded-2xl border border-[#C68B59]/20 text-center">
                    <span className="text-[10px] text-[#F5EDE0]/50 block">Target Water:</span>
                    <strong className="font-mono text-lg text-[#DFB17B]">{calculatedWaterGrams}g</strong>
                  </div>
                  <div className="bg-[#1E1410] p-3 rounded-2xl border border-[#C68B59]/20 text-center">
                    <span className="text-[10px] text-[#F5EDE0]/50 block">Brew Ratio:</span>
                    <strong className="font-mono text-lg text-[#F5EDE0]">{selectedGuide.ratio}</strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#F5EDE0]/80 pt-3 border-t border-[#C68B59]/20">
                  <div className="flex justify-between">
                    <span>Recommended Grind:</span>
                    <strong className="text-[#F5EDE0]">{selectedGuide.grindSize}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Water Temperature:</span>
                    <strong className="text-[#DFB17B]">{selectedGuide.waterTemp}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#140C08] border border-[#C68B59]/30 rounded-3xl p-6">
              <span className="text-xs uppercase tracking-wider text-[#DFB17B] font-semibold block mb-3">
                Required Gear Checklist
              </span>
              <ul className="space-y-2 text-xs text-[#F5EDE0]/80">
                {selectedGuide.equipment.map((eq, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C68B59]" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Stopwatch & Steps */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gradient-to-r from-[#24150E] to-[#1A110D] border-2 border-[#C68B59]/50 rounded-3xl p-8 text-center shadow-2xl">
              <div className="flex items-center justify-between text-xs text-[#DFB17B] mb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> LIVE EXTRACTION TIMER
                </span>
                <span>Target: {formatTimer(selectedGuide.totalTimeSeconds)}</span>
              </div>

              <div className="font-mono text-6xl sm:text-7xl font-black text-[#DFB17B] tracking-tight my-4">
                {formatTimer(timerSeconds)}
              </div>

              <div className="w-full bg-[#120B08] h-2.5 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[#C68B59] to-[#DFB17B] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (timerSeconds / selectedGuide.totalTimeSeconds) * 100)}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer transition-transform hover:scale-105 ${
                    isTimerRunning
                      ? 'bg-amber-600 text-white'
                      : 'bg-gradient-to-r from-[#C68B59] to-[#C85A32] text-[#1E1410]'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause Stopwatch' : 'Start Brew Stopwatch'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="p-3.5 bg-[#120B08] border border-[#C68B59]/30 hover:border-white rounded-2xl text-[#F5EDE0]/70 hover:text-white transition-colors cursor-pointer"
                  title="Reset Stopwatch"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Steps Sequence */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#DFB17B] font-semibold block">
                Step-by-Step Pouring Milestones
              </span>

              {selectedGuide.steps.map((st, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isTimerRunning && activeStepIdx === idx
                      ? 'bg-[#2A1B14] border-[#DFB17B] shadow-lg scale-[1.01]'
                      : 'bg-[#140C08] border-[#C68B59]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-sm text-[#F5EDE0] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C68B59]/20 text-[#DFB17B] text-xs flex items-center justify-center font-mono font-bold">
                        {idx + 1}
                      </span>
                      {st.title}
                    </span>
                    <span className="font-mono text-xs text-[#DFB17B] bg-[#120B08] px-2.5 py-1 rounded border border-[#C68B59]/20">
                      {st.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#F5EDE0]/70 pl-8 leading-relaxed font-light">{st.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

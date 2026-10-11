import React, { useState, useEffect } from 'react';
import { BREW_GUIDES } from '../../data/cafeData';
import { BrewGuide } from '../../types/cafe';
import { cafeAudio } from '../../utils/audio';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Calculator, 
  X, 
  CheckCircle, 
  Flame, 
  Droplets,
  Scale
} from 'lucide-react';

interface BrewGuideLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrewGuideLibraryModal: React.FC<BrewGuideLibraryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<BrewGuide>(BREW_GUIDES[0]);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(15);

  // Live Brew Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    // Reset timer when switching guides
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

  if (!isOpen) return null;

  // Ratio calculator: calculate water grams based on ratio
  const ratioNumber = parseFloat(selectedGuide.ratio.split(':')[1]) || 16.6;
  const calculatedWaterGrams = Math.round(coffeeGrams * ratioNumber);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find active step based on timerSeconds
  const activeStepIdx = (() => {
    let elapsed = 0;
    for (let i = 0; i < selectedGuide.steps.length; i++) {
      elapsed += selectedGuide.steps[i].seconds;
      if (timerSeconds <= elapsed) return i;
    }
    return selectedGuide.steps.length - 1;
  })();

  return (
    <div className="fixed inset-0 z-[99965] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-[#1A110D] border-2 border-[#C68B59]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0] my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close Brew Guide Library"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C68B59] font-bold block mb-1">
            Home Barista Academy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EDE0]">
            The Master Brew Guide Library
          </h2>
          <p className="text-xs sm:text-sm text-[#F5EDE0]/70">
            Step-by-step extraction blueprints, dynamic water-to-coffee ratio calculator, and an integrated audio brew stopwatch.
          </p>
        </div>

        {/* Method Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {BREW_GUIDES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGuide(g)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                selectedGuide.id === g.id
                  ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B] shadow-lg'
                  : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
              }`}
            >
              <span className="block text-xs font-bold">{g.name}</span>
              <span className="block text-[10px] opacity-75 mt-0.5">{g.subtitle.split(',')[0]}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Ratio Calculator & Equipment */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dynamic Ratio Calculator Card */}
            <div className="bg-[#120B08] border border-[#C68B59]/40 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center gap-2 mb-3 text-[#DFB17B]">
                <Calculator className="w-4 h-4" />
                <h3 className="font-serif font-bold text-base">Brew Ratio Calculator</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F5EDE0]/70">Ground Coffee Dose:</span>
                    <strong className="font-mono text-sm text-[#DFB17B]">{coffeeGrams}g</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="1"
                    value={coffeeGrams}
                    onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                    className="w-full accent-[#C68B59]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#C68B59]/20">
                  <div className="bg-[#1E1410] p-2.5 rounded-xl border border-[#C68B59]/20 text-center">
                    <span className="text-[10px] text-[#F5EDE0]/50 block">Target Water:</span>
                    <strong className="font-mono text-base text-[#DFB17B]">{calculatedWaterGrams}g</strong>
                  </div>
                  <div className="bg-[#1E1410] p-2.5 rounded-xl border border-[#C68B59]/20 text-center">
                    <span className="text-[10px] text-[#F5EDE0]/50 block">Golden Ratio:</span>
                    <strong className="font-mono text-base text-[#F5EDE0]">{selectedGuide.ratio}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-[#F5EDE0]/70 pt-2 border-t border-[#C68B59]/20">
                  <div className="flex justify-between">
                    <span>Grind Size:</span>
                    <strong className="text-[#F5EDE0]">{selectedGuide.grindSize}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Water Temperature:</span>
                    <strong className="text-[#DFB17B]">{selectedGuide.waterTemp}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Required List */}
            <div className="bg-[#140C08] border border-[#C68B59]/30 rounded-2xl p-5">
              <span className="text-xs uppercase tracking-wider text-[#DFB17B] font-semibold block mb-3">
                Equipment Checklist
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

          {/* Right Column: Live Stopwatch & Step-by-Step Walkthrough */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Brew Timer Widget */}
            <div className="bg-gradient-to-r from-[#211510] to-[#170E0A] border-2 border-[#C68B59]/50 rounded-2xl p-6 text-center shadow-xl">
              <div className="flex items-center justify-between text-xs text-[#DFB17B] mb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> LIVE BREW STOPWATCH
                </span>
                <span>Target: {formatTimer(selectedGuide.totalTimeSeconds)}</span>
              </div>

              <div className="font-mono text-5xl sm:text-6xl font-black text-[#DFB17B] tracking-tight my-3">
                {formatTimer(timerSeconds)}
              </div>

              {/* Progress Bar of Target Time */}
              <div className="w-full bg-[#120B08] h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[#C68B59] to-[#DFB17B] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (timerSeconds / selectedGuide.totalTimeSeconds) * 100)}%`,
                  }}
                />
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105 ${
                    isTimerRunning
                      ? 'bg-amber-600 text-white'
                      : 'bg-gradient-to-r from-[#C68B59] to-[#C85A32] text-[#1E1410]'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause Extraction' : 'Start Brew Timer'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="p-3 bg-[#120B08] border border-[#C68B59]/30 hover:border-white rounded-xl text-[#F5EDE0]/70 hover:text-white transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#DFB17B] font-semibold block">
                Extraction Sequence Steps
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
                      <span className="w-5 h-5 rounded-full bg-[#C68B59]/20 text-[#DFB17B] text-[10px] flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {st.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#DFB17B] bg-[#120B08] px-2 py-0.5 rounded border border-[#C68B59]/20">
                      {st.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#F5EDE0]/70 pl-7 leading-relaxed font-light">{st.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

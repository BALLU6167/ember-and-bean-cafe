import React, { useState, useEffect } from 'react';
import { Flame, Clock, X, ArrowRight } from 'lucide-react';

interface CountdownBannerProps {
  onExploreSeasonal: () => void;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ onExploreSeasonal }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-[#24150E] via-[#382115] to-[#24150E] border-b border-[#C68B59]/30 text-[#F5EDE0] text-xs px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Badge & Urgency Text */}
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
          <span className="inline-flex items-center gap-1 bg-[#C85A32] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm">
            <Flame className="w-3 h-3 fill-current" /> Limited Microlot
          </span>
          <span className="text-[#F5EDE0]/90">
            Fresh Araku Geisha Batch roasted this morning · <strong className="text-[#DFB17B]">Only 6 bags remain</strong>
          </span>
        </div>

        {/* Live Countdown & Action */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#DFB17B] bg-[#140C08]/60 px-2.5 py-1 rounded border border-[#C68B59]/30">
            <Clock className="w-3.5 h-3.5 text-[#C68B59]" />
            <span>Roast Closes:</span>
            <span className="font-bold text-[#F5EDE0]">{pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s</span>
          </div>

          <button
            onClick={onExploreSeasonal}
            className="flex items-center gap-1 text-[#DFB17B] hover:text-white font-medium underline underline-offset-2 transition-colors cursor-pointer"
          >
            Claim Bag <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-[#F5EDE0]/50 hover:text-[#F5EDE0] transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

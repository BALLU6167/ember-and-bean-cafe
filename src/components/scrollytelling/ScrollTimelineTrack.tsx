import React from 'react';
import { originAudio } from '../../utils/soundEngine';

interface ScrollTimelineTrackProps {
  progress: number; // 0 to 1
  onJumpToProgress: (targetP: number) => void;
}

export const ScrollTimelineTrack: React.FC<ScrollTimelineTrackProps> = ({
  progress,
  onJumpToProgress,
}) => {
  const chapters = [
    { num: '01', title: 'Genesis', target: 0.05 },
    { num: '02', title: 'Architecture', target: 0.28 },
    { num: '03', title: 'Extraction', target: 0.52 },
    { num: '04', title: 'Symphony', target: 0.74 },
    { num: '05', title: 'Reassembly', target: 0.94 },
  ];

  const getActiveChapterIndex = () => {
    if (progress < 0.16) return 0;
    if (progress < 0.40) return 1;
    if (progress < 0.64) return 2;
    if (progress < 0.85) return 3;
    return 4;
  };

  const activeIndex = getActiveChapterIndex();

  return (
    <aside
      aria-label="Story chapter progression"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-5 select-none"
    >
      <div className="flex flex-col items-end gap-4">
        {chapters.map((ch, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={ch.num}
              onClick={() => {
                originAudio.playClick();
                onJumpToProgress(ch.target);
              }}
              className="group flex items-center gap-3 cursor-pointer py-1"
            >
              {/* Title tooltip on hover or active */}
              <span
                className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-origin-cyan opacity-100 translate-x-0'
                    : 'text-white/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {ch.num} · {ch.title}
              </span>

              {/* Node indicator */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'scale-125' : 'group-hover:scale-110'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'bg-origin-cyan shadow-glow-cyan'
                      : 'bg-white/20 group-hover:bg-white/60'
                  }`}
                />
                {isActive && (
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-origin-cyan animate-ping opacity-60" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Numerical micro indicator */}
      <div className="pt-2 text-[10px] font-mono text-white/30 tracking-widest">
        <span className="text-origin-cyan">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span> / 05</span>
      </div>
    </aside>
  );
};

import React from 'react';
import { X, Award, MapPin, Thermometer, Droplet, Wind } from 'lucide-react';
import { originAudio } from '../../utils/soundEngine';

interface FlavorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAllocation: () => void;
}

export const FlavorProfileModal: React.FC<FlavorProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenAllocation,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    originAudio.playClick();
    onClose();
  };

  const scores = [
    { label: 'Clean Cup & Purity', score: 10.0, max: 10, pct: '100%' },
    { label: 'Floral Volatility (Jasmine)', score: 9.9, max: 10, pct: '99%' },
    { label: 'Enzymatic Acidity (Bergamot)', score: 9.8, max: 10, pct: '98%' },
    { label: 'Complex Sweetness (White Peach)', score: 9.6, max: 10, pct: '96%' },
    { label: 'Mouthfeel & Tactile Finish', score: 8.6, max: 10, pct: '86%' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#050505]/85 backdrop-blur-2xl transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#0A0A0C] border border-white/10 rounded-2xl p-6 sm:p-10 text-white shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-white/50 hover:text-white rounded-full border border-white/5 hover:border-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-indigo/40 bg-origin-indigo/10 text-origin-cyan text-[10px] font-mono tracking-widest uppercase">
              <Award className="w-3.5 h-3.5" />
              SCA Cup Score: 95.75 · Lot #006
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-white/95">
              Sensory Profile & Origin Dossier
            </h3>
            <p className="text-sm text-white/60">
              An uncompromised exploration of altitude, enzymatic purity, and molecular flavor preservation.
            </p>
          </div>

          {/* Terroir & Origin Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-origin-card p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-origin-cyan text-xs font-mono uppercase">
                <MapPin className="w-3.5 h-3.5" />
                Terroir
              </div>
              <span className="text-sm font-semibold text-white/90 block mt-2">Gesha Village</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Block 42, Ethiopia</span>
            </div>

            <div className="glass-origin-card p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-origin-cyan text-xs font-mono uppercase">
                <Wind className="w-3.5 h-3.5" />
                Elevation
              </div>
              <span className="text-sm font-semibold text-white/90 block mt-2">2,150m AMSL</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Volcanic High Mist</span>
            </div>

            <div className="glass-origin-card p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-origin-cyan text-xs font-mono uppercase">
                <Droplet className="w-3.5 h-3.5" />
                Fermentation
              </div>
              <span className="text-sm font-semibold text-white/90 block mt-2">72h Anaerobic</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Cold Carbonic Maceration</span>
            </div>

            <div className="glass-origin-card p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-origin-cyan text-xs font-mono uppercase">
                <Thermometer className="w-3.5 h-3.5" />
                Roast Degree
              </div>
              <span className="text-sm font-semibold text-white/90 block mt-2">Agtron 82/94</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Nordic Molecular Light</span>
            </div>
          </div>

          {/* Sensory Cupping Radar Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50">
              Cupping Metric Scores (Official Protocol)
            </h4>
            <div className="space-y-3">
              {scores.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80 font-medium">{item.label}</span>
                    <span className="text-origin-cyan font-mono font-bold">{item.score.toFixed(1)} / {item.max}</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-origin-indigo to-origin-cyan h-full rounded-full transition-all duration-700"
                      style={{ width: item.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Cup Extraction Recipe */}
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-origin-cyan">
              Recommended Extraction Protocol
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded bg-white/[0.03]">
                <span className="text-white/40 block text-[10px]">DOSE</span>
                <span className="text-white font-bold">18.5g : 300g</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03]">
                <span className="text-white/40 block text-[10px]">TEMP</span>
                <span className="text-white font-bold">93.4°C</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03]">
                <span className="text-white/40 block text-[10px]">TIME</span>
                <span className="text-white font-bold">2m 45s</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => {
                handleClose();
                onOpenAllocation();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase btn-gradient-border text-white shadow-glow-cyan"
            >
              Secure This Batch Allocation
            </button>
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

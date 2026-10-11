import React, { useEffect } from 'react';
import { Eye, Type, Activity, X, MousePointer, RotateCcw } from 'lucide-react';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  fontScale: 'sm' | 'md' | 'lg' | 'xl';
  setFontScale: (scale: 'sm' | 'md' | 'lg' | 'xl') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  customCursorEnabled?: boolean;
  setCustomCursorEnabled?: (val: boolean) => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  isOpen,
  onClose,
  fontScale,
  setFontScale,
  highContrast,
  setHighContrast,
  reducedMotion,
  setReducedMotion,
  customCursorEnabled = false,
  setCustomCursorEnabled,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    setFontScale('md');
    setHighContrast(false);
    setReducedMotion(false);
    if (setCustomCursorEnabled) setCustomCursorEnabled(false);
  };

  return (
    <>
      {/* Backdrop overlay to close when clicking outside */}
      <div
        className="fixed inset-0 z-[99990] bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Anchored Panel - positioned directly below the navbar controls */}
      <div 
        className="fixed top-20 right-4 sm:right-6 md:right-16 z-[100000] w-84 max-w-[calc(100vw-2rem)] bg-[#1A110D] border-2 border-[#DFB17B] rounded-2xl p-5 shadow-2xl text-[#F5EDE0] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-title"
      >
        {/* Decorative Caret pointing up to navbar button */}
        <div className="absolute -top-2.5 right-6 w-4 h-4 bg-[#1A110D] border-t-2 border-l-2 border-[#DFB17B] rotate-45" />

        <div className="relative flex items-center justify-between border-b border-[#C68B59]/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#DFB17B]" />
            <h3 id="accessibility-title" className="font-serif font-semibold text-lg text-[#F5EDE0]">Display & Accessibility</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#F5EDE0]/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close settings panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Font Size Adjuster */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2 text-[#DFB17B]">
              <Type className="w-4 h-4" /> Text Sizing
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-[#120B08] p-1 rounded-lg border border-[#C68B59]/30">
              {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontScale(size)}
                  className={`py-1.5 rounded font-medium transition-all cursor-pointer ${
                    fontScale === size
                      ? 'bg-[#C68B59] text-[#1E1410] font-bold shadow-sm'
                      : 'text-[#F5EDE0]/70 hover:text-[#F5EDE0] hover:bg-white/5'
                  }`}
                >
                  {size === 'sm' ? '85%' : size === 'md' ? '100%' : size === 'lg' ? '115%' : '130%'}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between py-2 border-t border-[#C68B59]/20">
            <div>
              <span className="font-medium text-[#F5EDE0] block">High Contrast Mode</span>
              <span className="text-[10px] text-[#F5EDE0]/60">Crisp edges & enhanced WCAG AAA readability</span>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              role="switch"
              aria-checked={highContrast}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                highContrast ? 'bg-[#DFB17B]' : 'bg-[#2C1E18] border border-[#C68B59]/40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  highContrast ? 'translate-x-5 bg-[#1E1410]' : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Mode */}
          <div className="flex items-center justify-between py-2 border-t border-[#C68B59]/20">
            <div>
              <span className="font-medium text-[#F5EDE0] block">Reduced Motion</span>
              <span className="text-[10px] text-[#F5EDE0]/60">Disables parallax & intense animations</span>
            </div>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              role="switch"
              aria-checked={reducedMotion}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                reducedMotion ? 'bg-[#DFB17B]' : 'bg-[#2C1E18] border border-[#C68B59]/40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  reducedMotion ? 'translate-x-5 bg-[#1E1410]' : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>

          {/* Custom Cursor Toggle */}
          {setCustomCursorEnabled && (
            <div className="flex items-center justify-between py-2 border-t border-[#C68B59]/20">
              <div>
                <span className="font-medium text-[#F5EDE0] block">Artisan Custom Cursor</span>
                <span className="text-[10px] text-[#F5EDE0]/60">Magnetic bean cursor ring</span>
              </div>
              <button
                onClick={() => setCustomCursorEnabled(!customCursorEnabled)}
                role="switch"
                aria-checked={customCursorEnabled}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  customCursorEnabled ? 'bg-[#DFB17B]' : 'bg-[#2C1E18] border border-[#C68B59]/40'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform ${
                    customCursorEnabled ? 'translate-x-5 bg-[#1E1410]' : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Reset Action */}
          <div className="pt-2 border-t border-[#C68B59]/20 flex justify-end">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-[11px] text-[#DFB17B] hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

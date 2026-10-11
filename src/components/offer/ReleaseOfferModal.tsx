import React, { useState, useEffect } from 'react';
import { Lock, Tag, X, CheckCircle, AlertCircle, Trash2, Percent, Sparkles, KeyRound } from 'lucide-react';
import { useOffer } from '../../context/OfferContext';

interface ReleaseOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOfferReleased?: () => void;
}

export const ReleaseOfferModal: React.FC<ReleaseOfferModalProps> = ({
  isOpen,
  onClose,
  onOfferReleased,
}) => {
  const { offer, isOfferActive, releaseOffer, endOffer } = useOffer();

  // State
  const [passkeyInput, setPasskeyInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passkeyError, setPasskeyError] = useState('');
  
  // Offer Form State
  const [description, setDescription] = useState('');
  const [discountPct, setDiscountPct] = useState<string>('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // The secret passkey requirement (never displayed in the UI)
  const REQUIRED_PASSKEY = '7075';

  // Reset modal state on open/close
  useEffect(() => {
    if (isOpen) {
      setPasskeyInput('');
      setIsUnlocked(false);
      setPasskeyError('');
      setFormError('');
      setSuccessMessage('');
      if (offer && offer.isActive) {
        setDescription(offer.description);
        setDiscountPct(offer.discountPct.toString());
      } else {
        setDescription('');
        setDiscountPct('');
      }
    }
  }, [isOpen, offer]);

  if (!isOpen) return null;

  // Handle Passkey verification
  const handleVerifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    setPasskeyError('');

    if (passkeyInput === REQUIRED_PASSKEY) {
      setIsUnlocked(true);
      setPasskeyError('');
    } else {
      setPasskeyError('Incorrect passkey. Access denied.');
      setPasskeyInput('');
    }
  };

  // Handle Offer Submission (Done button)
  const handleDone = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!description.trim()) {
      setFormError('Please enter a description for the offer.');
      return;
    }

    const pctNumber = Number(discountPct);
    if (isNaN(pctNumber) || pctNumber <= 0 || pctNumber > 100) {
      setFormError('Please enter a valid discount percentage between 1 and 100.');
      return;
    }

    releaseOffer(description.trim(), pctNumber);
    setSuccessMessage('Offer released successfully! It is now live at the top of the website.');

    if (onOfferReleased) {
      onOfferReleased();
    }

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  // Handle Ending Current Offer
  const handleEndOffer = () => {
    endOffer();
    setSuccessMessage('Offer ended. It has been removed from the website.');
    setDescription('');
    setDiscountPct('');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[99990] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-[#160F0B] border-2 border-[#D49B6A]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#FAF6F0] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#DDD3C4]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Release Offer modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#D49B6A]/15 border border-[#D49B6A]/35 flex items-center justify-center text-[#D49B6A] shadow-md">
            {isUnlocked ? <Tag className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D49B6A] font-bold">
                Admin Portal
              </span>
              {isOfferActive && (
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Offer Active
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#FAF6F0]">
              Release Special Offer
            </h3>
          </div>
        </div>

        {/* Success Confirmation Toast */}
        {successMessage ? (
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h4 className="font-serif text-xl font-bold text-[#FAF6F0] mb-2">Success</h4>
            <p className="text-xs text-[#DDD3C4]/80 max-w-sm mx-auto">{successMessage}</p>
          </div>
        ) : !isUnlocked ? (
          /* STEP 1: Passkey Verification */
          <form onSubmit={handleVerifyPasskey} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#DDD3C4] mb-2">
                Enter Manager / Roastery Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  maxLength={10}
                  value={passkeyInput}
                  onChange={(e) => {
                    setPasskeyInput(e.target.value);
                    setPasskeyError('');
                  }}
                  placeholder="••••"
                  className={`w-full bg-[#120D0A] border rounded-2xl px-4 py-3.5 text-center text-lg tracking-[0.5em] font-mono text-[#FAF6F0] placeholder-[#DDD3C4]/30 focus:outline-none transition-all ${
                    passkeyError
                      ? 'border-red-500 focus:border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)] animate-shake'
                      : 'border-[#D49B6A]/35 focus:border-[#D49B6A] focus:shadow-[0_0_12px_rgba(212,155,106,0.3)]'
                  }`}
                />
                <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DDD3C4]/40" />
              </div>
              <p className="text-[11px] text-[#DDD3C4]/60 mt-2 font-light">
                Secured access for authorized cafe managers to publish or end promotional banners.
              </p>
            </div>

            {passkeyError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 text-xs animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passkeyError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#D49B6A]/30 text-xs font-semibold text-[#DDD3C4] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D49B6A] to-[#B86F43] hover:from-[#E2AA79] hover:to-[#C67B4E] text-[#120D0A] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                Unlock
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: Offer Creation / Editing / Ending Form */
          <form onSubmit={handleDone} className="space-y-4">
            {/* If an offer is already active, provide the option to End Offer */}
            {isOfferActive && (
              <div className="p-4 rounded-2xl bg-[#1E140F] border border-[#D49B6A]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D49B6A] block">
                    Currently Active
                  </span>
                  <p className="text-xs font-medium text-[#FAF6F0] mt-0.5 line-clamp-1">
                    "{offer?.description}"
                  </p>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {offer?.discountPct}% Discount Applied
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleEndOffer}
                  className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>End Offer</span>
                </button>
              </div>
            )}

            {/* Description Field */}
            <div>
              <label className="block text-xs font-semibold text-[#FAF6F0] mb-1.5">
                Offer Description
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setFormError('');
                }}
                placeholder="e.g. Weekend Special: Flat 20% off all manual pour-overs & fresh sourdough pizzas!"
                className="w-full bg-[#120D0A] border border-[#D49B6A]/35 rounded-2xl p-3.5 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A] transition-all"
              />
            </div>

            {/* Discount Price Percentage Field */}
            <div>
              <label className="block text-xs font-semibold text-[#FAF6F0] mb-1.5">
                Discount Price Percentage (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={discountPct}
                  onChange={(e) => {
                    setDiscountPct(e.target.value);
                    setFormError('');
                  }}
                  placeholder="20"
                  className="w-full bg-[#120D0A] border border-[#D49B6A]/35 rounded-2xl px-4 py-3 text-sm font-mono text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A] transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#D49B6A] font-bold text-sm pointer-events-none">
                  <Percent className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[11px] text-[#DDD3C4]/60 mt-1 block">
                Enter a number between 1 and 100.
              </span>
            </div>

            {formError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 text-xs animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Done or Cancel Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#D49B6A]/20">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-[#D49B6A]/35 text-xs font-semibold text-[#DDD3C4] hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D49B6A] to-[#B86F43] hover:from-[#E2AA79] hover:to-[#C67B4E] text-[#120D0A] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Done</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

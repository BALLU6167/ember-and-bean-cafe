import React from 'react';
import { Sparkles, Flame, Tag, ArrowRight } from 'lucide-react';
import { useOffer } from '../../context/OfferContext';

interface TopOfferBannerProps {
  onClaim?: () => void;
}

export const TopOfferBanner: React.FC<TopOfferBannerProps> = ({ onClaim }) => {
  const { offer, isOfferActive } = useOffer();

  if (!isOfferActive || !offer) {
    return null;
  }

  return (
    <div
      id="top-offer-banner"
      className="relative z-50 w-full max-w-full overflow-hidden bg-gradient-to-r from-[#1E110A] via-[#331C10] to-[#1E110A] border-b-2 border-[#D49B6A]/50 text-[#FAF6F0] py-2.5 px-3 sm:px-6 shadow-2xl animate-in slide-in-from-top duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        {/* Left: Badge + Description */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 flex-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D49B6A] to-[#B86F43] text-[#120D0A] font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-md">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Special Offer</span>
          </span>

          <p className="text-xs sm:text-sm font-medium text-[#FAF6F0] leading-snug drop-shadow-sm">
            {offer.description}
          </p>
        </div>

        {/* Right: Discount Badge & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#120D0A] border border-[#D49B6A]/60 text-[#D49B6A] font-mono font-bold text-xs sm:text-sm shadow-inner">
            <Tag className="w-3.5 h-3.5" />
            <span>{offer.discountPct}% OFF</span>
          </div>

          {onClaim && (
            <button
              onClick={onClaim}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#D49B6A]/20 hover:bg-[#D49B6A] text-[#D49B6A] hover:text-[#120D0A] border border-[#D49B6A]/40 font-semibold text-xs transition-all cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

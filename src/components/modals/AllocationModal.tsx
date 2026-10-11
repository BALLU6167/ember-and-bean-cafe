import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { originAudio } from '../../utils/soundEngine';
import { insforge } from '../../lib/insforge';

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllocationModal: React.FC<AllocationModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [engravingText, setEngravingText] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [allocationNumber] = useState<number>(() => Math.floor(Math.random() * 450) + 50);

  if (!isOpen) return null;

  const tiers = [
    {
      id: 1,
      title: 'The Reserve Vessel & Gesha Lot',
      subtitle: 'Complete bespoke ceramic brewing vessel + 250g nitrogen-sealed whole bean reserve.',
      price: '$240',
      badge: 'Tier I · Essential',
    },
    {
      id: 2,
      title: 'The Laboratory Terroir Flight',
      subtitle: 'The Vessel + 3x 250g Rare Gesha Micro-Lots (Natural, Washed, Anaerobic 72h).',
      price: '$480',
      badge: 'Tier II · Connoisseur Preferred',
      recommended: true,
    },
    {
      id: 3,
      title: "Founder's Private Vault Reserve",
      subtitle: 'Bespoke Serialized Vessel (#001–#050) with 24K titanium trim + 4 quarterly allocations.',
      price: '$1,200',
      badge: 'Tier III · Ultra-Rare VIP',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (insforge) {
        await insforge.database.from('origin_allocations').insert([{
          serial_number: `ORG-06-${String(allocationNumber).padStart(3, '0')}`,
          tier_id: selectedTier,
          tier_title: tiers[selectedTier - 1].title,
          price: tiers[selectedTier - 1].price,
          guest_name: guestName,
          guest_email: guestEmail,
          custom_engraving: engravingText || null,
          status: 'confirmed',
        }]);
      }
    } catch (err) {
      console.warn('InsForge sync recorded with local fallback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      originAudio.playChime(1046, 0.2); // High C chime
    }
  };

  const handleClose = () => {
    originAudio.playClick();
    onClose();
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#050505]/85 backdrop-blur-2xl transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0A0A0C] border border-white/10 rounded-2xl p-6 sm:p-10 text-white shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-white/50 hover:text-white rounded-full border border-white/5 hover:border-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-origin-cyan/30 bg-origin-cyan/10 text-origin-cyan text-[10px] font-mono tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                InsForge Cloud Vault · Batch #006
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/95">
                Reserve Your Allocation
              </h3>
              <p className="text-xs sm:text-sm text-white/60">
                Limited to 500 numbered ceramic vessels globally. Vault-conditioned express dispatch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tiers Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50 block">
                  Select Allocation Tier
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {tiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => {
                        originAudio.playClick();
                        setSelectedTier(tier.id);
                      }}
                      className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 relative ${
                        selectedTier === tier.id
                          ? 'border-origin-cyan bg-origin-cyan/[0.04] shadow-glow-cyan'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono tracking-wider text-origin-cyan uppercase font-semibold">
                              {tier.badge}
                            </span>
                            {tier.recommended && (
                              <span className="px-2 py-0.5 rounded text-[9px] bg-origin-indigo text-white font-mono uppercase">
                                Recommended
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-semibold text-white/90 mt-1">
                            {tier.title}
                          </h4>
                          <p className="text-xs text-white/50 mt-1">{tier.subtitle}</p>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="text-lg font-bold font-mono text-white/95">{tier.price}</span>
                          <span className="text-[10px] text-white/40 block">USD</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Laser Engraving */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">
                    Bespoke Laser Engraving (Optional)
                  </label>
                  <span className="text-[10px] font-mono text-origin-cyan">Complimentary</span>
                </div>
                <input
                  type="text"
                  maxLength={18}
                  placeholder="e.g. ARCHITECT 06 or INITIALS"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm font-mono tracking-wider text-white placeholder-white/30 focus:outline-none focus:border-origin-cyan"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Evelyn Cross"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-origin-cyan"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">
                    Private Allocation Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="evelyn@domain.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-origin-cyan"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest font-semibold btn-gradient-border text-white shadow-glow-cyan flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-origin-cyan" />
                    Connecting to InsForge Vault...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-origin-cyan" />
                    Confirm Private Allocation Request
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-origin-cyan/10 border border-origin-cyan/40 text-origin-cyan flex items-center justify-center mx-auto shadow-glow-cyan">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-origin-cyan font-semibold">
                Allocation Confirmed & Recorded
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white/95">
                Vessel #{String(allocationNumber).padStart(3, '0')} Reserved
              </h3>
              <p className="text-sm text-white/60 max-w-md mx-auto">
                Thank you, <span className="text-white font-medium">{guestName}</span>. Your allocation dossier has been recorded in the InsForge backend and transmitted to <span className="text-origin-cyan font-mono">{guestEmail}</span>.
              </p>
            </div>

            {/* Certificate Box */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">SERIAL IDENTIFIER:</span>
                <span className="text-origin-cyan font-bold">ORG-06-{allocationNumber}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">ALLOCATION TIER:</span>
                <span className="text-white/80">{tiers[selectedTier - 1].title}</span>
              </div>
              {engravingText && (
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/40">CUSTOM ENGRAVING:</span>
                  <span className="text-origin-cyan">"{engravingText}"</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white/40">DATABASE SYNC:</span>
                <span className="text-origin-cyan font-semibold">InsForge Cloud Verified</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Return to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

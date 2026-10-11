import React, { useState } from 'react';
import { 
  Award, 
  Check, 
  Gift, 
  X, 
  Sparkles, 
  Coffee, 
  Crown, 
  Star, 
  CreditCard,
  Cake
} from 'lucide-react';

interface LoyaltyProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimReward: (rewardName: string) => void;
}

export const LoyaltyProgramModal: React.FC<LoyaltyProgramModalProps> = ({
  isOpen,
  onClose,
  onClaimReward,
}) => {
  const [stamps, setStamps] = useState<number>(7);
  const [points, setPoints] = useState<number>(1420);
  const [claimedList, setClaimedList] = useState<string[]>([]);
  const [birthdayClaimed, setBirthdayClaimed] = useState<boolean>(false);

  if (!isOpen) return null;

  const rewards = [
    { id: 'rew-bun', name: 'Cardamom Morning Bun Voucher', pointsCost: 350, desc: 'Complimentary fresh bake with your next coffee' },
    { id: 'rew-v60', name: 'Free Single-Origin V60 Pour-Over', pointsCost: 500, desc: 'Any origin from our weekly microlot roster' },
    { id: 'rew-beans', name: '₹200 Off 250g Roasted Bean Bag', pointsCost: 800, desc: 'Valid for in-cafe pick-up or beans delivery' },
    { id: 'rew-workshop', name: 'VIP Sunday Sensory Cupping Seat', pointsCost: 1200, desc: 'Masterclass with Head Roaster Vikram Roy' },
  ];

  const handleRedeem = (rew: typeof rewards[0]) => {
    if (points >= rew.pointsCost && !claimedList.includes(rew.id)) {
      setPoints(points - rew.pointsCost);
      setClaimedList([...claimedList, rew.id]);
      onClaimReward(rew.name);
    }
  };

  const handleClaimBirthday = () => {
    if (!birthdayClaimed) {
      setBirthdayClaimed(true);
      onClaimReward('Birthday Cardamom Bun & Flat White Feast');
    }
  };

  return (
    <div className="fixed inset-0 z-[99975] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-[#1A110D] border-2 border-[#C68B59]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0] my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close Loyalty Dashboard"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Crown className="w-5 h-5 text-[#DFB17B]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold">
            The Connoisseur Society
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EDE0]">
          Digital Loyalty & Rewards Lounge
        </h2>
        <p className="text-xs text-[#F5EDE0]/70 mb-6">
          Collect stamps on every visit, earn 10 points per ₹100 spent, and unlock VIP privileges.
        </p>

        {/* Mock User Passport Card */}
        <div className="bg-gradient-to-br from-[#2E1F18] via-[#241712] to-[#170E0A] border border-[#DFB17B]/40 rounded-3xl p-6 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#DFB17B]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C68B59]/25">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#DFB17B] font-mono">Member Passport #EB-8402</span>
              <h3 className="font-serif text-xl font-bold text-[#F5EDE0] mt-0.5">Ananya Deshmukh</h3>
              <span className="text-xs text-[#F5EDE0]/60">Jubilee Hills Regular since 2024</span>
            </div>
            <div className="text-right sm:text-right">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#DFB17B] to-[#C68B59] text-[#1E1410] inline-flex items-center gap-1 shadow-md">
                <Crown className="w-3.5 h-3.5" /> Silver Tier
              </span>
              <span className="block font-mono text-lg font-bold text-[#DFB17B] mt-1">{points} Ember Points</span>
            </div>
          </div>

          {/* Visual 10-Stamp Card */}
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-[#F5EDE0] flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#DFB17B]" /> Stamp Card (10 Cups to Free Reserve Geisha)
              </span>
              <span className="text-xs font-mono font-bold text-[#DFB17B]">{stamps} / 10 Stamped</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[...Array(10)].map((_, i) => {
                const isStamped = i < stamps;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all ${
                      isStamped
                        ? 'bg-[#C68B59]/30 border-[#DFB17B] text-[#DFB17B] shadow-[0_0_10px_rgba(223,177,123,0.3)]'
                        : 'bg-[#140C08]/60 border-[#C68B59]/20 text-[#F5EDE0]/20'
                    }`}
                  >
                    {isStamped ? (
                      <Check className="w-5 h-5 text-[#DFB17B] stroke-[3]" />
                    ) : (
                      <span className="text-[10px] font-mono">{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Birthday Treat Claim Section */}
        <div className="bg-[#24150E] border border-[#C68B59]/40 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C85A32]/20 border border-[#C85A32]/40 flex items-center justify-center text-[#DFB17B]">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#F5EDE0]">Annual Birthday Treat</h4>
              <p className="text-xs text-[#F5EDE0]/70">Silver & Gold members enjoy a complimentary morning bun & signature drink.</p>
            </div>
          </div>
          <button
            onClick={handleClaimBirthday}
            disabled={birthdayClaimed}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
              birthdayClaimed
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : 'bg-[#DFB17B] text-[#1E1410] hover:bg-white'
            }`}
          >
            {birthdayClaimed ? '✓ Claimed to Bag' : 'Claim Birthday Treat'}
          </button>
        </div>

        {/* Rewards Redemption Catalog */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#DFB17B] block">
            Redeem Points Catalog
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rewards.map((rew) => {
              const isClaimed = claimedList.includes(rew.id);
              const canAfford = points >= rew.pointsCost;

              return (
                <div
                  key={rew.id}
                  className="bg-[#140C08] border border-[#C68B59]/30 rounded-2xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-serif font-bold text-sm text-[#F5EDE0]">{rew.name}</span>
                      <span className="font-mono text-xs font-bold text-[#DFB17B]">{rew.pointsCost} pts</span>
                    </div>
                    <p className="text-[11px] text-[#F5EDE0]/60 line-clamp-2">{rew.desc}</p>
                  </div>

                  <button
                    onClick={() => handleRedeem(rew)}
                    disabled={isClaimed || !canAfford}
                    className={`mt-4 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isClaimed
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : canAfford
                        ? 'bg-[#C68B59] hover:bg-[#DFB17B] text-[#1E1410]'
                        : 'bg-[#1E1410] text-[#F5EDE0]/30 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    {isClaimed ? '✓ Redeemed' : canAfford ? 'Redeem Voucher' : 'Need More Points'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MenuItem } from '../../types/cafe';
import { X, Heart, Plus, Sparkles, Check } from 'lucide-react';

interface DrinkPairingModalProps {
  item: MenuItem | null;
  pairedItems: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: MenuItem) => void;
  onAddBothToCart?: (item1: MenuItem, item2: MenuItem) => void;
}

export const DrinkPairingModal: React.FC<DrinkPairingModalProps> = ({
  item,
  pairedItems,
  isOpen,
  onClose,
  onAddToCart,
  onAddBothToCart,
}) => {
  const [requestedPairId, setRequestedPairId] = React.useState<string | null>(null);

  if (!isOpen || !item) return null;

  const handleRequestCombo = (pair: MenuItem) => {
    setRequestedPairId(pair.id);
    if (onAddBothToCart) {
      onAddBothToCart(item, pair);
    }
    setTimeout(() => {
      setRequestedPairId(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[99960] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full bg-[#1A110D] border-2 border-[#C68B59]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0]">
        <button
          onClick={onClose}
          aria-label="Close Pairing Modal"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#DFB17B]" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C68B59] font-bold">
            Sommelier Pairing Engine
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#F5EDE0] mb-1">
          Pairs Perfectly With {item.name}
        </h3>
        <p className="text-xs text-[#F5EDE0]/70 mb-6">
          Our culinary team curates these complementary flavor profiles to elevate acidity, aroma, and mouthfeel.
        </p>

        {/* Selected Item Card */}
        <div className="flex items-center gap-4 bg-[#120B08] p-3.5 rounded-2xl border border-[#C68B59]/30 mb-6">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <span className="text-xs font-semibold text-[#F5EDE0] block">{item.name}</span>
            <span className="text-[11px] text-[#DFB17B] font-mono">₹{item.price}</span>
            <span className="text-[10px] text-[#F5EDE0]/50 block mt-0.5 line-clamp-1">
              Flavor profile: {item.flavorProfile.toUpperCase()} notes
            </span>
          </div>
          <span className="text-xs text-[#DFB17B] font-serif italic">Your Choice</span>
        </div>

        {/* Suggested Pairings List */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#DFB17B] block">
            Recommended Culinary Matches
          </span>

          {pairedItems.map((pair) => (
            <div
              key={pair.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#24150E] p-4 rounded-2xl border border-[#C68B59]/40 hover:border-[#DFB17B] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={pair.image}
                  alt={pair.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#F5EDE0]">{pair.name}</h4>
                  <p className="text-[11px] text-[#F5EDE0]/70 line-clamp-1 max-w-xs">{pair.description}</p>
                  <span className="text-xs font-mono font-bold text-[#DFB17B]">₹{pair.price}</span>
                </div>
              </div>

              <div className="text-right sm:text-right flex flex-col items-end gap-1.5">
                <span className="text-xs text-[#DFB17B] font-semibold block flex items-center gap-1 justify-end">
                  <Sparkles className="w-3.5 h-3.5" /> Culinary Match
                </span>
                <span className="text-[11px] text-[#F5EDE0]/60 font-mono">Combo: ₹{item.price + pair.price}</span>
                <button
                  type="button"
                  onClick={() => handleRequestCombo(pair)}
                  className={`mt-1 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    requestedPairId === pair.id
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-[#C68B59] hover:bg-[#DFB17B] text-[#1E1410]'
                  }`}
                >
                  {requestedPairId === pair.id ? '✓ Requested' : 'Order Combo'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

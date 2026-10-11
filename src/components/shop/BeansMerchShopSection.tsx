import React, { useState } from 'react';
import { SHOP_ITEMS } from '../../data/cafeData';
import { ShopItem, CartItem } from '../../types/cafe';
import { ShoppingBag, Star, RefreshCw, Check, Sparkles, Package } from 'lucide-react';

interface BeansMerchShopSectionProps {
  onAddShopItemToCart?: (item: ShopItem, grind?: string, size?: string, sub?: string) => void;
  onOpenBrewGuides: () => void;
}

export const BeansMerchShopSection: React.FC<BeansMerchShopSectionProps> = ({
  onAddShopItemToCart,
  onOpenBrewGuides,
}) => {
  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, string>>({
    'araku-reserve-beans': 'Whole Bean (Recommended)',
    'chikmagalur-honey-beans': 'Whole Bean',
    'coffee-of-month-club': 'Whole Bean',
  });

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'araku-reserve-beans': '250g Bag',
    'chikmagalur-honey-beans': '250g Bag',
    'coffee-of-month-club': 'Monthly Subscription',
  });

  const [selectedFrequencies, setSelectedFrequencies] = useState<Record<string, string>>({
    'araku-reserve-beans': 'One-time purchase',
    'chikmagalur-honey-beans': 'One-time purchase',
    'coffee-of-month-club': 'Monthly Subscription',
  });

  const handleGrindChange = (itemId: string, val: string) => {
    setSelectedGrinds((prev) => ({ ...prev, [itemId]: val }));
  };

  const handleSizeChange = (itemId: string, val: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: val }));
  };

  const handleFreqChange = (itemId: string, val: string) => {
    setSelectedFrequencies((prev) => ({ ...prev, [itemId]: val }));
  };

  const handleAddToCart = (item: ShopItem) => {
    const grind = selectedGrinds[item.id];
    const size = selectedSizes[item.id];
    const freq = selectedFrequencies[item.id];
    onAddShopItemToCart?.(item, grind, size, freq);
  };

  return (
    <section id="shop" className="py-24 bg-[#1E1410] text-[#F5EDE0] border-t border-[#C68B59]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold block mb-2">
              Roastery Pantry & Goods
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] tracking-tight">
              Single-Origin Beans & Lifestyle Merch
            </h2>
            <p className="mt-3 text-sm text-[#F5EDE0]/70 font-light">
              Roasted weekly on Tuesdays and Fridays in Jubilee Hills. Select your tailored grind size or join our curated recurring subscription.
            </p>
          </div>

          <button
            onClick={onOpenBrewGuides}
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-[#140C08] border border-[#C68B59]/40 hover:border-[#DFB17B] text-xs uppercase tracking-wider text-[#DFB17B] font-semibold flex items-center gap-2 hover:bg-[#2C1E18] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> View Extraction Guides
          </button>
        </div>

        {/* Shop Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOP_ITEMS.map((item) => {
            const currentGrind = selectedGrinds[item.id] || (item.grindOptions && item.grindOptions[0]);
            const currentSize = selectedSizes[item.id] || (item.bagSizes && item.bagSizes[0]);
            const currentFreq = selectedFrequencies[item.id] || (item.subscriptionFrequencies && item.subscriptionFrequencies[0]);

            return (
              <div
                key={item.id}
                className="bg-gradient-to-b from-[#241712] to-[#1A110D] border border-[#C68B59]/30 hover:border-[#DFB17B] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Photo & Badges */}
                <div className="relative h-64 w-full bg-[#120B08] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A110D] via-transparent to-transparent opacity-80" />

                  {item.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C85A32] text-white shadow-md">
                      {item.badge}
                    </span>
                  )}

                  <div className="absolute bottom-4 right-4 bg-[#1E1410]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#DFB17B]/40">
                    <span className="font-serif text-xl font-bold text-[#DFB17B]">₹{item.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold text-[#F5EDE0]">{item.rating}</span>
                      <span className="text-[#F5EDE0]/50">• In Stock</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#F5EDE0] leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#F5EDE0]/70 font-light mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Roast notes pills if bean */}
                    {item.notes && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.notes.map((n, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#120B08] text-[#DFB17B] border border-[#C68B59]/25 px-2 py-0.5 rounded-md"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selectors for Grind & Subscriptions */}
                  <div className="space-y-3 pt-3 border-t border-[#C68B59]/20 text-xs">
                    {/* Grind size selector */}
                    {item.grindOptions && (
                      <div>
                        <label className="text-[11px] text-[#F5EDE0]/60 block mb-1">Grind Specification:</label>
                        <select
                          value={currentGrind}
                          onChange={(e) => handleGrindChange(item.id, e.target.value)}
                          className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                        >
                          {item.grindOptions.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Bag size selector */}
                    {item.bagSizes && (
                      <div>
                        <label className="text-[11px] text-[#F5EDE0]/60 block mb-1">Package Size:</label>
                        <select
                          value={currentSize}
                          onChange={(e) => handleSizeChange(item.id, e.target.value)}
                          className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                        >
                          {item.bagSizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Subscription frequency option */}
                    {item.subscriptionFrequencies && (
                      <div>
                        <label className="text-[11px] text-[#DFB17B] font-medium flex items-center gap-1 mb-1">
                          <RefreshCw className="w-3 h-3" /> Delivery Frequency:
                        </label>
                        <select
                          value={currentFreq}
                          onChange={(e) => handleFreqChange(item.id, e.target.value)}
                          className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#DFB17B] focus:outline-none focus:border-[#DFB17B]"
                        >
                          {item.subscriptionFrequencies.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* In-store availability badge */}
                  <div className="pt-2">
                    <div className="w-full py-3 bg-[#2C1E18] text-[#DFB17B] border border-[#C68B59]/40 font-semibold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                      <Package className="w-4 h-4 text-[#DFB17B]" /> Available in Roastery Pantry
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

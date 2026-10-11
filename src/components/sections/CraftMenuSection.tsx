import React, { useState } from 'react';
import { Search, Plus, Star, Sparkles, Filter, Info, X, Crown } from 'lucide-react';
import { MENU_ITEMS } from '../../data/coffeeData';
import { CategoryType, MenuItem } from '../../types/spatial';

interface CraftMenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

export const CraftMenuSection: React.FC<CraftMenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: 'All Offerings' },
    { key: 'signature', label: 'Private Reserve' },
    { key: 'espresso', label: 'Espresso Vault' },
    { key: 'pourover', label: 'V60 Single Origin' },
    { key: 'coldbrew', label: 'Nitro Drip' },
    { key: 'pastry', label: 'Artisan Confection' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen relative py-20 px-4 sm:px-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#dfb17b]/10 border border-[#dfb17b]/30 text-xs font-mono text-[#dfb17b] uppercase tracking-[0.2em]">
            <Crown className="w-3.5 h-3.5" />
            <span>Curated Artisan Menu</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Crafted Offerings
          </h2>
          <p className="text-[#a39790] text-base max-w-xl mx-auto font-sans">
            Select from our award-winning 98+ SCA microlots, hand-poured single origins, and freshly baked artisanal pastries.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0d0b09]/90 p-3 rounded-2xl border border-[#dfb17b]/30 shadow-spatial">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] text-[#060504] font-bold shadow-gold-glow'
                    : 'text-[#a39790] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a39790]" />
            <input
              type="text"
              placeholder="Search coffee or origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-[#a39790] focus:outline-none focus:border-[#dfb17b] transition-colors"
            />
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 spatial-glass rounded-3xl space-y-4 border border-[#dfb17b]/20">
            <p className="text-[#a39790] font-mono text-xs uppercase tracking-widest">No spatial offerings match your search criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#dfb17b]/20 text-[#dfb17b] border border-[#dfb17b]/40 text-xs font-mono uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative spatial-glass rounded-3xl p-6 border border-[#dfb17b]/25 hover:border-[#dfb17b]/60 transition-all duration-500 hover:translate-y-[-6px] shadow-spatial flex flex-col justify-between"
              >
                {/* Item Image with Depth Gradient */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060504] via-transparent to-transparent opacity-85" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-lg bg-[#060504]/90 backdrop-blur-md border border-[#dfb17b]/40 font-mono text-[10px] text-[#dfb17b] uppercase tracking-wider">
                      {item.origin}
                    </span>
                  </div>

                  {item.isPopular && (
                    <div className="absolute top-3 right-3 flex items-center space-x-1 px-3 py-1 rounded-lg bg-gradient-to-r from-[#f5cb98] to-[#dfb17b] text-[#060504] font-mono text-[10px] font-bold shadow-gold-glow">
                      <Sparkles className="w-3 h-3" />
                      <span>RESERVE</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-[#f5cb98]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-mono text-xs text-white font-bold">{item.rating}</span>
                    <span className="font-mono text-[10px] text-[#a39790]">({item.cuppingScore} SCA)</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#dfb17b] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono text-lg font-bold text-[#dfb17b]">${item.price.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-[#a39790] line-clamp-2 leading-relaxed">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-[#0d0b09] border border-[#dfb17b]/20 font-mono text-[10px] text-[#a39790]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-5 mt-4 border-t border-[#dfb17b]/15 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedDetailItem(item)}
                    className="flex items-center space-x-1.5 text-xs font-mono text-[#a39790] hover:text-[#dfb17b] transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-[#dfb17b]" />
                    <span>Flavor Radar</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(item)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] hover:brightness-110 text-[#060504] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-gold-glow active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal with Flavor Radar */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="spatial-glass-bright rounded-3xl max-w-lg w-full p-7 space-y-6 border border-[#dfb17b]/50 shadow-spatial-lg relative">
            <button
              onClick={() => setSelectedDetailItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <img
                src={selectedDetailItem.image}
                alt={selectedDetailItem.name}
                className="w-20 h-20 rounded-2xl object-cover border border-[#dfb17b]/40"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">{selectedDetailItem.name}</h3>
                <p className="font-mono text-xs text-[#dfb17b]">{selectedDetailItem.origin}</p>
                <p className="font-mono text-sm text-white font-bold mt-1">${selectedDetailItem.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-4 bg-[#060504]/80 p-5 rounded-2xl border border-[#dfb17b]/20">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#dfb17b]">SCA Flavor Spectrum</h4>
              <div className="space-y-3">
                {[
                  { name: 'Acidity', val: selectedDetailItem.flavorProfile.acidity },
                  { name: 'Body', val: selectedDetailItem.flavorProfile.body },
                  { name: 'Sweetness', val: selectedDetailItem.flavorProfile.sweetness },
                  { name: 'Aroma', val: selectedDetailItem.flavorProfile.aroma }
                ].map((stat) => (
                  <div key={stat.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#a39790]">{stat.name}</span>
                      <span className="text-white font-bold">{stat.val} / 10</span>
                    </div>
                    <div className="h-2 w-full bg-[#18120e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#dfb17b] to-[#f5cb98] rounded-full"
                        style={{ width: `${stat.val * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(selectedDetailItem);
                setSelectedDetailItem(null);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] text-[#060504] font-bold text-sm tracking-wider uppercase shadow-gold-glow hover:brightness-110"
            >
              Add {selectedDetailItem.name} to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

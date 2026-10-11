import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../../data/cafeData';
import { MenuItem, MenuCategory, FlavorProfile } from '../../types/cafe';
import { CustomDrinkBuilderModal } from './CustomDrinkBuilderModal';
import { DrinkPairingModal } from './DrinkPairingModal';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Sparkles, 
  Heart, 
  Flame, 
  Check, 
  Leaf, 
  Wheat, 
  ShieldAlert,
  Zap,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface InteractiveMenuSectionProps {
  onAddToCart?: (item: MenuItem) => void;
  onAddBothToCart?: (item1: MenuItem, item2: MenuItem) => void;
  onAddCustomToCart?: (config: any, price: number, name: string) => void;
}

export const InteractiveMenuSection: React.FC<InteractiveMenuSectionProps> = ({
  onAddToCart,
  onAddBothToCart,
  onAddCustomToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<{ vegan: boolean; glutenFree: boolean; nutFree: boolean }>({
    vegan: false,
    glutenFree: false,
    nutFree: false,
  });
  const [selectedCaffeine, setSelectedCaffeine] = useState<string>('all');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Modals state
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [pairingModalItem, setPairingModalItem] = useState<MenuItem | null>(null);

  const { t } = useLanguage();

  const categories: { id: MenuCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: t.catAll, icon: '✨' },
    { id: 'burgers', label: t.catBurgers, icon: '🍔' },
    { id: 'pizzas', label: t.catPizzas, icon: '🍕' },
    { id: 'fries', label: t.catFries, icon: '🍟' },
    { id: 'cold-drinks', label: t.catColdDrinks, icon: '🥤' },
    { id: 'coffee', label: t.catCoffee, icon: '☕' },
    { id: 'tea', label: t.catTea, icon: '🍵' },
    { id: 'breakfast', label: t.catBreakfast, icon: '🍳' },
    { id: 'brunch', label: t.catBrunch, icon: '🥞' },
    { id: 'pastries', label: t.catPastries, icon: '🥐' },
    { id: 'desserts', label: t.catDesserts, icon: '🍰' },
  ];

  const flavorProfiles: FlavorProfile[] = ['savory', 'cheesy', 'spiced', 'sweet', 'creamy', 'fruity', 'bitter', 'floral', 'nutty'];

  // Filter Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      // Search check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesOrigin = item.origin?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesOrigin) return false;
      }

      // Dietary checks
      if (selectedDiet.vegan && !item.isVegan) return false;
      if (selectedDiet.glutenFree && !item.isGlutenFree) return false;
      if (selectedDiet.nutFree && !item.isNutFree) return false;

      // Caffeine
      if (selectedCaffeine !== 'all' && item.caffeineLevel !== selectedCaffeine) return false;

      // Flavor
      if (selectedFlavor !== 'all' && item.flavorProfile !== selectedFlavor) return false;

      // Price
      if (item.price > maxPrice) return false;

      return true;
    });
  }, [activeCategory, searchQuery, selectedDiet, selectedCaffeine, selectedFlavor, maxPrice]);

  const activeFiltersCount = 
    (selectedDiet.vegan ? 1 : 0) +
    (selectedDiet.glutenFree ? 1 : 0) +
    (selectedDiet.nutFree ? 1 : 0) +
    (selectedCaffeine !== 'all' ? 1 : 0) +
    (selectedFlavor !== 'all' ? 1 : 0) +
    (maxPrice < 600 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedDiet({ vegan: false, glutenFree: false, nutFree: false });
    setSelectedCaffeine('all');
    setSelectedFlavor('all');
    setMaxPrice(600);
    setSearchQuery('');
  };

  const getPairedItems = (item: MenuItem): MenuItem[] => {
    return MENU_ITEMS.filter((m) => item.pairedWithIds.includes(m.id));
  };

  return (
    <section id="menu" className="py-24 bg-transparent text-[#F5EDE0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold block mb-2">
            Seasonal & Artisanal
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] tracking-tight">
            Our Craft Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5EDE0]/70 font-light">
            Every cup is brewed to order from micro-harvested Arabica, and every pastry is laminated by hand with cultured French butter.
          </p>
        </div>

        {/* Custom Cup Builder Callout Banner */}
        <div className="mb-12 bg-gradient-to-r from-[#2C1E18] via-[#3D281F] to-[#2C1E18] border border-[#C68B59]/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#C68B59]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DFB17B]/10 border border-[#DFB17B]/30 flex items-center justify-center text-[#DFB17B]">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#DFB17B] font-mono">
                Interactive Feature K
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EDE0]">
                Design Your Signature Custom Drink
              </h3>
              <p className="text-xs text-[#F5EDE0]/70 mt-1">
                Choose cup size, plant milks, espresso extractions, organic syrups & toppings with live illustrated preview.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomBuilderOpen(true)}
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold rounded-2xl text-xs uppercase tracking-wider transition-all hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg"
          >
            Launch Cup Builder →
          </button>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Smart Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C68B59]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menuSearchPlaceholder}
              className="w-full bg-[#140C08] border border-[#C68B59]/30 rounded-2xl pl-11 pr-4 py-3 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Drawer Toggle & Clear Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider border transition-colors ${
                activeFiltersCount > 0
                  ? 'bg-[#C68B59] text-[#1E1410] border-[#DFB17B]'
                  : 'bg-[#140C08] text-[#F5EDE0] border-[#C68B59]/30 hover:border-[#DFB17B]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Smart Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-[#1E1410] text-[#DFB17B] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#DFB17B] underline underline-offset-4 hover:text-white"
              >
                Reset All
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Smart Filters Drawer */}
        {isFilterDrawerOpen && (
          <div className="bg-[#140C08] border border-[#C68B59]/40 rounded-3xl p-6 mb-8 text-xs space-y-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-[#C68B59]/20 pb-3">
              <span className="font-serif font-bold text-base text-[#DFB17B]">Filter Preferences</span>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Dietary */}
              <div>
                <span className="font-semibold text-[#F5EDE0] block mb-2">Dietary Preferences</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-[#F5EDE0]/80 hover:text-white">
                    <input
                      type="checkbox"
                      checked={selectedDiet.vegan}
                      onChange={(e) => setSelectedDiet({ ...selectedDiet, vegan: e.target.checked })}
                      className="rounded accent-[#C68B59]"
                    />
                    <span>100% Plant-Based (Vegan)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#F5EDE0]/80 hover:text-white">
                    <input
                      type="checkbox"
                      checked={selectedDiet.glutenFree}
                      onChange={(e) => setSelectedDiet({ ...selectedDiet, glutenFree: e.target.checked })}
                      className="rounded accent-[#C68B59]"
                    />
                    <span>Gluten-Friendly</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#F5EDE0]/80 hover:text-white">
                    <input
                      type="checkbox"
                      checked={selectedDiet.nutFree}
                      onChange={(e) => setSelectedDiet({ ...selectedDiet, nutFree: e.target.checked })}
                      className="rounded accent-[#C68B59]"
                    />
                    <span>Nut-Free Recipe</span>
                  </label>
                </div>
              </div>

              {/* Caffeine Level */}
              <div>
                <span className="font-semibold text-[#F5EDE0] block mb-2">Caffeine Profile</span>
                <select
                  value={selectedCaffeine}
                  onChange={(e) => setSelectedCaffeine(e.target.value)}
                  className="w-full bg-[#1E1410] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                >
                  <option value="all">Any Caffeine Level</option>
                  <option value="None">Zero Caffeine (Decaf / Herbal)</option>
                  <option value="Low">Low (White Tea / Cascara)</option>
                  <option value="Medium">Medium (Matcha / Flat White)</option>
                  <option value="High">High (Double Ristretto / Nitro)</option>
                </select>
              </div>

              {/* Flavor Profile */}
              <div>
                <span className="font-semibold text-[#F5EDE0] block mb-2">Flavor Profile</span>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full bg-[#1E1410] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                >
                  <option value="all">Any Tasting Notes</option>
                  {flavorProfiles.map((f) => (
                    <option key={f} value={f}>
                      {f.charAt(0).toUpperCase() + f.slice(1)} Notes
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-[#F5EDE0]">Max Price</span>
                  <span className="font-mono font-bold text-[#DFB17B]">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="600"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C68B59]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Categories Horizontal Scroll Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#DFB17B] via-[#C68B59] to-[#C85A32] text-[#1E1410] font-bold shadow-lg scale-105'
                  : 'bg-[#140C08] text-[#F5EDE0]/80 hover:text-white border border-[#C68B59]/30 hover:border-[#DFB17B]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#140C08]/60 border border-[#C68B59]/20 rounded-3xl">
            <p className="font-serif text-xl text-[#F5EDE0] mb-2">No menu offerings found</p>
            <p className="text-xs text-[#F5EDE0]/60 mb-4">Try clearing some of your filters or searching for another term.</p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-[#C68B59] text-[#1E1410] font-bold rounded-xl text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-gradient-to-b from-[#241712] to-[#1A110D] border border-[#C68B59]/30 hover:border-[#DFB17B] rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Photo & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-[#120B08]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A110D] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C85A32] text-white shadow-md">
                        {item.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#140C08]/80 text-[#DFB17B] border border-[#C68B59]/40 backdrop-blur-sm">
                      {item.flavorProfile}
                    </span>
                  </div>

                  {/* Dietary Icons on top right */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#140C08]/80 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                    {item.isVegan && <span title="Vegan"><Leaf className="w-3.5 h-3.5 text-emerald-400" /></span>}
                    {item.isGlutenFree && <span title="Gluten-Free"><Wheat className="w-3.5 h-3.5 text-amber-300" /></span>}
                    {item.isNutFree && <span title="Nut-Free"><ShieldAlert className="w-3.5 h-3.5 text-sky-400" /></span>}
                  </div>

                  {/* Price Tag in Bottom Right of photo */}
                  <div className="absolute bottom-3 right-3 bg-[#1E1410]/90 backdrop-blur-md px-3.5 py-1 rounded-xl border border-[#DFB17B]/40">
                    <span className="font-serif text-lg font-bold text-[#DFB17B]">₹{item.price}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Origin / Category info */}
                    <span className="text-[10px] uppercase tracking-widest text-[#C68B59] font-mono block mb-1">
                      {item.origin || item.category.toUpperCase()}
                    </span>

                    <h3 className="font-serif text-xl font-bold text-[#F5EDE0] group-hover:text-[#DFB17B] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#F5EDE0]/70 font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Metadata specs (Calories, Caffeine, Rating) */}
                    <div className="mt-4 pt-3 border-t border-[#C68B59]/20 flex items-center justify-between text-[11px] text-[#F5EDE0]/60">
                      <div className="flex items-center gap-1 text-amber-300">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-semibold text-[#F5EDE0]">{item.rating}</span>
                        <span>({item.reviewsCount})</span>
                      </div>
                      <span>{item.calories} kcal</span>
                      <span>Caffeine: {item.caffeineLevel}</span>
                    </div>
                  </div>

                  {/* Bottom Action Buttons: Pairing Engine + Add To Order */}
                  <div className="mt-5 pt-3 border-t border-[#C68B59]/20 flex items-center justify-between gap-3">
                    {item.pairedWithIds && item.pairedWithIds.length > 0 ? (
                      <button
                        onClick={() => setPairingModalItem(item)}
                        className="text-[11px] text-[#DFB17B] hover:text-white flex items-center gap-1 font-medium underline underline-offset-4 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" /> Pairs With...
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#F5EDE0]/40">Fresh Daily Batch</span>
                    )}

                    <span className="px-3 py-1.5 bg-[#2C1E18] text-[#DFB17B] border border-[#C68B59]/40 font-mono text-xs rounded-xl flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#DFB17B]" />
                      <span>Artisanal Batch</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drink Pairing Modal */}
      {pairingModalItem && (
        <DrinkPairingModal
          item={pairingModalItem}
          pairedItems={getPairedItems(pairingModalItem)}
          isOpen={!!pairingModalItem}
          onClose={() => setPairingModalItem(null)}
          onAddToCart={onAddToCart}
          onAddBothToCart={onAddBothToCart}
        />
      )}

      {/* Custom Drink Builder Modal */}
      <CustomDrinkBuilderModal
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
        onAddCustomToCart={onAddCustomToCart}
      />
    </section>
  );
};

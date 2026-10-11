import React from 'react';
import { Compass, Flame, Sparkles, PlusCircle, Crown } from 'lucide-react';
import { CustomBrewConfig, MenuItem } from '../../types/spatial';

interface BrewLabCustomizerSectionProps {
  customConfig: CustomBrewConfig;
  onUpdateConfig: (newConfig: CustomBrewConfig) => void;
  onAddCustomToCart: (item: MenuItem, config: CustomBrewConfig, price: number) => void;
}

export const BrewLabCustomizerSection: React.FC<BrewLabCustomizerSectionProps> = ({
  customConfig,
  onUpdateConfig,
  onAddCustomToCart
}) => {
  const basePrices: Record<CustomBrewConfig['base'], { name: string; price: number; desc: string }> = {
    'espresso-single': { name: 'Single Shot Geisha Ristretto', price: 4.50, desc: 'Single 30ml concentrated extraction' },
    'espresso-double': { name: 'Double Shot Geisha Ristretto', price: 6.00, desc: 'Double 60ml intense extraction' },
    'pour-over': { name: 'V60 Single Origin Hand Drip', price: 7.50, desc: '300ml clean pour-over filtration' },
    'nitro-cold': { name: 'Nitrogen Charged Slow Extraction', price: 8.00, desc: '400ml cascading creamy velvet' }
  };

  const milkPrices: Record<CustomBrewConfig['milk'], { name: string; price: number }> = {
    'none': { name: 'Pure Black (No Milk)', price: 0 },
    'oat-silk': { name: 'Organic Oat Silk', price: 0.85 },
    'almond-cream': { name: 'Artisan Almond Cream', price: 0.85 },
    'microfoam-whole': { name: 'Grass-fed Whole Microfoam', price: 0.50 }
  };

  const infusionPrices: Record<CustomBrewConfig['infusion'], { name: string; price: number }> = {
    'none': { name: 'Pure Coffee Notes', price: 0 },
    'vanilla-bean': { name: 'Madagascar Vanilla Bean', price: 1.00 },
    'salted-caramel': { name: 'Smoked Sea Salt Caramel', price: 1.00 },
    'smoked-cinnamon': { name: 'Applewood Smoked Cinnamon', price: 0.75 },
    'lavender-honey': { name: 'Wild Lavender Blossom Honey', price: 1.25 }
  };

  const totalCalculatedPrice =
    basePrices[customConfig.base].price +
    milkPrices[customConfig.milk].price +
    infusionPrices[customConfig.infusion].price;

  const handleAddToCart = () => {
    const customItem: MenuItem = {
      id: `custom-brew-${Date.now()}`,
      name: `Bespoke ${basePrices[customConfig.base].name}`,
      category: 'signature',
      price: totalCalculatedPrice,
      description: `Custom roast (${customConfig.roastLevel}) with ${milkPrices[customConfig.milk].name} & ${infusionPrices[customConfig.infusion].name}.`,
      rating: 5.0,
      cuppingScore: 98,
      roastLevel: customConfig.roastLevel === 'light-golden' ? 'Light' : customConfig.roastLevel === 'medium-velvet' ? 'Medium' : 'Dark',
      tags: ['Bespoke Custom', 'Studio Reserve'],
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
      origin: 'Bespoke Blend',
      flavorProfile: { acidity: 9, body: 9, sweetness: 9, aroma: 10 },
      volume: '350 ml'
    };
    onAddCustomToCart(customItem, customConfig, totalCalculatedPrice);
  };

  return (
    <section className="min-h-screen relative py-20 px-4 sm:px-8 pointer-events-auto flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Spatial Canvas Focal Spacer */}
        <div className="lg:col-span-6 hidden lg:block space-y-4">
          <div className="spatial-glass p-7 rounded-3xl border border-[#dfb17b]/30 space-y-3 max-w-md shadow-spatial">
            <div className="flex items-center space-x-2 text-[#dfb17b] font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#f5cb98] animate-spin" style={{ animationDuration: '10s' }} />
              <span>Real-Time 3D Studio Engine</span>
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white">Live Spatial Canvas</h3>
            <p className="text-xs text-[#a39790] leading-relaxed font-sans">
              Every adjustment to your roast level, froth texture, and extraction method directly morphs the 24k gold trimmed 3D cup model in physical space.
            </p>
          </div>
        </div>

        {/* Right Side: Customizer Controls Panel */}
        <div className="lg:col-span-6 spatial-glass-bright rounded-3xl p-6 sm:p-9 border border-[#dfb17b]/40 shadow-spatial-lg space-y-6">
          <div className="space-y-2 border-b border-[#dfb17b]/20 pb-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#dfb17b] uppercase tracking-widest">
              <Crown className="w-4 h-4" />
              <span>Private Reserve Studio</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
              Bespoke Coffee Studio
            </h2>
          </div>

          {/* 1. Base Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-widest text-[#dfb17b]">
              1. Select Extraction Base
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(basePrices) as Array<CustomBrewConfig['base']>).map((key) => (
                <button
                  key={key}
                  onClick={() => onUpdateConfig({ ...customConfig, base: key })}
                  className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                    customConfig.base === key
                      ? 'bg-[#dfb17b]/25 border-[#dfb17b] text-white font-bold shadow-gold-glow'
                      : 'bg-[#060504]/70 border-white/5 text-[#a39790] hover:border-[#dfb17b]/30'
                  }`}
                >
                  <div className="flex justify-between font-bold text-white">
                    <span>{basePrices[key].name}</span>
                    <span className="text-[#dfb17b]">${basePrices[key].price.toFixed(2)}</span>
                  </div>
                  <div className="text-[10px] text-[#a39790] mt-1 font-sans">{basePrices[key].desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Roast Profile */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-widest text-[#dfb17b]">
              2. Roast Profile (Updates 3D Surface)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'light-golden', name: 'Light Golden', icon: Flame },
                { id: 'medium-velvet', name: 'Medium Velvet', icon: Flame },
                { id: 'dark-obsidian', name: 'Dark Obsidian', icon: Flame }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => onUpdateConfig({ ...customConfig, roastLevel: r.id as CustomBrewConfig['roastLevel'] })}
                  className={`p-3 rounded-xl border text-center text-xs font-mono uppercase tracking-wider transition-all ${
                    customConfig.roastLevel === r.id
                      ? 'bg-[#dfb17b]/25 border-[#dfb17b] text-[#dfb17b] font-bold shadow-gold-glow'
                      : 'bg-[#060504]/70 border-white/5 text-[#a39790] hover:border-[#dfb17b]/30'
                  }`}
                >
                  <r.icon className="w-3.5 h-3.5 mx-auto mb-1 text-[#dfb17b]" />
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Milk & Texture */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-widest text-[#dfb17b]">
              3. Milk & Microfoam Texture
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(milkPrices) as Array<CustomBrewConfig['milk']>).map((mKey) => (
                <button
                  key={mKey}
                  onClick={() => onUpdateConfig({ ...customConfig, milk: mKey })}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    customConfig.milk === mKey
                      ? 'bg-[#dfb17b]/25 border-[#dfb17b] text-white font-bold shadow-gold-glow'
                      : 'bg-[#060504]/70 border-white/5 text-[#a39790] hover:border-[#dfb17b]/30'
                  }`}
                >
                  <div className="flex justify-between font-sans">
                    <span>{milkPrices[mKey].name}</span>
                    <span className="text-[#dfb17b] font-mono">
                      {milkPrices[mKey].price > 0 ? `+$${milkPrices[mKey].price.toFixed(2)}` : 'Included'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Craft Infusions */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-widest text-[#dfb17b]">
              4. Artisanal Infusion
            </label>
            <select
              value={customConfig.infusion}
              onChange={(e) => onUpdateConfig({ ...customConfig, infusion: e.target.value as CustomBrewConfig['infusion'] })}
              className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#dfb17b]"
            >
              {(Object.keys(infusionPrices) as Array<CustomBrewConfig['infusion']>).map((iKey) => (
                <option key={iKey} value={iKey}>
                  {infusionPrices[iKey].name} {infusionPrices[iKey].price > 0 ? `(+$${infusionPrices[iKey].price.toFixed(2)})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Total Price & Add CTA */}
          <div className="pt-4 border-t border-[#dfb17b]/20 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#a39790] uppercase tracking-widest">Bespoke Price</div>
              <div className="font-mono text-3xl font-bold text-[#dfb17b]">
                ${totalCalculatedPrice.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] hover:brightness-110 text-[#060504] font-bold text-sm px-7 py-4 rounded-2xl shadow-gold-glow transition-all active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Custom Brew</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

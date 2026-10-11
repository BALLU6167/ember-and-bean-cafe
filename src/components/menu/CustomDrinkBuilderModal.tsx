import React, { useState } from 'react';
import { CustomDrinkConfig, MenuItem } from '../../types/cafe';
import { X, Sparkles, Check, Plus, Coffee } from 'lucide-react';

interface CustomDrinkBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToCart?: (config: CustomDrinkConfig, price: number, name: string) => void;
}

export const CustomDrinkBuilderModal: React.FC<CustomDrinkBuilderModalProps> = ({
  isOpen,
  onClose,
  onAddCustomToCart,
}) => {
  const [size, setSize] = useState<CustomDrinkConfig['size']>('Regular (12oz)');
  const [base, setBase] = useState<CustomDrinkConfig['base']>('Single Origin Espresso');
  const [milk, setMilk] = useState<CustomDrinkConfig['milk']>('Oat Silk Milk');
  const [shots, setShots] = useState<number>(2);
  const [syrup, setSyrup] = useState<CustomDrinkConfig['syrup']>('Madagascar Vanilla Bean');
  const [temperature, setTemperature] = useState<CustomDrinkConfig['temperature']>('Steamed Hot (65°C)');
  const [toppings, setToppings] = useState<string[]>(['Cocoa Dust']);

  if (!isOpen) return null;

  // Calculate live dynamic price
  let basePrice = 220;
  if (size === 'Regular (12oz)') basePrice += 40;
  if (size === 'Grande (16oz)') basePrice += 80;

  if (shots > 2) basePrice += (shots - 2) * 50;
  if (milk === 'Oat Silk Milk' || milk === 'Almond Cream Milk') basePrice += 40;
  if (syrup !== 'None') basePrice += 45;
  if (toppings.includes('24k Gold Flakes')) basePrice += 150;
  if (toppings.includes('Sea Salt Flakes')) basePrice += 20;

  const toggleTopping = (t: string) => {
    if (toppings.includes(t)) {
      setToppings(toppings.filter((item) => item !== t));
    } else {
      setToppings([...toppings, t]);
    }
  };

  const handleAdd = () => {
    const customConfig: CustomDrinkConfig = {
      size,
      base,
      milk,
      shots,
      syrup,
      temperature,
      toppings,
    };
    const customName = `${size.split(' ')[0]} ${temperature.includes('Ice') ? 'Iced' : 'Hot'} ${syrup !== 'None' ? syrup.split(' ')[1] || syrup : 'Artisan'} ${base.replace('Concentrate', '')}`;
    if (onAddCustomToCart) {
      onAddCustomToCart(customConfig, basePrice, customName);
    }
    onClose();
  };

  // Visual cup liquid color based on milk and syrup
  const getLiquidColor = () => {
    if (base === 'Ceremonial Matcha') return '#4E724E';
    if (milk === 'Whole Milk' || milk === 'A2 Cow Milk') return '#C89D77';
    if (milk === 'Oat Silk Milk') return '#B5885C';
    if (base === 'Cold Brew Concentrate') return '#3E2519';
    return '#8D5B35';
  };

  return (
    <div className="fixed inset-0 z-[99950] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-[#1A110D] border-2 border-[#C68B59]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0] my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close Drink Customizer"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#C68B59] font-bold block mb-1">
            Bespoke Roastery Lab
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EDE0]">
            The Custom Cup Builder
          </h2>
          <p className="text-xs sm:text-sm text-[#F5EDE0]/70">
            Tailor your milk, espresso ratio, house-made botanicals, and temperature with live SVG visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Illustrated Cup Visualization */}
          <div className="lg:col-span-5 bg-[#120B08] border border-[#C68B59]/30 rounded-2xl p-6 flex flex-col items-center justify-center relative">
            <span className="text-[10px] uppercase tracking-widest text-[#DFB17B] font-mono mb-4">
              Live Cup Preview
            </span>

            {/* Illustrated Cup */}
            <div className="relative w-44 h-56 flex flex-col items-center justify-end my-4">
              {/* Cup Top Foam / Crema */}
              <div
                className="w-36 h-6 rounded-t-full border border-white/20 z-20 shadow-inner flex items-center justify-center"
                style={{
                  backgroundColor: temperature.includes('Ice') ? '#E8DFD4' : '#DFB17B',
                }}
              >
                {toppings.length > 0 && (
                  <span className="text-[10px] text-[#1E1410] font-bold tracking-wider">
                    {toppings.join(' • ')}
                  </span>
                )}
              </div>

              {/* Glass Cup Body */}
              <div className="relative w-36 h-44 border-2 border-[#C68B59]/50 rounded-b-3xl overflow-hidden bg-white/5 backdrop-blur-sm p-1 flex flex-col justify-end shadow-2xl">
                {/* Ice cubes if iced */}
                {temperature.includes('Ice') && (
                  <div className="absolute inset-x-2 top-4 flex justify-around pointer-events-none z-10">
                    <span className="w-6 h-6 bg-white/40 border border-white/60 rounded rotate-12 backdrop-blur-sm" />
                    <span className="w-5 h-5 bg-white/30 border border-white/60 rounded -rotate-6 backdrop-blur-sm" />
                  </div>
                )}

                {/* Liquid Fill */}
                <div
                  className="w-full rounded-b-2xl transition-all duration-300 relative shadow-inner"
                  style={{
                    height: size.includes('Grande') ? '92%' : size.includes('Regular') ? '80%' : '65%',
                    backgroundColor: getLiquidColor(),
                  }}
                >
                  {/* Subtle steam if hot */}
                  {!temperature.includes('Ice') && (
                    <div className="absolute inset-x-0 -top-6 flex justify-center gap-2 pointer-events-none">
                      <span className="w-1 h-5 bg-white/40 rounded-full animate-steam" />
                      <span className="w-1 h-6 bg-white/40 rounded-full animate-steam-delay" />
                    </div>
                  )}
                </div>
              </div>

              {/* Cup Saucer */}
              <div className="w-44 h-3 bg-[#2C1E18] border border-[#C68B59]/40 rounded-full mt-1" />
            </div>

            {/* Specs Summary Pill */}
            <div className="w-full bg-[#1A110D] border border-[#C68B59]/30 rounded-xl p-3 text-xs space-y-1 mt-4">
              <div className="flex justify-between text-[#F5EDE0]/70">
                <span>Base:</span>
                <strong className="text-[#F5EDE0]">{base} ({shots} shots)</strong>
              </div>
              <div className="flex justify-between text-[#F5EDE0]/70">
                <span>Milk:</span>
                <strong className="text-[#F5EDE0]">{milk}</strong>
              </div>
              <div className="flex justify-between text-[#F5EDE0]/70">
                <span>Botanical Syrup:</span>
                <strong className="text-[#DFB17B]">{syrup}</strong>
              </div>
              <div className="flex justify-between text-[#F5EDE0]/70">
                <span>Temperature:</span>
                <strong className="text-[#F5EDE0]">{temperature}</strong>
              </div>
            </div>

            {/* Live Calculated Price */}
            <div className="w-full mt-4 flex items-center justify-between pt-3 border-t border-[#C68B59]/30">
              <span className="text-xs uppercase tracking-wider text-[#F5EDE0]/60">Total Cup Price</span>
              <span className="font-serif text-2xl font-bold text-[#DFB17B]">₹{basePrice}</span>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            {/* 1. Size */}
            <div>
              <label className="font-semibold text-sm text-[#F5EDE0] block mb-2">1. Cup Volume</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Small (8oz)', 'Regular (12oz)', 'Grande (16oz)'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                      size === s
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Base Espresso Type */}
            <div>
              <label className="font-semibold text-sm text-[#F5EDE0] block mb-2">2. Espresso & Base Extract</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {([
                  'Single Origin Espresso',
                  'Double Ristretto',
                  'Cold Brew Concentrate',
                  'Ceremonial Matcha',
                  'Chai Spiced',
                ] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBase(b)}
                    className={`py-2 px-2.5 rounded-xl border text-left transition-all ${
                      base === b
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Espresso Shots Count */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-sm text-[#F5EDE0]">3. Espresso Shots</label>
                <span className="font-bold text-[#DFB17B]">{shots} {shots === 1 ? 'Shot' : 'Shots'}</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setShots(n)}
                    className={`flex-1 py-2 rounded-xl border text-center font-bold ${
                      shots === n
                        ? 'bg-[#C68B59] text-[#1E1410] border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                    }`}
                  >
                    {n}x
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Milk / Plant Silk */}
            <div>
              <label className="font-semibold text-sm text-[#F5EDE0] block mb-2">4. Milk & Plant Emulsions</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {([
                  'Whole Milk',
                  'Oat Silk Milk',
                  'Almond Cream Milk',
                  'Coconut Milk',
                  'A2 Cow Milk',
                ] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMilk(m)}
                    className={`py-2 px-2.5 rounded-xl border text-left transition-all ${
                      milk === m
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. House-Made Syrups */}
            <div>
              <label className="font-semibold text-sm text-[#F5EDE0] block mb-2">5. House Infused Syrups (+₹45)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {([
                  'None',
                  'Madagascar Vanilla Bean',
                  'Smoked Salted Caramel',
                  'Roasted Hazelnut',
                  'Wild Ceylon Cinnamon',
                  'Raw Cardamom Honey',
                ] as const).map((syr) => (
                  <button
                    key={syr}
                    type="button"
                    onClick={() => setSyrup(syr)}
                    className={`py-2 px-2.5 rounded-xl border text-left transition-all ${
                      syrup === syr
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
                    }`}
                  >
                    {syr}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Temperature */}
            <div>
              <label className="font-semibold text-sm text-[#F5EDE0] block mb-2">6. Serving Temperature</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([
                  'Steamed Hot (65°C)',
                  'Extra Hot (72°C)',
                  'Over Clear Ice',
                  'Nitro Chilled',
                ] as const).map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setTemperature(temp)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all ${
                      temperature === temp
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80 hover:border-[#DFB17B]'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Artisan Toppings */}
            <div>
              <label className="font-semibold text-sm text-[#F5EDE0] block mb-2">7. Artisan Dusting & Toppings</label>
              <div className="flex flex-wrap gap-2">
                {['Cocoa Dust', '24k Gold Flakes (+₹150)', 'Sea Salt Flakes (+₹20)', 'Cinnamon Sugar'].map((top) => {
                  const isChecked = toppings.includes(top.split(' (')[0]);
                  return (
                    <button
                      key={top}
                      type="button"
                      onClick={() => toggleTopping(top.split(' (')[0])}
                      className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-1.5 transition-all ${
                        isChecked
                          ? 'bg-[#DFB17B] text-[#1E1410] font-bold border-white'
                          : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                      }`}
                    >
                      {isChecked ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      <span>{top}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Custom Recipe Button */}
            <div className="pt-4 border-t border-[#C68B59]/30">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold py-4 rounded-2xl text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Save Custom Recipe (Est. ₹{basePrice})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

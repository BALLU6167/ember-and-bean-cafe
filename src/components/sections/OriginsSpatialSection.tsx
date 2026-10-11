import React from 'react';
import { Globe, Award, MapPin, ShoppingBag, Crown } from 'lucide-react';
import { ORIGIN_BEANS } from '../../data/coffeeData';
import { MenuItem } from '../../types/spatial';

interface OriginsSpatialSectionProps {
  onAddBeanToCart: (item: MenuItem) => void;
}

export const OriginsSpatialSection: React.FC<OriginsSpatialSectionProps> = ({ onAddBeanToCart }) => {
  return (
    <section className="min-h-screen relative py-20 px-4 sm:px-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#dfb17b]/10 border border-[#dfb17b]/30 text-xs font-mono text-[#dfb17b] uppercase tracking-[0.2em]">
            <Crown className="w-3.5 h-3.5 text-[#f5cb98]" />
            <span>High Altitude Sourcing</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Single-Origin Terroir
          </h2>
          <p className="text-[#a39790] text-base max-w-xl mx-auto font-sans">
            Discover our high-elevation microlots harvested directly from generational family estates across Ethiopia, Panama, and Colombia.
          </p>
        </div>

        {/* 3D Perspective Origin Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ORIGIN_BEANS.map((bean) => {
            const beanMenuItem: MenuItem = {
              id: `bag-${bean.id}`,
              name: `250g Whole Bean — ${bean.name}`,
              category: 'pourover',
              price: 28.00,
              description: bean.description,
              rating: 4.98,
              cuppingScore: bean.cuppingScore,
              roastLevel: 'Light',
              tags: ['Whole Bean', 'Single Origin', 'Direct Trade'],
              image: bean.image,
              origin: bean.country,
              flavorProfile: { acidity: 9, body: 8, sweetness: 9, aroma: 10 },
              volume: '250 g'
            };

            return (
              <div
                key={bean.id}
                className="spatial-glass rounded-3xl p-6 border border-[#dfb17b]/30 hover:border-[#dfb17b]/70 transition-all duration-500 shadow-spatial flex flex-col justify-between hover:translate-y-[-6px]"
              >
                <div className="space-y-5">
                  {/* Origin Banner Image */}
                  <div className="relative h-52 rounded-2xl overflow-hidden">
                    <img
                      src={bean.image}
                      alt={bean.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060504] via-transparent to-transparent opacity-85" />

                    <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#060504]/90 backdrop-blur-md border border-[#dfb17b]/40 font-mono text-xs text-[#dfb17b]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{bean.country}</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center space-x-1 px-3 py-1 rounded-xl bg-gradient-to-r from-[#f5cb98] to-[#dfb17b] text-[#060504] font-mono text-xs font-bold shadow-gold-glow">
                      <Award className="w-3.5 h-3.5" />
                      <span>{bean.cuppingScore} SCA</span>
                    </div>
                  </div>

                  {/* Title & Region */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">{bean.name}</h3>
                    <div className="font-mono text-xs text-[#dfb17b] mt-1">{bean.region}</div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2.5 bg-[#060504]/80 p-3.5 rounded-xl border border-[#dfb17b]/20 font-mono text-xs">
                    <div>
                      <span className="text-[#a39790] block text-[10px] uppercase">Elevation</span>
                      <span className="text-white font-semibold">{bean.altitude}</span>
                    </div>
                    <div>
                      <span className="text-[#a39790] block text-[10px] uppercase">Process</span>
                      <span className="text-white font-semibold">{bean.process}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#a39790] leading-relaxed font-sans">{bean.description}</p>

                  {/* Flavor Notes */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-[#dfb17b]">Cupping Tasting Notes</div>
                    <div className="flex flex-wrap gap-1.5">
                      {bean.flavorNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-[#dfb17b]/15 border border-[#dfb17b]/30 text-[11px] font-sans text-white"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-[#dfb17b]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#a39790] block uppercase">250g Reserve Bag</span>
                    <span className="font-mono text-xl font-bold text-[#dfb17b]">$28.00</span>
                  </div>

                  <button
                    onClick={() => onAddBeanToCart(beanMenuItem)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] hover:brightness-110 text-[#060504] font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-gold-glow active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Whole Beans</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

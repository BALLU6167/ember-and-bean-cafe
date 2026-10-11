import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { LiveCafeStatusWidget } from '../components/status/LiveCafeStatusWidget';
import { ReviewsUGCSection } from '../components/ugc/ReviewsUGCSection';
import { FAQAccordionSection } from '../components/faq/FAQAccordionSection';
import { LocationHoursSection } from '../components/location/LocationHoursSection';
import { MENU_ITEMS } from '../data/cafeData';
import { ArrowRight, Sparkles, Eye, Laptop } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const featuredItems = [
    MENU_ITEMS.find((i) => i.id === 'genv-smash-cheeseburger') || MENU_ITEMS[0],
    MENU_ITEMS.find((i) => i.id === 'burrata-san-marzano-pizza') || MENU_ITEMS[4],
    MENU_ITEMS.find((i) => i.id === 'truffle-parmesan-fries') || MENU_ITEMS[8],
    MENU_ITEMS.find((i) => i.id === 'lotus-biscoff-shake') || MENU_ITEMS[12],
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-transparent text-[#FAF6F0]">
      {/* 1. Cinematic Hero with Instagram Reel Video Loop & Sound Button */}
      <HeroSection
        onExploreMenu={() => onNavigate('menu')}
        onViewCafe={() => onNavigate('view-cafe')}
      />

      {/* 2. Live Café Pulse / Busyness Widget */}
      <LiveCafeStatusWidget />

      {/* 3. Featured Seasonal Highlights Strip */}
      <section className="py-20 bg-transparent border-b border-[#D49B6A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-bold block mb-2">
                {t.featuredBadge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6F0]">
                {t.featuredTitle}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="text-xs font-semibold uppercase tracking-wider text-[#D49B6A] hover:text-[#FAF6F0] flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>{t.featuredExplore}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#160F0B] border border-[#D49B6A]/25 hover:border-[#D49B6A] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden bg-[#1E1510]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160F0B] via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 right-3 bg-[#1A130E]/90 px-3 py-1 rounded-xl text-xs font-mono font-bold text-[#D49B6A] border border-[#D49B6A]/35">
                    ₹{item.price}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#D49B6A] block mb-1">
                      {item.origin || item.category.toUpperCase()}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#FAF6F0] leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#DDD3C4]/75 mt-1 line-clamp-2 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D49B6A]/15 flex items-center justify-between">
                    <span className="text-[11px] text-[#DDD3C4]/50">{item.calories} kcal</span>
                    <button
                      onClick={() => onNavigate('menu')}
                      className="px-3 py-1.5 bg-[#251A13] text-[#D49B6A] border border-[#D49B6A]/30 hover:bg-[#D49B6A] hover:text-[#120D0A] font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Navigation Callouts: View Café & Workspace */}
      <section className="py-20 bg-transparent border-b border-[#D49B6A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* View Cafe Card */}
          <div
            onClick={() => onNavigate('view-cafe')}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#221610] to-[#140D09] border border-[#D49B6A]/30 hover:border-[#D49B6A] transition-all cursor-pointer group shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A] mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D49B6A]">
              {t.viewCafeBadge}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#FAF6F0] mt-1 mb-2 group-hover:text-[#D49B6A] transition-colors">
              {t.viewCafeTitle}
            </h3>
            <p className="text-xs text-[#DDD3C4]/75 leading-relaxed font-light mb-6">
              {t.viewCafeSubtitle}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D49B6A] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
              {t.heroViewCafe} →
            </span>
          </div>

          {/* Workspace Card */}
          <div
            onClick={() => onNavigate('workspace')}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#221610] to-[#140D09] border border-[#D49B6A]/30 hover:border-[#D49B6A] transition-all cursor-pointer group shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#B86F43]/15 border border-[#B86F43]/30 flex items-center justify-center text-[#D49B6A] mb-4">
              <Laptop className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D49B6A]">
              {t.workspaceBadge}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#FAF6F0] mt-1 mb-2 group-hover:text-[#D49B6A] transition-colors">
              {t.workspaceTitle}
            </h3>
            <p className="text-xs text-[#DDD3C4]/75 leading-relaxed font-light mb-6">
              {t.workspaceSubtitle}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D49B6A] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
              Inspect Workspace Mode →
            </span>
          </div>
        </div>
      </section>

      {/* 5. Reviews & UGC Wall */}
      <ReviewsUGCSection />

      {/* 6. FAQ Accordion & Newsletter */}
      <FAQAccordionSection />

      {/* 7. Location & Opening Hours */}
      <LocationHoursSection />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TopOfferBanner } from '../offer/TopOfferBanner';

export type MoodMode = 'morning' | 'afternoon' | 'evening';

export type PageRoute = 
  | 'home'
  | 'menu'
  | 'view-cafe'
  | 'workspace'
  | 'story';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  cartCount?: number;
  mood: MoodMode;
  onSelectMood: (mood: MoodMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  mood,
  onSelectMood,
}) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const checkHours = () => {
      const currentHour = new Date().getHours();
      setIsOpenNow(currentHour >= 7 && currentHour < 23);
    };
    checkHours();
    const interval = setInterval(checkHours, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Clean, focused navigation without Bean Journey, Brew Guides, or Events
  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'menu', label: t.navMenu },
    { id: 'view-cafe', label: t.navViewCafe },
    { id: 'workspace', label: t.navWorkspace },
    { id: 'story', label: t.navStory },
  ];

  const moodLabels: Record<MoodMode, string> = {
    morning: t.moodMorning,
    afternoon: t.moodAfternoon,
    evening: t.moodEvening,
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full overflow-x-hidden">
      {/* 0. Live Promotional Top Offer Banner (if an offer is active) */}
      <TopOfferBanner onClaim={() => onNavigate('menu')} />

      {/* Main Navbar Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#120D0A]/95 backdrop-blur-md border-b border-[#D49B6A]/25 shadow-2xl'
            : 'py-3.5 sm:py-5 bg-gradient-to-b from-[#120D0A]/95 via-[#160F0B]/85 to-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark & Live Hours Dot */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer shrink-0"
          >
            <div
              translate="no"
              className="notranslate w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D49B6A] via-[#B86F43] to-[#8E4D26] flex items-center justify-center text-[#120D0A] font-serif font-black text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform shrink-0"
            >
              E
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  translate="no"
                  className="notranslate font-serif font-bold text-base sm:text-xl tracking-wider text-[#FAF6F0] group-hover:text-[#D49B6A] transition-colors leading-tight"
                >
                  {t.brandName}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpenNow ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-500'
                  }`}
                  title={isOpenNow ? t.openNow : t.opensAt}
                />
              </div>
              <span className="text-[8px] sm:text-[10px] tracking-[0.22em] uppercase text-[#D49B6A] font-medium">
                {t.brandCity}
              </span>
            </div>
          </button>

          {/* Desktop Multi-Page Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs uppercase tracking-widest font-semibold text-[#FAF6F0]/85">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive ? 'text-[#D49B6A]' : 'hover:text-[#D49B6A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B86F43] to-[#D49B6A] rounded-full shadow-[0_0_8px_rgba(212,155,106,0.4)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls Bar: Mood Selector on Desktop & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mood Selector Dropdown */}
            <div className="relative hidden lg:block">
              <select
                value={mood}
                onChange={(e) => onSelectMood(e.target.value as MoodMode)}
                aria-label="Select Mood Theme"
                className="appearance-none bg-[#160F0B] text-[#D49B6A] text-[11px] font-medium border border-[#D49B6A]/30 rounded-full px-3 py-1.5 pr-6 cursor-pointer focus:outline-none hover:border-[#D49B6A] transition-colors"
              >
                <option value="morning">{moodLabels.morning}</option>
                <option value="afternoon">{moodLabels.afternoon}</option>
                <option value="evening">{moodLabels.evening}</option>
              </select>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 rounded-xl text-[#FAF6F0] hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#120D0A]/98 border-b border-[#D49B6A]/30 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3 text-sm uppercase tracking-widest font-semibold text-[#FAF6F0]/90">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate(link.id);
                }}
                className={`py-2 text-left transition-colors flex items-center justify-between ${
                  currentPage === link.id ? 'text-[#D49B6A]' : 'hover:text-[#D49B6A]'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && (
                  <span className="w-2 h-2 rounded-full bg-[#D49B6A]" />
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

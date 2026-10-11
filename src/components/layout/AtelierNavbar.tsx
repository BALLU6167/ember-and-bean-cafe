import React, { useState, useEffect } from 'react';
import { AtelierPage } from '../../types/atelier';
import { useLanguage } from '../../context/LanguageContext';
import { LangMode } from '../../utils/translations';
import { Menu, X, Languages, Check, ChevronDown, Sparkles } from 'lucide-react';

interface AtelierNavbarProps {
  currentPage: AtelierPage;
  onNavigate: (page: AtelierPage) => void;
  onBookFlight: () => void;
}

export const AtelierNavbar: React.FC<AtelierNavbarProps> = ({
  currentPage,
  onNavigate,
  onBookFlight,
}) => {
  const { lang, setLang } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#atelier-lang-btn')) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener('click', handleOutside);
    }
    return () => document.removeEventListener('click', handleOutside);
  }, [isLangOpen]);

  const navLinks: { id: AtelierPage; label: string }[] = [
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'the-roast', label: 'The Roast' },
    { id: 'extraction-engine', label: 'Extraction Engine' },
    { id: 'origins', label: 'Origins' },
    { id: 'reserve', label: 'Reserve' },
  ];

  const languagesList: { code: LangMode; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  ];

  // Apple-style fade: nearly invisible at the absolute top, smoothly fades in with backdrop blur
  const isScrolled = scrollY > 20;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-[#060504]/80 backdrop-blur-xl border-b border-[#C6A15B]/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 sm:py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Minimalist Brand Logomark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          {/* Geometric Japanese Monogram */}
          <div className="w-8 h-8 rounded-lg bg-[#0C0A09] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] font-serif font-bold text-sm tracking-widest shadow-md group-hover:border-[#E58A2B] transition-colors">
            珈
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-[0.2em] text-[#F5F2EB] group-hover:text-[#C6A15B] transition-colors uppercase leading-none">
              ATELIER KŌHĪ
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.3em] text-[#C6A15B]/70 uppercase mt-1">
              HAUTE ROASTERY & BREW LAB
            </span>
          </div>
        </button>

        {/* Center: Apple-style Editorial Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.22em] font-medium text-[#E8E3D9]/75">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-[#F5F2EB] font-bold' : 'hover:text-[#F5F2EB]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] rounded-full shadow-[0_0_8px_#E58A2B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Language Dropdown + CTA */}
        <div className="flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div id="atelier-lang-btn" className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0C0A09]/70 border border-[#C6A15B]/30 text-[#C6A15B] text-[10px] font-mono uppercase tracking-widest hover:border-[#E58A2B] hover:text-[#F5F2EB] transition-all cursor-pointer"
              title="Select Language"
            >
              <Languages className="w-3 h-3 text-[#C6A15B]" />
              <span>{lang}</span>
              <ChevronDown className="w-2.5 h-2.5 text-[#C6A15B]/60" />
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#0C0A09] border border-[#C6A15B]/40 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {languagesList.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                      lang === item.code
                        ? 'bg-[#C6A15B]/20 text-[#C6A15B] font-bold'
                        : 'text-[#E8E3D9]/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="block text-xs">{item.nativeName}</span>
                      <span className="block text-[9px] text-[#E8E3D9]/40 font-light">{item.name}</span>
                    </div>
                    {lang === item.code && <Check className="w-3 h-3 text-[#C6A15B]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Luxury CTA Button */}
          <button
            onClick={onBookFlight}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] hover:from-[#DFB17B] hover:to-[#C6A15B] text-[#060504] font-bold text-[10px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(198,161,91,0.25)] hover:shadow-[0_0_25px_rgba(229,138,43,0.45)] hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 text-[#060504]" />
            <span>Book Tasting Flight</span>
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
            className="lg:hidden p-2 text-[#E8E3D9] hover:text-[#C6A15B] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#060504]/98 border-b border-[#C6A15B]/20 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3 text-xs uppercase tracking-widest font-semibold text-[#E8E3D9]/80">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate(link.id);
                }}
                className={`py-2 text-left transition-colors flex items-center justify-between ${
                  currentPage === link.id ? 'text-[#C6A15B] font-bold' : 'hover:text-[#F5F2EB]'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E58A2B]" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-[#C6A15B]/20 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookFlight();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-widest text-center shadow-lg"
            >
              Book Tasting Flight
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

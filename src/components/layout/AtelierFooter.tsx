import React from 'react';
import { AtelierPage } from '../../types/atelier';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';

interface AtelierFooterProps {
  onNavigate: (page: AtelierPage) => void;
  onBookFlight: () => void;
  onOpenMenu: () => void;
}

export const AtelierFooter: React.FC<AtelierFooterProps> = ({
  onNavigate,
  onBookFlight,
  onOpenMenu,
}) => {
  return (
    <footer className="relative bg-[#060504] border-t border-[#C6A15B]/20 pt-20 pb-16 text-[#F5F2EB] z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#C6A15B]/15">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0C0A09] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] font-serif font-bold text-base tracking-widest shadow-md">
                珈
              </div>
              <div>
                <span className="font-serif font-bold text-lg tracking-[0.25em] text-[#F5F2EB] uppercase block">
                  ATELIER KŌHĪ
                </span>
                <span className="text-[9px] font-mono tracking-[0.3em] text-[#C6A15B]/70 uppercase block">
                  HAUTE ROASTERY & BREW LAB
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#E8E3D9]/60 font-light leading-relaxed max-w-sm">
              Single-origin micro-lot roasts, engineered down to the micron. An architectural salon dedicated to the ritual of zero-bypass extraction.
            </p>

            {/* Strictly only Instagram icon pointing to zen_v_cafe_01 */}
            <div className="pt-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block mb-3">
                OFFICIAL GUILD CHRONICLE
              </span>
              <a
                href="https://www.instagram.com/zen_v_cafe_01/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Atelier Kōhī Instagram"
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0C0A09] border border-[#C6A15B]/30 hover:border-[#C6A15B] text-[#F5F2EB] hover:text-[#C6A15B] transition-all group shadow-md"
              >
                <Instagram className="w-4 h-4 text-[#E58A2B] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono tracking-wider">@zen_v_cafe_01</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C6A15B] font-bold block">
              EDITORIAL DOSSIER
            </span>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-wider text-[#E8E3D9]/70">
              <li>
                <button
                  onClick={() => onNavigate('philosophy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Philosophy & Wabi-Sabi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('the-roast')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  The Roast Thermodynamics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('extraction-engine')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Extraction Engine Schematics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('origins')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Single-Estate Terroir Atlas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reserve')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer"
                >
                  Reserve Private Flight
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#E58A2B]"
                >
                  Explore Seasonal Menu
                </button>
              </li>
            </ul>
          </div>

          {/* Salon Details */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C6A15B] font-bold block">
              SALON & ATELIER BAR
            </span>
            <div className="space-y-2 text-xs font-mono text-[#E8E3D9]/70">
              <p className="text-[#F5F2EB] font-medium">The Glass Pavilion · Level 2</p>
              <p>Road No. 36, Jubilee Hills, Hyderabad</p>
              <div className="pt-2 text-[11px] text-[#C6A15B]">
                <p>Tuesday – Sunday: 10:00 – 21:00</p>
                <p>Monday: Private Cupping & Guild Roasting Only</p>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onBookFlight}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl cursor-pointer"
              >
                Book Tasting Flight
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Micro-Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#E8E3D9]/40 tracking-wider">
          <p>© 2026 ATELIER KŌHĪ. All rights reserved. Precision extraction systems.</p>
          <div className="flex items-center gap-6">
            <span>OBSIDIAN LUXURY DARK ARCHITECTURE</span>
            <span>·</span>
            <span>HASAMI 400Y CERAMIC CRAFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

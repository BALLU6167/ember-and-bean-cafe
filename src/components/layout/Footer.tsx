import React from 'react';
import { Instagram, MapPin, Phone, Mail, Tag, Sparkles } from 'lucide-react';
import { PageRoute } from './Navbar';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'cookies') => void;
  onOpenLoyalty: () => void;
  onOpenCatering: () => void;
  onOpenGift: () => void;
  onOpenReleaseOffer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenLoyalty,
  onOpenCatering,
  onOpenGift,
  onOpenReleaseOffer,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#120D0A] text-[#FAF6F0] border-t border-[#D49B6A]/25 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#D49B6A]/15">
          {/* Col 1: Brand, Bio & Single Instagram Icon */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D49B6A] via-[#B86F43] to-[#8E4D26] flex items-center justify-center text-[#120D0A] font-serif font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                E
              </div>
              <span className="font-serif font-bold text-2xl tracking-wider text-[#FAF6F0] group-hover:text-[#D49B6A] transition-colors">
                {t.brandName}
              </span>
            </button>

            <p className="text-xs text-[#DDD3C4]/75 leading-relaxed font-light max-w-sm">
              {t.footerBio}
            </p>

            {/* ONLY Instagram Icon - Directs to official cafe account */}
            <div className="flex items-center gap-3 pt-2 text-[#D49B6A]">
              <a
                href="https://www.instagram.com/zen_v_cafe_01/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Ember & Bean on Instagram"
                title="Follow us on Instagram (@zen_v_cafe_01)"
                className="w-10 h-10 rounded-full bg-[#1A130E] border border-[#D49B6A]/35 flex items-center justify-center hover:bg-[#D49B6A] hover:text-[#120D0A] hover:scale-110 transition-all shadow-md group"
              >
                <Instagram className="w-5 h-5 text-[#D49B6A] group-hover:text-[#120D0A] transition-colors" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Sitemap to Subpages */}
          <div className="space-y-3 text-xs">
            <span className="text-[11px] uppercase tracking-widest text-[#D49B6A] font-mono block font-bold">
              {t.footerExplore}
            </span>
            <ul className="space-y-2 text-[#FAF6F0]/80">
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-[#D49B6A] transition-colors cursor-pointer text-left">
                  {t.footerMenu}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('view-cafe')} className="hover:text-[#D49B6A] transition-colors cursor-pointer text-left font-medium text-[#D49B6A]">
                  {t.footerViewCafe}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workspace')} className="hover:text-[#D49B6A] transition-colors cursor-pointer text-left">
                  {t.footerWorkspace}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#D49B6A] transition-colors cursor-pointer text-left">
                  {t.footerStory}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Unique Guest Services (Brew Quiz Removed) */}
          <div className="space-y-3 text-xs">
            <span className="text-[11px] uppercase tracking-widest text-[#D49B6A] font-mono block font-bold">
              {t.footerServices}
            </span>
            <ul className="space-y-2 text-[#FAF6F0]/80">
              <li>
                <button onClick={onOpenLoyalty} className="hover:text-[#D49B6A] transition-colors cursor-pointer text-left">
                  Connoisseur Loyalty Passport
                </button>
              </li>
              <li>
                <button onClick={onOpenCatering} className="hover:text-[#D49B6A] transition-colors cursor-pointer text-left">
                  Office Coffee Box & Catering
                </button>
              </li>
              <li>
                <button onClick={onOpenGift} className="hover:text-[#D49B6A] transition-colors cursor-pointer text-left">
                  Digital Gift Cards & Treat a Friend
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Roastery Contact & Location */}
          <div className="space-y-3 text-xs">
            <span className="text-[11px] uppercase tracking-widest text-[#D49B6A] font-mono block font-bold">
              {t.footerRoastery}
            </span>
            <div className="space-y-2.5 text-[#DDD3C4]/75 font-light leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D49B6A] shrink-0 mt-0.5" />
                <span>{t.footerAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D49B6A] shrink-0" />
                <a href="tel:+914048923000" className="hover:text-[#D49B6A] transition-colors">
                  +91 (40) 4892-3000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D49B6A] shrink-0" />
                <a href="mailto:hello@emberandbean.com" className="hover:text-[#D49B6A] transition-colors">
                  hello@emberandbean.com
                </a>
              </p>
              <div className="pt-2 text-[11px] text-[#D49B6A]">
                <p>• {t.footerHours}</p>
                <p className="text-[#DDD3C4]/50">• {t.footerValet}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DDD3C4]/50">
          <p>© {new Date().getFullYear()} {t.footerRights}</p>

          {/* Release Offer Option */}
          {onOpenReleaseOffer && (
            <button
              onClick={onOpenReleaseOffer}
              title="Roastery Staff: Release or End Promotional Offer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A130E] border border-[#D49B6A]/40 text-[#D49B6A] hover:bg-[#D49B6A] hover:text-[#120D0A] transition-all cursor-pointer font-medium text-xs shadow-sm hover:scale-105"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Release Offer</span>
            </button>
          )}

          <div className="flex items-center gap-6">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-[#D49B6A] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-[#D49B6A] transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-[#D49B6A] transition-colors cursor-pointer">
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

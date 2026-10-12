import React from 'react';
import { Compass, Phone, MapPin } from 'lucide-react';

interface FloatingMobileActionsProps {
  onExploreMenu?: () => void;
  onOpenOrder?: () => void;
  onOpenMap: () => void;
  cartCount?: number;
}

export const FloatingMobileActions: React.FC<FloatingMobileActionsProps> = ({
  onExploreMenu,
  onOpenOrder,
  onOpenMap,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAction = onExploreMenu || onOpenOrder || onOpenMap;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex items-center justify-between gap-2 bg-[#1E1410]/95 backdrop-blur-lg border border-[#C68B59]/40 p-2 rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300">
      {/* Explore Menu Button */}
      <button
        onClick={handleAction}
        className="flex-1 bg-gradient-to-r from-[#C68B59] to-[#C85A32] text-[#1E1410] font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md cursor-pointer"
      >
        <Compass className="w-4 h-4" />
        <span>Explore Craft Menu</span>
      </button>

      {/* Call button */}
      <a
        href="tel:+914048923000"
        className="w-12 h-12 bg-[#2E211A] border border-[#C68B59]/30 text-[#DFB17B] rounded-xl flex items-center justify-center hover:bg-[#3D2C22] transition-colors"
        aria-label="Call Café"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Directions button */}
      <a
        href="https://maps.google.com/?q=Ember+%26+Bean+Artisanal+Roastery+Road+36+Jubilee+Hills+Hyderabad"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#2E211A] border border-[#C68B59]/30 text-[#DFB17B] rounded-xl flex items-center justify-center hover:bg-[#3D2C22] transition-colors"
        aria-label="Get Directions on Google Maps"
        title="Get Directions on Google Maps"
      >
        <MapPin className="w-4 h-4" />
      </a>
    </div>
  );
};

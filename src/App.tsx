import React, { useState, useEffect } from 'react';
import { MenuItem, ShopItem, CartItem, CustomDrinkConfig } from './types/cafe';

// Common Components
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { FloatingMobileActions } from './components/common/FloatingMobileActions';

// Global Scroll Background from ezgif-split.zip
import { GlobalScrollyBackground } from './components/scrollytelling/GlobalScrollyBackground';

// Context
import { LanguageProvider } from './context/LanguageContext';
import { OfferProvider } from './context/OfferContext';

// Layout
import { Navbar, MoodMode, PageRoute } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ViewCafePage } from './pages/ViewCafePage';
import { WorkspacePage } from './pages/WorkspacePage';
import { StoryPage } from './pages/StoryPage';
import { AtelierHomePage } from './pages/AtelierHomePage';

// Interactive Modals & Drawers
import { LoyaltyProgramModal } from './components/loyalty/LoyaltyProgramModal';
import { CateringCalculatorModal } from './components/catering/CateringCalculatorModal';
import { GiftAndShareModal } from './components/gift/GiftAndShareModal';
import { GalleryLightboxModal } from './components/gallery/GalleryLightboxModal';
import { LegalModal } from './components/legal/LegalModal';
import { ReleaseOfferModal } from './components/offer/ReleaseOfferModal';

export type ExtendedPageRoute = PageRoute | 'brew-lab';

function MainAppContent() {
  // Routing State based on Hash or default 'home'
  const getInitialPage = (): ExtendedPageRoute => {
    const hash = window.location.hash.replace('#', '') as ExtendedPageRoute;
    const validPages: ExtendedPageRoute[] = [
      'home', 'menu', 'view-cafe', 'workspace', 'story', 'brew-lab'
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<ExtendedPageRoute>(getInitialPage());
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Modals & Panels State
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isCateringOpen, setIsCateringOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isReleaseOfferOpen, setIsReleaseOfferOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');
  const [promoCode, setPromoCode] = useState('');

  // Atmosphere / Preferences
  const [mood, setMood] = useState<MoodMode>('morning');

  // Accessibility
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [customCursorEnabled, setCustomCursorEnabled] = useState(false);

  // Hash route listener for browser Back/Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when page changes programmatically
  const handleNavigate = (page: ExtendedPageRoute) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMood = (newMood: MoodMode) => {
    setMood(newMood);
  };

  const openLegalModal = (tab: 'privacy' | 'terms' | 'cookies') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  // Font scale class mapping
  const fontScaleClass =
    fontScale === 'sm'
      ? 'text-[92%]'
      : fontScale === 'lg'
      ? 'text-[108%]'
      : fontScale === 'xl'
      ? 'text-[116%]'
      : 'text-[100%]';

  return (
    <div
      className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#060504] text-[#F5EDE0] font-sans antialiased selection:bg-[#C68B59] selection:text-[#1E1410] transition-colors duration-300 relative ${fontScaleClass} ${
        highContrast ? 'contrast-125 brightness-105' : ''
      }`}
    >
      {/* 0. Hardware-Accelerated Global Scroll-Up / Scroll-Down Background Animated UI from ezgif-split.zip */}
      <GlobalScrollyBackground currentPage={currentPage} />

      {/* Foreground Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
        {/* 1. Cinematic Preloader (shows once on initial mount) */}
        {!isPreloaded && (
          <Preloader onComplete={() => setIsPreloaded(true)} />
        )}

        {/* 2. Top Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* 3. High-End Custom Spatial Cursor (Optional via accessibility) */}
        {customCursorEnabled && <CustomCursor />}

        {/* 5. Sticky Multi-Page Navigation Bar */}
        <Navbar
          currentPage={currentPage as PageRoute}
          onNavigate={(p) => handleNavigate(p)}
          cartCount={0}
          mood={mood}
          onSelectMood={handleSelectMood}
        />

        {/* 6. Multi-Page Main Content View */}
        <main className="min-h-screen w-full max-w-full overflow-x-hidden">
          {currentPage === 'home' && (
            <HomePage onNavigate={(p) => handleNavigate(p as ExtendedPageRoute)} />
          )}

          {currentPage === 'menu' && (
            <MenuPage onBackToHome={() => handleNavigate('home')} />
          )}

          {currentPage === 'view-cafe' && (
            <ViewCafePage
              onBackToHome={() => handleNavigate('home')}
              onExploreMenu={() => handleNavigate('menu')}
            />
          )}

          {currentPage === 'workspace' && (
            <WorkspacePage onBackToHome={() => handleNavigate('home')} />
          )}

          {currentPage === 'story' && (
            <StoryPage
              onBackToHome={() => handleNavigate('home')}
              onOpenGallery={() => setIsGalleryOpen(true)}
            />
          )}

          {currentPage === 'brew-lab' && (
            <AtelierHomePage
              onNavigate={(p) => handleNavigate(p === 'home' ? 'home' : 'brew-lab')}
              onOpenReservation={() => handleNavigate('home')}
              onOpenMenu={() => handleNavigate('menu')}
            />
          )}
        </main>

        {/* 7. Footer with Direct Subpage Navigation & Official Instagram Link */}
        <Footer
          onNavigate={(p) => handleNavigate(p)}
          onOpenLegal={openLegalModal}
          onOpenLoyalty={() => setIsLoyaltyOpen(true)}
          onOpenCatering={() => setIsCateringOpen(true)}
          onOpenGift={() => setIsGiftOpen(true)}
          onOpenReleaseOffer={() => setIsReleaseOfferOpen(true)}
        />
      </div>

      {/* 8. Floating Action Mobile Actions */}
      <FloatingMobileActions
        onExploreMenu={() => handleNavigate('menu')}
        onOpenMap={() => handleNavigate('home')}
      />

      {/* 10. Connoisseur Loyalty Passport Modal */}
      <LoyaltyProgramModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        onClaimReward={() => {
          setIsLoyaltyOpen(false);
          handleNavigate('menu');
        }}
      />

      {/* 11. Catering Calculator Modal */}
      <CateringCalculatorModal
        isOpen={isCateringOpen}
        onClose={() => setIsCateringOpen(false)}
      />

      {/* 12. Gift & Share Experience Modal */}
      <GiftAndShareModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
        onAddGiftCardToCart={() => {
          setIsGiftOpen(false);
          handleNavigate('menu');
        }}
      />

      {/* 13. 21-Moment Photo Lightbox */}
      <GalleryLightboxModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* 14. Release Special Offer Modal (Passkey 7075 Protected) */}
      <ReleaseOfferModal
        isOpen={isReleaseOfferOpen}
        onClose={() => setIsReleaseOfferOpen(false)}
      />

      {/* 15. Legal Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        defaultTab={legalTab}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <OfferProvider>
        <MainAppContent />
      </OfferProvider>
    </LanguageProvider>
  );
}

export default App;

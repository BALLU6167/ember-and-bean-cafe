import React, { useState } from 'react';
import { Coffee, ShoppingBag, Volume2, VolumeX, Sparkles, Layers, Menu as MenuIcon, X, Crown } from 'lucide-react';
import { CartItem } from '../../types/spatial';

interface SpatialHeaderProps {
  currentSection: number;
  onNavigate: (sectionIndex: number) => void;
  webglEnabled: boolean;
  onToggleWebGL: () => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const SpatialHeader: React.FC<SpatialHeaderProps> = ({
  currentSection,
  onNavigate,
  webglEnabled,
  onToggleWebGL,
  cartItems,
  onOpenCart,
  isAudioPlaying,
  onToggleAudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.calculatedPrice * item.quantity, 0);

  const navLinks = [
    { name: 'Lounge', index: 0 },
    { name: 'Craft Menu', index: 1 },
    { name: 'Brew Studio', index: 2 },
    { name: 'Terroir', index: 3 },
    { name: 'Private Vault', index: 4 }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 pointer-events-auto">
      <nav
        className="max-w-7xl mx-auto rounded-2xl spatial-glass px-5 py-3.5 flex items-center justify-between transition-all duration-300 shadow-spatial border border-[#dfb17b]/30"
        aria-label="Main Spatial Navigation"
      >
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate(0)}
          className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-[#dfb17b] rounded-lg p-1"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#f5cb98] via-[#dfb17b] to-[#b3844f] p-0.5 shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#060504] rounded-[10px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#dfb17b] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="text-left">
            <span className="font-cinzel text-2xl font-bold tracking-widest text-white gold-shimmer-text block leading-none">
              AURA
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#dfb17b] uppercase block mt-1">
              Private Roastery
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#0d0b09]/80 p-1.5 rounded-xl border border-[#dfb17b]/20">
          {navLinks.map((link) => {
            const isActive = currentSection === link.index;
            return (
              <button
                key={link.index}
                onClick={() => onNavigate(link.index)}
                className={`relative px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-[#060504] font-bold shadow-md'
                    : 'text-[#a39790] hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] rounded-lg -z-10 shadow-gold-glow" />
                )}
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Controls & Cart CTA */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Ambient Sound Toggle */}
          <button
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Mute Ambient Lounge Sound' : 'Play Ambient Lounge Sound'}
            className={`p-2.5 rounded-xl border transition-all duration-300 ${
              isAudioPlaying
                ? 'bg-[#dfb17b]/20 border-[#dfb17b] text-[#dfb17b] shadow-gold-glow'
                : 'bg-[#0d0b09]/80 border-[#dfb17b]/20 text-[#a39790] hover:text-white hover:border-[#dfb17b]/40'
            }`}
            aria-label="Toggle Ambient Sound"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* 3D WebGL / 2.5D Mode Toggle */}
          <button
            onClick={onToggleWebGL}
            title={webglEnabled ? 'Switch to 2.5D Spatial Depth Mode' : 'Enable Full 3D WebGL Mode'}
            className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-mono border transition-all duration-300 ${
              webglEnabled
                ? 'bg-[#dfb17b]/15 border-[#dfb17b]/50 text-[#dfb17b]'
                : 'bg-[#0d0b09]/80 border-white/10 text-[#a39790] hover:text-white'
            }`}
          >
            {webglEnabled ? <Sparkles className="w-3.5 h-3.5 text-[#dfb17b] animate-pulse" /> : <Layers className="w-3.5 h-3.5" />}
            <span>{webglEnabled ? '3D Canvas' : '2.5D Mode'}</span>
          </button>

          {/* Spatial Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2.5 bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] text-[#060504] font-bold px-4 py-2 rounded-xl shadow-gold-glow hover:brightness-110 active:scale-95 transition-all duration-300"
            aria-label={`Open Cart with ${totalCartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono text-sm hidden sm:inline-block">${totalCartPrice.toFixed(2)}</span>
            {totalCartCount > 0 && (
              <span className="w-5 h-5 bg-[#060504] text-[#dfb17b] font-mono text-xs rounded-full flex items-center justify-center font-bold border border-[#dfb17b]">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#0d0b09]/80 border border-[#dfb17b]/20 text-[#ece7e1]"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl spatial-glass p-5 border border-[#dfb17b]/30 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.index}
                onClick={() => {
                  onNavigate(link.index);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider transition-colors ${
                  currentSection === link.index
                    ? 'bg-[#dfb17b]/20 text-[#dfb17b] font-bold border border-[#dfb17b]/40'
                    : 'text-[#a39790] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#dfb17b]/20 flex items-center justify-between">
            <span className="text-xs font-mono text-[#a39790]">Render Mode</span>
            <button
              onClick={() => {
                onToggleWebGL();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#dfb17b]/15 border border-[#dfb17b]/40 text-[#dfb17b]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{webglEnabled ? '3D Canvas' : '2.5D Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

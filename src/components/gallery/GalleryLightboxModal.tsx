import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({ isOpen, onClose }) => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=1200',
      title: 'Espresso Bar Craftsmanship',
      subtitle: 'Slayer 3-group extraction in Jubilee Hills',
    },
    {
      src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=85&w=1200',
      title: 'Araku Geisha V60 Bloom',
      subtitle: 'Japanese Hario glassware & single-origin clarity',
    },
    {
      src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=85&w=1200',
      title: '72-Layer Croissant Lamination',
      subtitle: 'Freshly baked in morning batch #1',
    },
    {
      src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=85&w=1200',
      title: 'Vintage Marantz Vinyl Alcove',
      subtitle: 'Curated jazz and acoustic listening corner',
    },
    {
      src: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=85&w=1200',
      title: 'Smoked Cinnamon Cortado',
      subtitle: 'Microfoam velvet dusted with Ceylon spices',
    },
    {
      src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=85&w=1200',
      title: 'Truffled Hass Avocado Tartine',
      subtitle: 'Fermented country sourdough & poached farm egg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImg = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[99990] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Nav arrows */}
      <button
        onClick={prevImg}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer hidden sm:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextImg}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer hidden sm:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="max-w-5xl w-full flex flex-col items-center">
        <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-[#C68B59]/40">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].title}
            className="max-h-[75vh] w-auto object-contain rounded-2xl"
          />
        </div>

        <div className="mt-4 text-center">
          <h4 className="font-serif text-xl font-bold text-[#F5EDE0]">
            {images[currentIndex].title}
          </h4>
          <p className="text-xs text-[#DFB17B] mt-0.5">{images[currentIndex].subtitle}</p>
          <span className="text-[10px] text-[#F5EDE0]/40 font-mono mt-1 block">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
      </div>
    </div>
  );
};

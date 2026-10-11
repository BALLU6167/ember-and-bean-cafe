import React from 'react';
import { Image } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AboutStorySectionProps {
  onOpenGallery: () => void;
}

export const AboutStorySection: React.FC<AboutStorySectionProps> = ({ onOpenGallery }) => {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-24 bg-transparent text-[#F5EDE0] border-t border-[#C68B59]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Visual Story Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#C68B59]/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=85&w=1000"
                alt="Head Roaster cupping coffee beans at Ember & Bean"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140C08] via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlapping Floating Quote Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#251914] border border-[#DFB17B]/40 rounded-2xl p-5 shadow-2xl max-w-xs backdrop-blur-md">
              <p className="text-xs italic text-[#F5EDE0]/90">
                {t.storyQuote}
              </p>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFB17B] block mt-2">
                {t.storyQuoteAuthor}
              </span>
            </div>
          </div>

          {/* Right Column: Founder Copy & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold block">
              {t.storyOriginBadge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] tracking-tight leading-tight">
              {t.storyOriginTitle}
            </h2>
            <p className="text-sm text-[#F5EDE0]/80 leading-relaxed font-light">
              {t.storyOriginP1}
            </p>
            <p className="text-sm text-[#F5EDE0]/80 leading-relaxed font-light">
              {t.storyOriginP2}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenGallery}
                className="px-6 py-3 bg-[#2C1E18] hover:bg-[#3D2C22] text-[#DFB17B] border border-[#C68B59]/50 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Image className="w-4 h-4" /> {t.storyGalleryBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Milestones */}
        <div className="border-t border-[#C68B59]/20 pt-16">
          <span className="text-xs uppercase tracking-widest text-[#DFB17B] font-mono block text-center mb-8">
            {t.storyMilestonesHeader}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t.milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#1A110D] border border-[#C68B59]/30 rounded-2xl p-5 flex flex-col justify-between hover:border-[#DFB17B]/50 transition-colors"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-[#DFB17B] block mb-1">{m.year}</span>
                  <h4 className="font-serif font-bold text-base text-[#F5EDE0] mb-2">{m.title}</h4>
                  <p className="text-xs text-[#F5EDE0]/70 font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

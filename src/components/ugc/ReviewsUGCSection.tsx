import React, { useState } from 'react';
import { TESTIMONIALS, UGC_POSTS } from '../../data/cafeData';
import { UGCEntry } from '../../types/cafe';
import { 
  Star, 
  Heart, 
  Instagram, 
  MessageSquare, 
  Plus, 
  Upload, 
  X, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ReviewsUGCSection: React.FC = () => {
  const { t } = useLanguage();
  const [ugcList, setUgcList] = useState<UGCEntry[]>(UGC_POSTS);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Submission Form state
  const [userHandle, setUserHandle] = useState('');
  const [caption, setCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLike = (id: string) => {
    setUgcList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: UGCEntry = {
      id: `ugc-${Date.now()}`,
      username: userHandle.startsWith('@') ? userHandle : `@${userHandle}`,
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      image: photoUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
      caption: caption,
      likes: 1,
      timestamp: 'Just now',
    };
    setUgcList([newEntry, ...ugcList]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitModalOpen(false);
      setUserHandle('');
      setCaption('');
      setPhotoUrl('');
    }, 2000);
  };

  return (
    <section className="py-24 bg-transparent text-[#FAF6F0] border-t border-[#D49B6A]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Carousel Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-bold block mb-2">
              {t.reviewsBadge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6F0] tracking-tight">
              {t.reviewsTitle}
            </h2>
            <p className="mt-3 text-sm text-[#DDD3C4]/75 font-light">
              {t.reviewsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#160F0B] border border-[#D49B6A]/25 hover:border-[#D49B6A] rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Star Rating and Platform Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#D49B6A] bg-[#1A130E] px-2 py-0.5 rounded border border-[#D49B6A]/30">
                      {t.source}
                    </span>
                  </div>

                  <p className="text-xs text-[#DDD3C4]/85 italic leading-relaxed mb-6 font-light">
                    "{t.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#D49B6A]/15">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#D49B6A]/30"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#FAF6F0]">{t.name}</h4>
                    <span className="text-[11px] text-[#DDD3C4]/50 block">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live UGC Wall Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Instagram className="w-5 h-5 text-[#D49B6A]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-bold">
                Live Community UGC Wall
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6F0]">
              Moments Tagged #EmberAndBeanHyderabad
            </h3>
            <p className="text-xs text-[#DDD3C4]/75 mt-1 font-light">
              Tag us on Instagram or submit your slow coffee moment below to be featured on our digital wall.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D49B6A] to-[#B86F43] text-[#120D0A] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Submit Your Photo
          </button>
        </div>

        {/* UGC Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ugcList.map((post) => (
            <div
              key={post.id}
              className="bg-[#160F0B] border border-[#D49B6A]/25 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div className="relative aspect-square overflow-hidden bg-[#1A130E]">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160F0B] via-transparent to-transparent opacity-80" />

                <button
                  onClick={() => handleLike(post.id)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120D0A]/85 backdrop-blur-md text-xs font-bold text-[#D49B6A] border border-[#D49B6A]/25 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{post.likes}</span>
                </button>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    className="w-6 h-6 rounded-full object-cover border border-[#D49B6A]/30"
                  />
                  <span className="font-semibold text-xs text-[#D49B6A]">{post.username}</span>
                  <span className="text-[10px] text-[#DDD3C4]/40 ml-auto">{post.timestamp}</span>
                </div>
                <p className="text-xs text-[#DDD3C4]/80 font-light line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UGC Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-[99980] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-md w-full bg-[#1A130E] border-2 border-[#D49B6A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#FAF6F0]">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#DDD3C4]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#FAF6F0] mb-1">
                  Share Your Café Moment
                </h3>
                <p className="text-xs text-[#DDD3C4]/70 mb-6">
                  Add your snapshot to our Jubilee Hills digital archive.
                </p>

                <form onSubmit={handleUserSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#FAF6F0] block mb-1">Your Instagram / Handle</label>
                    <input
                      type="text"
                      required
                      value={userHandle}
                      onChange={(e) => setUserHandle(e.target.value)}
                      placeholder="@yourname"
                      className="w-full bg-[#120D0A] border border-[#D49B6A]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#FAF6F0] block mb-1">Photo URL (or Unsplash link)</label>
                    <input
                      type="url"
                      required
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#120D0A] border border-[#D49B6A]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#FAF6F0] block mb-1">Caption / Ritual Note</label>
                    <textarea
                      rows={3}
                      required
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="What were you sipping? What made the moment special?"
                      className="w-full bg-[#120D0A] border border-[#D49B6A]/30 rounded-xl p-3 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#D49B6A] to-[#B86F43] text-[#120D0A] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    <Upload className="w-4 h-4" /> Publish Moment to Wall
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-14 h-14 text-[#D49B6A] mx-auto mb-3 animate-bounce" />
                <h4 className="font-serif text-2xl font-bold text-[#FAF6F0] mb-2">Moment Published</h4>
                <p className="text-xs text-[#DDD3C4]/70">Thank you for contributing to the Ember & Bean community archive!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

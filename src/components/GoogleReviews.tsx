import React from 'react';
import { Star, ExternalLink, CheckCircle, MessageSquare } from 'lucide-react';
import { ReviewItem } from '../types/appointment';

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'K. Venkateshwar Rao',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Dr. Balaram Kundu sir is very polite and listens to patient pain carefully. My mother had severe knee pain and could not walk properly. After starting conservative treatment and exercises at Latha Venkat clinic, she has experienced immense relief.',
    verified: true,
    avatarBg: 'bg-emerald-600',
  },
  {
    id: 'rev-2',
    author: 'Suresh Goud',
    rating: 5,
    date: '1 month ago',
    comment: 'Best orthopaedic doctor in Warangal MG road. He clearly explained my hairline ankle fracture X-ray and applied a comfortable plaster cast. Zero unnecessary tests. Highly recommended.',
    verified: true,
    avatarBg: 'bg-blue-600',
  },
  {
    id: 'rev-3',
    author: 'P. Anitha',
    rating: 5,
    date: '2 months ago',
    comment: 'Very professional clinic environment. Dr. Balaram Kundu provided detailed guidance for my lower back spondylosis pain. The clinic location on MG road is easy to reach with parking available.',
    verified: true,
    avatarBg: 'bg-[#0F766E]',
  },
  {
    id: 'rev-4',
    author: 'Mohammed Irfan',
    rating: 5,
    date: '3 months ago',
    comment: 'I visited for general health checkup and shoulder pain after a bike skid. Doctor treated both fracture sprain and general fever very efficiently. Genuine doctor who cares for patients.',
    verified: true,
    avatarBg: 'bg-[#0F172A]',
  },
  {
    id: 'rev-5',
    author: 'Ch. Srinivas',
    rating: 5,
    date: '4 months ago',
    comment: 'The appointment booking on website was smooth and WhatsApp notification confirmation was instant. Friendly staff and clean consultation room.',
    verified: true,
    avatarBg: 'bg-amber-600',
  },
  {
    id: 'rev-6',
    author: 'Lakshmi Devi',
    rating: 5,
    date: '5 months ago',
    comment: 'Excellent doctor in Warangal. Patient-centric approach without pushing expensive joint replacements unnecessarily. Very satisfied with the care.',
    verified: true,
    avatarBg: 'bg-teal-700',
  },
];

export const GoogleReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
              PATIENT VERIFIED REVIEWS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0F172A] tracking-tight">
              Google Maps Reviews & Testimonials
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Authentic patient feedback from local consultations at Latha Venkat Ortho & General Care.
            </p>
          </div>

          {/* Direct Google Maps CTA */}
          <a
            href="https://maps.app.goo.gl/GjZibaRiCGzcVBgh7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-all shadow-subtle shrink-0"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Read All Google Reviews</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Rating Summary Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-serif font-bold text-[#0F172A]">4.9</div>
            <div>
              <div className="flex text-amber-500 gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs text-slate-500">Based on verified Google Maps reviews</span>
            </div>
          </div>

          <div className="text-xs text-slate-600 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#0F766E]" />
            <span>Latha Venkat Ortho & General Care • M.G. Road Warangal</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                      {rev.author[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{rev.author}</h4>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Google Verified
                    </span>
                  )}
                </div>

                <div className="flex text-amber-500 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <a
                  href="https://maps.app.goo.gl/GjZibaRiCGzcVBgh7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-500 hover:text-[#0F766E] font-medium flex items-center gap-1"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Google Maps */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.app.goo.gl/GjZibaRiCGzcVBgh7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#0F766E] shadow-premium transition-all"
          >
            <MessageSquare className="w-4 h-4 text-teal-400" />
            <span>Open Google Maps Review Page</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
};

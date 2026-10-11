import React from 'react';
import { BookOpen, ShieldAlert, ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  category: string;
  readTime: string;
  summary: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Understanding Joint Preservation: How to Delay Osteoarthritis Progress',
    category: 'Orthopaedic Care',
    readTime: '4 min read',
    summary: 'Key non-surgical strategies, muscle strengthening protocols, and daily joint ergonomics to protect knee cartilage.',
  },
  {
    title: 'First Aid & Immediate Care Before Reaching the Clinic for Suspected Fractures',
    category: 'Trauma & Injury',
    readTime: '3 min read',
    summary: 'Step-by-step guidance on immobilizing sprains or bone injuries safely during transit to the doctor.',
  },
  {
    title: 'Ergonomic Principles for Preventing Lumbar Strain During Long Sitting Hours',
    category: 'Spine Health',
    readTime: '5 min read',
    summary: 'Practical seating postures, lumbar support adjustments, and simple back stretches for desk workers.',
  },
];

export const KnowledgeHub: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
            PATIENT EDUCATION HUB
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0F172A] tracking-tight">
            Doctor's Knowledge Base
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Reviewed medical information written to help patients make informed decisions about joint mobility and recovery.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] p-7 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 shadow-subtle group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-[#0F766E] uppercase tracking-wider">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#0F172A] group-hover:text-[#0F766E] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>Read Guidance</span>
                <ArrowRight className="w-4 h-4 text-[#0F766E] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Medical Disclaimer:</strong> Educational articles are intended for general health awareness and should not replace an in-person consultation or formal medical diagnosis by Dr. Balaram Kundu.
          </p>
        </div>

      </div>
    </section>
  );
};

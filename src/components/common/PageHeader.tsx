import React from 'react';
import { ArrowLeft, Sparkles, Home } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  onBackToHome: () => void;
  breadcrumbs: string[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  onBackToHome,
  breadcrumbs,
}) => {
  return (
    <div className="pt-32 pb-12 bg-transparent border-b border-[#D49B6A]/20 relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D49B6A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs & Back to Home */}
        <div className="flex items-center gap-3 text-xs mb-6 text-[#DDD3C4]/60">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-[#D49B6A] hover:text-[#FAF6F0] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Home</span>
          </button>
          <span>/</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className={idx === breadcrumbs.length - 1 ? 'text-[#FAF6F0] font-semibold' : ''}>
                {crumb}
              </span>
              {idx < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Badge & Title */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-mono px-3 py-1 rounded-full bg-[#221610] border border-[#D49B6A]/35 mb-3">
            <Sparkles className="w-3 h-3 text-[#D49B6A]" /> {badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#FAF6F0] tracking-tight leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#DDD3C4]/80 font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

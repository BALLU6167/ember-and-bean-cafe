import React from 'react';
import {
  GraduationCap,
  Cpu,
  Briefcase,
  Sparkles,
  Zap,
  TrendingUp,
  Compass,
  Heart,
  Trophy,
  BookOpen,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import { CategoryMeta } from '../types/category';

interface CategoryCardProps {
  category: CategoryMeta;
  onClick: (categoryName: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap,
  Cpu,
  Briefcase,
  Sparkles,
  Zap,
  TrendingUp,
  Compass,
  Heart,
  Trophy,
  BookOpen,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const IconComponent = ICON_MAP[category.iconName] || FolderOpen;

  return (
    <div
      onClick={() => onClick(category.name)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/80 shadow-card hover:shadow-elevated hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Glow highlight on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/15 transition-all duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 ${category.accentBg}`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
            {category.resourceCount} {category.resourceCount === 1 ? 'guide' : 'guides'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
          {category.name}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
        <span className="text-slate-400 dark:text-slate-500 font-normal">Explore Category</span>
        <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

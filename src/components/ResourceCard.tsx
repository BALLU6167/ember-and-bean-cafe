import React from 'react';
import { Bookmark, ExternalLink, ArrowRight, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { Resource } from '../types/resource';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface ResourceCardProps {
  resource: Resource;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectResource: (resource: Resource) => void;
  onCategoryClick?: (category: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isBookmarked,
  onToggleBookmark,
  onSelectResource,
  onCategoryClick,
}) => {
  const categoryMeta = CATEGORIES_DATA.find((c) => c.id === resource.category);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl p-5 md:p-6 bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/80 shadow-card hover:shadow-elevated hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300">
      {/* Top Header: Category & Save Bookmark */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            onClick={() => onCategoryClick && onCategoryClick(resource.category)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
              categoryMeta?.accentBg || 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
            }`}
          >
            <span>{resource.category}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(resource.id);
            }}
            aria-label={isBookmarked ? 'Remove from saved' : 'Save resource'}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked
                ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Saved to Bookmarks' : 'Save for later'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelectResource(resource)}
          className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors line-clamp-2 mb-2"
        >
          {resource.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed font-normal">
          {resource.shortDescription}
        </p>
      </div>

      {/* Footer Section */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-2">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60"
            >
              #{tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 px-1 py-0.5">
              +{resource.tags.length - 3}
            </span>
          )}
        </div>

        {/* Source & Actions */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
            <span className="truncate font-medium">{resource.source.name}</span>
            {resource.source.verified && (
              <span title="Verified Source">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[11px]">
              <Clock className="w-3 h-3" />
              {resource.readingTimeMinutes}m
            </span>

            <button
              onClick={() => onSelectResource(resource)}
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <span>Read More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

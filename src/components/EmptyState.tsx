import React from 'react';
import { SearchX, ArrowRight, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  suggestedQueries?: string[];
  onSelectQuery?: (query: string) => void;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "We couldn't find exactly what you're looking for.",
  description = "Try searching with broader keywords, clearing filters, or exploring suggested topics below.",
  suggestedQueries = ['Java', 'Scholarships', 'AI Tools', 'WebDev', 'Productivity', 'Remote Work'],
  onSelectQuery,
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 my-6">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 max-w-md">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mb-6 leading-relaxed">
        {description}
      </p>

      {suggestedQueries && suggestedQueries.length > 0 && (
        <div className="w-full max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Suggested Searches
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {suggestedQueries.map((term) => (
              <button
                key={term}
                onClick={() => onSelectQuery && onSelectQuery(term)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <span>{term}</span>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      )}

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
};

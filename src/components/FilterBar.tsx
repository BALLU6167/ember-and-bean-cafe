import React from 'react';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { ResourceCategory, SortOption } from '../types/resource';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface FilterBarProps {
  selectedCategory: ResourceCategory | 'All';
  onSelectCategory: (category: ResourceCategory | 'All') => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  selectedTag?: string;
  onSelectTag?: (tag?: string) => void;
  activeCount: number;
  onReset: () => void;
}

const CATEGORIES_LIST: (ResourceCategory | 'All')[] = [
  'All',
  'Education',
  'Technology',
  'Career',
  'AI Tools',
  'Productivity',
  'Finance',
  'Health & Wellness',
  'Travel',
  'Opportunities',
  'General Knowledge',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  selectedTag,
  onSelectTag,
  activeCount,
  onReset,
}) => {
  const isFiltered = selectedCategory !== 'All' || !!selectedTag || selectedSort !== 'relevance';

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Category Pills Slider / Flex */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Second Row: Sort selector & Active filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-900 dark:text-white">{activeCount}</strong> resources
          </span>

          {selectedTag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              #{selectedTag}
              <button
                onClick={() => onSelectTag && onSelectTag(undefined)}
                className="hover:text-indigo-900 dark:hover:text-white ml-0.5"
                aria-label="Remove tag filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {isFiltered && (
            <button
              onClick={onReset}
              className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 font-medium underline ml-1 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 dark:text-slate-400">Sort by:</span>
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as SortOption)}
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs cursor-pointer"
          >
            <option value="relevance">Relevance</option>
            <option value="popular">Most Popular</option>
            <option value="latest">Latest First</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

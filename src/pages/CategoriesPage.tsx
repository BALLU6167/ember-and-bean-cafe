import React, { useState } from 'react';
import { CategoryCard } from '../components/CategoryCard';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { Search, Layers } from 'lucide-react';
import { ResourceCategory } from '../types/resource';

interface CategoriesPageProps {
  onSelectCategory: (category: ResourceCategory) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectCategory }) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = CATEGORIES_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.popularTags.some((t) => t.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Ontologies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Browse by Knowledge Domain
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Every category contains verified, high-signal information carefully structured to help you decide faster.
        </p>

        {/* Quick in-page search */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="absolute left-3.5 top-5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter categories or tags (e.g. AI, Career)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => onSelectCategory(category.name as ResourceCategory)}
          />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No categories found matching "{filterQuery}".
        </div>
      )}
    </div>
  );
};

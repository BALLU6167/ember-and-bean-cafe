import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { ResourceCard } from '../components/ResourceCard';
import { EmptyState } from '../components/EmptyState';
import { Resource, ResourceCategory, SortOption } from '../types/resource';
import { searchService, SearchResult } from '../services/searchService';
import { Sparkles, SlidersHorizontal, Tag } from 'lucide-react';

interface ExplorePageProps {
  initialQuery?: string;
  initialCategory?: ResourceCategory | 'All';
  onSelectResource: (resource: Resource) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  initialQuery = '',
  initialCategory = 'All',
  onSelectResource,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ResourceCategory | 'All'>(initialCategory);
  const [sort, setSort] = useState<SortOption>('relevance');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [searchResult, setSearchResult] = useState<SearchResult>(() =>
    searchService.search({ query: initialQuery, category: initialCategory })
  );

  // Sync state if parent passes new initial props
  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (initialCategory !== category) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  // Perform search whenever criteria changes
  useEffect(() => {
    const result = searchService.search({
      query,
      category,
      tag: selectedTag,
      sort,
    });
    setSearchResult(result);
  }, [query, category, selectedTag, sort]);

  const handleResetFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('relevance');
    setSelectedTag(undefined);
  };

  const allTags = searchService.getAllUniqueTags().slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header & Search */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore Curated Knowledge
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Find trustworthy, synthesized resources across 10 vital domains without searching a dozen platforms.
        </p>

        <div className="pt-2">
          <SearchBar
            initialValue={query}
            onSearch={(q) => setQuery(q)}
            placeholder="Search guides, topics, frameworks, scholarships..."
            variant="compact"
            showSuggestions={false}
          />
        </div>
      </div>

      {/* Popular Tag Pills for Instant Filtering */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none no-scrollbar">
        <span className="flex items-center gap-1 text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
          <Tag className="w-3 h-3" /> Quick Tags:
        </span>
        {allTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(isSelected ? undefined : tag)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>

      {/* Filters & Sorting Bar */}
      <FilterBar
        selectedCategory={category}
        onSelectCategory={(cat) => setCategory(cat)}
        selectedSort={sort}
        onSelectSort={(s) => setSort(s)}
        selectedTag={selectedTag}
        onSelectTag={(t) => setSelectedTag(t)}
        activeCount={searchResult.total}
        onReset={handleResetFilters}
      />

      {/* Active Search Query Feedback */}
      {query.trim().length > 0 && (
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Results for <span className="font-bold text-slate-900 dark:text-white">"{query}"</span>:
        </div>
      )}

      {/* Results Grid or Empty State */}
      {searchResult.resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResult.resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isBookmarked={isBookmarked(resource.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectResource={onSelectResource}
              onCategoryClick={(cat) => setCategory(cat as ResourceCategory)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="We couldn't find exactly what you're looking for."
          description={`No guides matched "${query || category}". Try searching with broader terms or exploring recommended topics below.`}
          suggestedQueries={searchResult.suggestedTerms}
          onSelectQuery={(term) => {
            setQuery(term);
            setCategory('All');
            setSelectedTag(undefined);
          }}
          onReset={handleResetFilters}
        />
      )}
    </div>
  );
};

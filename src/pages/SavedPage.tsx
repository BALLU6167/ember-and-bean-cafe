import React, { useState, useMemo } from 'react';
import { Bookmark, Search, Trash2, Download, ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { Resource, ResourceCategory } from '../types/resource';
import { ResourceCard } from '../components/ResourceCard';
import { MOCK_RESOURCES } from '../data/mockResources';

interface SavedPageProps {
  savedIds: string[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onSelectResource: (resource: Resource) => void;
  onNavigateExplore: () => void;
  onNotify: (msg: string) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  savedIds,
  onRemoveBookmark,
  onClearAll,
  onSelectResource,
  onNavigateExplore,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Resolve saved resources from IDs
  const savedResources = useMemo(() => {
    return MOCK_RESOURCES.filter((res) => savedIds.includes(res.id));
  }, [savedIds]);

  // Categories present in saved items
  const availableCategories = useMemo(() => {
    const cats = new Set(savedResources.map((r) => r.category));
    return ['All', ...Array.from(cats)];
  }, [savedResources]);

  // Filtered saved resources
  const filteredResources = useMemo(() => {
    return savedResources.filter((res) => {
      const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q.length === 0 ||
        res.title.toLowerCase().includes(q) ||
        res.shortDescription.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [savedResources, selectedCategory, searchQuery]);

  // Export saved resources as Markdown or JSON
  const handleExportMarkdown = () => {
    if (savedResources.length === 0) return;
    const md = `# My Saved INFURIZZ Resources\nExported on ${new Date().toLocaleDateString()}\n\n` +
      savedResources
        .map(
          (r, i) =>
            `## ${i + 1}. [${r.title}](${r.source.url})\n- **Category**: ${r.category}\n- **Source**: ${r.source.name}\n- **Summary**: ${r.shortDescription}\n- **Takeaways**:\n${r.keyTakeaways.map((t) => `  - ${t}`).join('\n')}\n`
        )
        .join('\n---\n\n');

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `infurizz-saved-resources-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    onNotify('Exported saved bookmarks as Markdown!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-2">
            <Bookmark className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400" />
            <span>Personal Knowledge Vault</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Saved Information ({savedResources.length})
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            All your bookmarked guides, scholarship links, and technical blueprints saved locally in your browser.
          </p>
        </div>

        {savedResources.length > 0 && (
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export as Markdown</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all saved bookmarks?')) {
                  onClearAll();
                  onNotify('All bookmarks cleared.');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {savedResources.length > 0 ? (
        <div className="space-y-6">
          {/* Controls: In-Page Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved resources..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isBookmarked={true}
                  onToggleBookmark={(id) => {
                    onRemoveBookmark(id);
                    onNotify('Removed from saved bookmarks');
                  }}
                  onSelectResource={onSelectResource}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500">
              No saved items matched your filter "{searchQuery || selectedCategory}".
            </div>
          )}
        </div>
      ) : (
        /* Empty Saved State */
        <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No saved resources yet
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            As you discover guides, scholarships, or frameworks across INFURIZZ, click the bookmark icon on any card to save them here for offline access.
          </p>
          <button
            onClick={onNavigateExplore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
          >
            <span>Explore Curated Resources</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

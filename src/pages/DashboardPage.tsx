import React from 'react';
import {
  LayoutGrid,
  Bookmark,
  Compass,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  FolderOpen,
} from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { ResourceCard } from '../components/ResourceCard';
import { Resource } from '../types/resource';
import { MOCK_RESOURCES } from '../data/mockResources';
import { recommendationService } from '../services/recommendationService';
import { UserProfile } from '../types/user';

interface DashboardPageProps {
  user: UserProfile | null;
  savedIds: string[];
  recentlyViewedIds: string[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  onSelectResource: (resource: Resource) => void;
  onNavigateExplore: (query?: string) => void;
  onNavigateAI: () => void;
  onOpenAuth: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  savedIds,
  recentlyViewedIds,
  isBookmarked,
  onToggleBookmark,
  onSelectResource,
  onNavigateExplore,
  onNavigateAI,
  onOpenAuth,
}) => {
  // Compute recent resources
  const recentResources = MOCK_RESOURCES.filter((r) =>
    recentlyViewedIds.includes(r.id)
  ).slice(0, 3);

  // Compute recommended resources
  const recommendedResources = recommendationService.getPersonalized(
    savedIds,
    recentlyViewedIds,
    3
  );

  // Saved resources slice
  const savedResources = MOCK_RESOURCES.filter((r) => savedIds.includes(r.id)).slice(0, 3);

  const popularSearches = [
    'Java virtual threads',
    'Stanford open courseware',
    'Student scholarships 2026',
    'Ollama local models',
    'System design interview',
    'Digital nomad visas',
    'Second brain PARA',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        <div className="relative space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Overview & Activity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user ? user.name : 'Explorer'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Here is your synthesized summary of saved intelligence, recently explored guides, and personalized next steps.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateAI}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open INFURIZZ AI</span>
          </button>
          {!user && (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Useful Metrics Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          label="Resources Saved"
          value={savedIds.length}
          subtext="Bookmarked for reference"
          icon={Bookmark}
          trend="+2 this week"
        />
        <StatsCard
          label="Topics Explored"
          value={recentlyViewedIds.length + 5}
          subtext="Across 6 domains"
          icon={Compass}
          trend="Top: Technology"
        />
        <StatsCard
          label="Searches Performed"
          value={18}
          subtext="High-signal queries"
          icon={Search}
          trend="Active"
        />
        <StatsCard
          label="Reading Minutes"
          value="42 min"
          subtext="Synthesized learning"
          icon={Clock}
          trend="92% retention"
        />
      </div>

      {/* Recommended For You Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Personalized Discovery
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Recommended For You
            </h2>
          </div>
          <button
            onClick={() => onNavigateExplore()}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              isBookmarked={isBookmarked(res.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectResource={onSelectResource}
            />
          ))}
        </div>
      </div>

      {/* Recently Viewed Section */}
      {recentResources.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                History
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Recently Viewed
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentResources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                isBookmarked={isBookmarked(res.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectResource={onSelectResource}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Searches & Quick Trends */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-500" />
          Popular Searches Across the Platform
        </h3>

        <div className="flex flex-wrap gap-2">
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => onNavigateExplore(term)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/60 transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

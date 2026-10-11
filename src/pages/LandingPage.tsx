import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  Compass,
  Zap,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Filter,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ResourceCard } from '../components/ResourceCard';
import { CategoryCard } from '../components/CategoryCard';
import { Resource } from '../types/resource';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface LandingPageProps {
  onSearch: (query: string) => void;
  onNavigate: (route: string) => void;
  featuredResources: Resource[];
  trendingResources: Resource[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  onSelectResource: (resource: Resource) => void;
  onOpenAuth: (tab?: 'signin' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSearch,
  onNavigate,
  featuredResources,
  trendingResources,
  isBookmarked,
  onToggleBookmark,
  onSelectResource,
  onOpenAuth,
}) => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Search',
      description: 'Enter any topic, question, or goal without worrying about finding the perfect website or exact keywords.',
      icon: Search,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      step: '02',
      title: 'Discover',
      description: 'Access vetted, high-signal information organized into bite-sized cards with verified original sources.',
      icon: Compass,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      step: '03',
      title: 'Understand',
      description: 'Leverage INFURIZZ AI to simplify dense jargon, generate key takeaways, and extract critical insights in seconds.',
      icon: BrainCircuit,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      step: '04',
      title: 'Decide',
      description: 'Turn scattered options into concrete choices with comparative matrices and pragmatic next steps.',
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="space-y-20 md:space-y-28 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-10 md:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>The Unified Information Discovery Platform</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          All the information you need.{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            In one place.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          INFURIZZ helps you discover, understand, organize, and use useful information without jumping between countless websites and apps.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-elevated shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-95"
          >
            <span>Explore Information</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-card transition-all duration-200"
          >
            <span>Get Started Free</span>
          </button>
        </div>

        {/* Central Search Interface */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="mb-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pl-1">
              What are you looking for?
            </span>
          </div>
          <SearchBar
            onSearch={(query) => {
              onSearch(query);
              onNavigate('explore');
            }}
            placeholder="What are you looking for? (e.g. Java, Scholarships, AI Tools)"
            variant="hero"
            showSuggestions={true}
          />
        </div>

        {/* Proof/Metrics Ticker */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">500+</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Curated Guides</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">10</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core Verticals</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Sources</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">0s</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Zero Tab Overload</p>
          </div>
        </div>
      </section>

      {/* CONCEPT WORKFLOW: Search → Discover → Understand → Decide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            How INFURIZZ Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            Search → Discover → Understand → Decide
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Information discovery shouldn't feel like drowning in 40 browser tabs. Here is how INFURIZZ streamlines your decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/80 shadow-card hover:border-indigo-500/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.bg}`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-2xl font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Phase {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED / TRENDING INFORMATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending & High Signal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Discoveries
            </h2>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.slice(0, 6).map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isBookmarked={isBookmarked(resource.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectResource={onSelectResource}
              onCategoryClick={(cat) => {
                onSearch('');
                onNavigate('explore');
              }}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Structured Knowledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Browse by Category
            </h2>
          </div>

          <button
            onClick={() => onNavigate('categories')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>All 10 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES_DATA.slice(0, 8).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={(name) => {
                onSearch('');
                onNavigate('explore');
              }}
            />
          ))}
        </div>
      </section>

      {/* INFURIZZ AI ASSISTANT TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-indigo-900/90 via-slate-900 to-indigo-950 text-white border border-indigo-500/30 shadow-elevated">
          {/* Subtle glow background */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Next-Gen Understanding</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Meet INFURIZZ AI: Your Personal Synthesis Copilot
            </h2>

            <p className="text-sm sm:text-base text-indigo-100/80 leading-relaxed">
              Don't have 40 minutes to decipher complicated documentation or scholarship criteria? Ask INFURIZZ AI to simplify, compare choices, or extract instant action points.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('ai')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white text-indigo-950 hover:bg-indigo-50 shadow-md transition-all active:scale-95"
              >
                <span>Launch INFURIZZ AI</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-400/30 text-indigo-200 transition-colors"
              >
                <span>Learn How It Works</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

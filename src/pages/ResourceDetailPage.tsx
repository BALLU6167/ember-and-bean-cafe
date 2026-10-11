import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  ExternalLink,
  Sparkles,
  Clock,
  CheckCircle2,
  TrendingUp,
  Tag,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';
import { Resource } from '../types/resource';
import { ResourceCard } from '../components/ResourceCard';
import { recommendationService } from '../services/recommendationService';
import { formatDate } from '../utils/formatters';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface ResourceDetailPageProps {
  resource: Resource;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectRelated: (resource: Resource) => void;
  onAskAI: (resource: Resource) => void;
  onNotify: (msg: string) => void;
}

export const ResourceDetailPage: React.FC<ResourceDetailPageProps> = ({
  resource,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated,
  onAskAI,
  onNotify,
}) => {
  const [copied, setCopied] = useState(false);
  const related = recommendationService.getRelated(resource.id, 3);
  const categoryMeta = CATEGORIES_DATA.find((c) => c.id === resource.category);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    onNotify('Resource link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs transition-colors"
            title="Share Resource"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => {
              onToggleBookmark(resource.id);
              onNotify(isBookmarked ? 'Removed from bookmarks' : 'Saved to bookmarks!');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isBookmarked
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Save for Later'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span
            className={`px-3 py-1 rounded-full font-bold border ${
              categoryMeta?.accentBg || 'bg-indigo-50 text-indigo-600 border-indigo-200'
            }`}
          >
            {resource.category}
          </span>

          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {resource.readingTimeMinutes} min read
          </span>

          <span className="text-slate-300 dark:text-slate-700">•</span>

          <span className="text-slate-500 dark:text-slate-400">
            Published {formatDate(resource.publishedDate)}
          </span>

          <span className="text-slate-300 dark:text-slate-700">•</span>

          <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            {resource.popularityScore}% Signal
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {resource.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {resource.shortDescription}
        </p>

        {/* Source Attribution Box */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              🌐
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500">Curated from: </span>
              <strong className="text-slate-800 dark:text-slate-200">{resource.source.name}</strong>
              {resource.source.verified && (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold ml-2">
                  <CheckCircle2 className="w-3 h-3" /> Verified Origin
                </span>
              )}
            </div>
          </div>

          <a
            href={resource.source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <span>Original Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* AI Assistant Quick Callout Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-indigo-950/40 to-slate-900/40 border border-indigo-500/30 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Need a quick breakdown?</h4>
            <p className="text-xs text-indigo-200/80">
              Ask INFURIZZ AI to simplify this guide, compare it to alternatives, or extract key action items.
            </p>
          </div>
        </div>

        <button
          onClick={() => onAskAI(resource)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-indigo-950 hover:bg-indigo-50 shrink-0 shadow-sm transition-transform active:scale-95"
        >
          <span>Ask INFURIZZ AI</span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        </button>
      </div>

      {/* Key Takeaways Section */}
      <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/60 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Key Points & Takeaways
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {resource.keyTakeaways.map((point, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Full Content (Clean Reading Layout) */}
      <div className="space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
          Detailed Guide & Architecture
        </h2>

        <div className="prose dark:prose-invert max-w-none text-sm md:text-base space-y-4">
          {resource.fullContent.split('\n\n').map((block, idx) => {
            if (block.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">
                  {block.replace('### ', '')}
                </h3>
              );
            }
            if (block.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1.5 my-2">
                  {block.split('\n').map((line, liIdx) => (
                    <li key={liIdx}>{line.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(block)) {
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-2 my-2">
                  {block.split('\n').map((line, liIdx) => (
                    <li key={liIdx}>{line.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">
                {block}
              </p>
            );
          })}
        </div>
      </div>

      {/* Tags Section */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          Tags & Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Resources */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Related Guides & Resources
            </h3>
            <span className="text-xs text-slate-500">Based on category & tags</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ResourceCard
                key={rel.id}
                resource={rel}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
                onSelectResource={onSelectRelated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

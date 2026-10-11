import React from 'react';
import { AIChat } from '../components/AIChat';
import { Resource } from '../types/resource';
import { Sparkles, Bot, Zap, Compass, CheckCircle2 } from 'lucide-react';

interface AIAssistantPageProps {
  contextResource?: Resource;
  onClearContext?: () => void;
  onOpenResource?: (resourceId: string) => void;
  onNotify: (msg: string) => void;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({
  contextResource,
  onClearContext,
  onOpenResource,
  onNotify,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cognitive Information Copilot</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          INFURIZZ AI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Understand complicated topics faster. Generate simplified explanations, side-by-side comparisons, and decision frameworks.
        </p>
      </div>

      {/* Feature Capabilities Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Simplify Jargon</h4>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Converts complex computer science, legal, or finance terms into clear analogies.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Compare Trade-offs</h4>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Evaluates frameworks, tools, or strategies in structured side-by-side matrices.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Decide with Confidence</h4>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Turns endless possibilities into a 14-day tangible action plan.
            </p>
          </div>
        </div>
      </div>

      {/* Main AI Chat Interface */}
      <AIChat
        contextResource={contextResource}
        onClearContext={onClearContext}
        onOpenResource={onOpenResource}
        onNotify={onNotify}
      />
    </div>
  );
};

import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Rocket,
  Compass,
  Search,
  BrainCircuit,
  ChevronDown,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';

interface AboutPageProps {
  onNavigateExplore: () => void;
  onNavigateAI: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateExplore,
  onNavigateAI,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const futureVisionItems = [
    {
      title: 'AI-Powered Discovery',
      description: 'Autonomous agents continuously indexing and verifying emerging documentation, research papers, and scholarships.',
      icon: Sparkles,
    },
    {
      title: 'Personalized Recommendations',
      description: 'Semantic affinity graphs that adapt to your exact learning goals without intrusive tracking or ad networks.',
      icon: Compass,
    },
    {
      title: 'Reliable Source Evaluation',
      description: 'Cryptographic provenance verification and peer consensus scoring to eliminate SEO spam and content mills.',
      icon: ShieldCheck,
    },
    {
      title: 'Smart Interactive Summaries',
      description: 'Dynamic interactive widgets, checklists, and code sandboxes embedded right inside every discovery card.',
      icon: Zap,
    },
    {
      title: 'Cross-Platform Aggregation',
      description: 'Sync bookmarks and reading queues seamlessly across browser extensions, mobile apps, and CLI terminals.',
      icon: Layers,
    },
    {
      title: 'Personalized Knowledge Systems',
      description: 'Export structured knowledge directly into your Obsidian, Notion, or personal Second Brain vault in one click.',
      icon: BrainCircuit,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16">
      {/* Hero Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Information shouldn't be complicated.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          We built INFURIZZ to fix the broken internet experience: endless browser tabs, clickbait blogs, paywalled summaries, and search noise.
        </p>
      </div>

      {/* The Problem vs The Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Problem */}
        <div className="p-8 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            The Problem: Information Fragmentation
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Useful information is scattered across hundreds of disparate websites, forums, YouTube videos, PDF documentation, and social feeds. Finding trustworthy and relevant information takes hours of tedious manual synthesis.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>Dozens of open browser tabs leading to cognitive fatigue</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>SEO-stuffed articles hiding the 2 critical sentences you need</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>Outdated tutorials resulting in breaking bugs and frustration</span>
            </li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="p-8 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            The INFURIZZ Solution: One Unified Hub
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            INFURIZZ organizes useful information into a single accessible platform and helps users understand it quickly. Every resource is curated for high signal, structured with key takeaways, and backed by verifiable source links.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>Unified discovery across 10 vital life and career verticals</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>INFURIZZ AI assistant to simplify and compare options</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>Instant bookmarking and clean Markdown/JSON exporting</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How It Works Workflow Review */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            The 4-Step Knowledge Cycle
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Engineered to guide you from initial curiosity to decisive action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-indigo-600 dark:text-indigo-400 font-extrabold text-lg mb-1">1. Search</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Natural language or keyword query across all knowledge domains.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-indigo-600 dark:text-indigo-400 font-extrabold text-lg mb-1">2. Discover</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Curated, high-signal cards with verified origins and key takeaways.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-indigo-600 dark:text-indigo-400 font-extrabold text-lg mb-1">3. Understand</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">INFURIZZ AI simplifies technical jargon and generates comparisons.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-indigo-600 dark:text-indigo-400 font-extrabold text-lg mb-1">4. Decide</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Clear next steps and tangible frameworks ready for immediate execution.</p>
          </div>
        </div>
      </div>

      {/* Future Vision */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <Rocket className="w-3.5 h-3.5" />
            <span>Future Roadmap</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Where INFURIZZ Is Headed
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Our vision is to build the definitive cognitive operating system for human learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureVisionItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about the INFURIZZ platform and roadmap.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="text-center p-10 rounded-3xl bg-indigo-600 text-white space-y-4 shadow-elevated">
        <h3 className="text-2xl sm:text-3xl font-black">
          Ready to discover better information?
        </h3>
        <p className="text-sm text-indigo-100 max-w-lg mx-auto">
          Start exploring our collection of curated guides or chat with INFURIZZ AI today.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onNavigateExplore}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-white text-indigo-600 hover:bg-indigo-50 shadow-md transition-all active:scale-95"
          >
            Explore All Resources
          </button>
          <button
            onClick={onNavigateAI}
            className="px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-700 hover:bg-indigo-800 text-white border border-indigo-500/50 transition-colors"
          >
            Launch INFURIZZ AI
          </button>
        </div>
      </div>
    </div>
  );
};

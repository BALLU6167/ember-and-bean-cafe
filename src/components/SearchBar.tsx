import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Mic, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  variant?: 'hero' | 'compact';
  showSuggestions?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
  autoFocus?: boolean;
}

const DEFAULT_SUGGESTIONS = [
  'scholarships',
  'coding resources',
  'college opportunities',
  'productivity tools',
  'career paths',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  onSearch,
  placeholder = 'What are you looking for?',
  variant = 'hero',
  showSuggestions = true,
  onSuggestionClick,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleSuggestion = (term: string) => {
    setQuery(term);
    onSearch(term);
    if (onSuggestionClick) {
      onSuggestionClick(term);
    }
  };

  // Mock voice search trigger
  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const voiceTerm = 'AI Tools';
      setQuery(voiceTerm);
      onSearch(voiceTerm);
    }, 1500);
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full pl-10 pr-20 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-subtle"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 shadow-elevated transition-all duration-300 focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-500/15">
          <div className="pl-5 pr-2 text-slate-400 dark:text-slate-500">
            <Search className="w-5 h-5 text-indigo-500" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full py-4 text-base md:text-lg bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-normal"
          />

          <div className="flex items-center pr-3 gap-1.5 shrink-0">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Clear input"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
              }`}
              title={isListening ? 'Listening...' : 'Voice Search'}
              aria-label="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-200 active:scale-95"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {showSuggestions && (
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Try:
          </span>
          {DEFAULT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestion(suggestion)}
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/60 transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

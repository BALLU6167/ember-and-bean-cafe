import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { AIMessage, AIPromptSuggestion } from '../types/ai';
import { aiService, DEFAULT_PROMPT_SUGGESTIONS } from '../services/aiService';
import { Resource } from '../types/resource';

interface AIChatProps {
  contextResource?: Resource;
  onClearContext?: () => void;
  onOpenResource?: (resourceId: string) => void;
  onNotify?: (msg: string) => void;
}

const INITIAL_GREETING: AIMessage = {
  id: 'welcome-msg',
  sender: 'assistant',
  timestamp: new Date().toISOString(),
  content: `### Welcome to INFURIZZ AI

I help you cut through information overload:
- **Simplify**: Break down dense technical, academic, or financial topics.
- **Compare**: Evaluate competing frameworks, tools, or career choices side-by-side.
- **Decide**: Turn endless options into clear, actionable next steps.

Select a quick prompt below or ask any question to get started.`,
  suggestedFollowUps: [
    'Explain the difference between monoliths and microservices',
    'Compare React vs Vue vs Svelte in 2026',
    'Give me the 5 most important points to land a remote job',
    'What should I choose: Java or Python?',
  ],
};

export const AIChat: React.FC<AIChatProps> = ({
  contextResource,
  onClearContext,
  onOpenResource,
  onNotify,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([INITIAL_GREETING]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If contextResource changes, add contextual message
  useEffect(() => {
    if (contextResource) {
      const contextMsg: AIMessage = {
        id: 'ctx-' + Date.now(),
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        content: `I have loaded **"${contextResource.title}"** as your active reading context.\n\nYou can ask me to summarize it in simple words, highlight its key takeaways, or compare it to alternative approaches!`,
        suggestedFollowUps: [
          `Explain "${contextResource.title}" in simple words`,
          'Give me the top 3 actionable points from this resource',
          'What are the common beginner pitfalls mentioned here?',
        ],
      };
      setMessages((prev) => [...prev, contextMsg]);
    }
  }, [contextResource]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    const userMessage: AIMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toISOString(),
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const aiReply = await aiService.ask(query, contextResource?.id);
      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      const errorReply: AIMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        content: 'I encountered an unexpected issue synthesizing your request. Please try asking in a slightly different way.',
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onNotify) onNotify('Response copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
    if (onClearContext) onClearContext();
  };

  return (
    <div className="flex flex-col h-[650px] max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-elevated overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                INFURIZZ AI
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Assistant
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Information Synthesizer & Decision Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {contextResource && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs border border-indigo-200 dark:border-indigo-800 max-w-[200px] truncate">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{contextResource.title}</span>
            </div>
          )}

          <button
            onClick={handleClearChat}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset Chat"
            aria-label="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : 'mr-auto'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`group relative rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/60 shadow-sm'
                }`}
              >
                {/* Content formatting */}
                <div className="prose prose-sm dark:prose-invert max-w-none space-y-2.5">
                  {msg.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-2 mb-1">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={idx} className="text-sm font-semibold text-slate-900 dark:text-white mt-2 mb-1">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote
                          key={idx}
                          className="border-l-2 border-indigo-500 pl-3 italic text-xs text-slate-600 dark:text-slate-300 my-2"
                        >
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    return (
                      <p key={idx} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Copy button on AI responses */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>Synthesized by INFURIZZ AI</span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Follow up suggestions */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-500" />
                      Suggested Follow-ups:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((followUp, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(followUp)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700/80 transition-colors text-left"
                        >
                          {followUp}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading / Typing Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-xl mr-auto">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-1 font-medium">INFURIZZ AI is synthesizing knowledge...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Suggested Prompt Chips */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
          {DEFAULT_PROMPT_SUGGESTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSend(item.prompt)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors shrink-0"
            >
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask INFURIZZ AI to simplify, compare, or summarize anything..."
            disabled={isLoading}
            className="w-full pl-4 pr-12 py-3.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="absolute right-2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white shadow-sm transition-all"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
          Grounded in curated INFURIZZ intelligence. Ready for API expansion.
        </p>
      </div>
    </div>
  );
};

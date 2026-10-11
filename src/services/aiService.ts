import { AIMessage, AIPromptSuggestion } from '../types/ai';
import { MOCK_RESOURCES } from '../data/mockResources';

export const DEFAULT_PROMPT_SUGGESTIONS: AIPromptSuggestion[] = [
  {
    id: 'p1',
    title: 'Explain in simple words',
    prompt: 'Explain the difference between monoliths, microservices, and edge computing in simple words for a beginner.',
    category: 'Simplification',
  },
  {
    id: 'p2',
    title: 'Compare options',
    prompt: 'Compare React vs Vue vs Svelte for a modern startup MVP in 2026. What are the key trade-offs?',
    category: 'Comparison',
  },
  {
    id: 'p3',
    title: 'Important points',
    prompt: 'Give me the 5 most important points to land a high-paying remote software engineering job.',
    category: 'Summary',
  },
  {
    id: 'p4',
    title: 'What should I choose?',
    prompt: 'I am a student deciding between learning Java or Python first. What should I choose based on career goals?',
    category: 'Decision',
  },
  {
    id: 'p5',
    title: 'Summarize information',
    prompt: 'Summarize the core strategy for building a Second Brain (PARA method) and how to apply it in 10 minutes.',
    category: 'Actionable',
  },
];

export const aiService = {
  getPromptSuggestions(): AIPromptSuggestion[] {
    return DEFAULT_PROMPT_SUGGESTIONS;
  },

  async ask(prompt: string, contextResourceId?: string): Promise<AIMessage> {
    // Artificial latency for realistic typing feel (300-600ms)
    await new Promise((resolve) => setTimeout(resolve, 450));

    const lower = prompt.toLowerCase();
    let contextResource = contextResourceId
      ? MOCK_RESOURCES.find((r) => r.id === contextResourceId)
      : undefined;

    // Detect if user mentions a topic or resource
    if (!contextResource) {
      if (lower.includes('java')) {
        contextResource = MOCK_RESOURCES.find((r) => r.id === 'res-tech-02');
      } else if (lower.includes('scholarship') || lower.includes('college')) {
        contextResource = MOCK_RESOURCES.find((r) => r.id === 'res-edu-01');
      } else if (lower.includes('second brain') || lower.includes('para') || lower.includes('note')) {
        contextResource = MOCK_RESOURCES.find((r) => r.id === 'res-prod-01');
      } else if (lower.includes('invest') || lower.includes('index fund') || lower.includes('money')) {
        contextResource = MOCK_RESOURCES.find((r) => r.id === 'res-fin-01');
      } else if (lower.includes('remote') || lower.includes('nomad') || lower.includes('visa')) {
        contextResource = MOCK_RESOURCES.find((r) => r.id === 'res-trv-01');
      } else if (lower.includes('sleep') || lower.includes('health') || lower.includes('ergonomic')) {
        contextResource = MOCK_RESOURCES.find((r) => r.id === 'res-hlth-02');
      } else if (lower.includes('system design') || lower.includes('architecture') || lower.includes('full-stack')) {
        contextResource = MOCK_RESOURCES.find((r) => r.id === 'res-tech-01');
      }
    }

    let responseContent = '';
    let followUps: string[] = [];

    if (contextResource && (lower.includes('explain') || lower.includes('simple'))) {
      responseContent = `### Simplified Explanation: ${contextResource.title}

In simple terms, here is what this is actually about:

Instead of getting bogged down in complex jargon, think of it this way:
${contextResource.shortDescription}

#### The 3 Core Takeaways:
1. **${contextResource.keyTakeaways[0] || 'Clear Foundation'}**: The easiest way to start is by focusing on immediate, measurable results.
2. **${contextResource.keyTakeaways[1] || 'Practical Application'}**: Apply this directly in small iterations rather than trying to master everything at once.
3. **${contextResource.keyTakeaways[2] || 'Long-term Benefit'}**: Once set up, this saves hours of friction every single week.

> **INFURIZZ Verdict**: Best suited for someone wanting practical, high-signal results without unnecessary theory.`;
      followUps = [
        'Give me a step-by-step checklist to start today',
        'What are common beginner mistakes to avoid?',
        `Show me related resources in ${contextResource.category}`
      ];
    } else if (lower.includes('compare') || lower.includes('vs') || lower.includes('difference')) {
      responseContent = `### Comparative Analysis & Decision Matrix

When evaluating these choices, here is how the trade-offs break down:

| Dimension | Option A (Established / Standard) | Option B (Modern / Next-Gen) |
| :--- | :--- | :--- |
| **Learning Curve** | Gentle, extensive documentation | Faster development once mastered |
| **Ecosystem & Jobs**| Massive enterprise demand | High-growth startups, bleeding edge |
| **Velocity** | Reliable, conservative tooling | Instant feedback, zero-config tooling |
| **Best For** | Enterprise, long-term stability | Startups, indie hackers, agile teams |

#### Decision Rule of Thumb:
- **Choose Option A** if you need battle-tested production guarantees, large community support, or established enterprise compliance.
- **Choose Option B** if you value developer velocity, lightweight footprints, or building personal prototypes with modern developer ergonomics.`;
      followUps = [
        'Which one has better job opportunities right now?',
        'How steep is the transition between both options?',
        'Can I combine both approaches?'
      ];
    } else if (lower.includes('choose') || lower.includes('which should i') || lower.includes('what should i')) {
      responseContent = `### Decision Framework: What Should You Choose?

To make the best decision without regret, let us eliminate the guesswork:

1. **If your goal is immediate employment or market stability**:
   Choose the battle-tested, high-demand option. It has 10x more open job listings and an abundance of solved questions on forums.
2. **If your goal is rapid prototyping and modern web ergonomics**:
   Choose the modern lightweight stack. You will build and ship twice as fast with less boilerplate.
3. **If your goal is academic depth & computer science fundamentals**:
   Focus on first principles: data structures, networking, operating system kernels, and distributed systems.

#### Next Action Step:
Pick **one** option for the next 14 days and build a single end-to-end project. In software and skill-building, velocity of iteration matters far more than theoretical perfection.`;
      followUps = [
        'What project should I build in the first 14 days?',
        'Recommend top resources to learn this',
        'How do I benchmark my progress?'
      ];
    } else if (lower.includes('summarize') || lower.includes('points') || lower.includes('important')) {
      responseContent = `### Executive Summary & High-Signal Key Points

Here is the distilled breakdown with all fluff removed:

- **Core Idea**: High leverage comes from systematizing inputs (curation, spaced repetition, time blocking) so outputs require minimal willpower.
- **Critical Principle**: Never rely on memory for storage; use verified, accessible systems (like a digital second brain or index fund automations).
- **Execution Step**: Focus on the 20% of actions that yield 80% of tangible results.
- **Pitfall to Avoid**: Analysis paralysis. Reading about doing something is not the same as shipping it.

> *"Find information. Understand faster. Decide better."* — INFURIZZ Intelligence`;
      followUps = [
        'How do I put this into action step-by-step?',
        'What are the best tools to implement this?',
        'Explain this in even simpler terms'
      ];
    } else {
      // General synthesis
      responseContent = `### Synthesis on "${prompt.trim()}"

Here is a clear, structured breakdown based on curated INFURIZZ knowledge:

#### 1. What You Need to Know
Information in this domain is often scattered across dozens of disconnected sources. When synthesized, the core mechanism is straightforward: focus on verified fundamentals, eliminate vanity metrics, and adopt proven standard practices.

#### 2. Three Actionable Steps
1. **Scope the Requirement**: Clearly define the exact outcome you desire before starting your search.
2. **Source from Primary Evidence**: Rely on verified documentation, peer-reviewed standards, or recognized industry benchmarks rather than unsourced blog opinions.
3. **Apply & Verify**: Build a tiny tangible proof-of-concept to validate the idea immediately.

#### 3. Related Resources in INFURIZZ
Check the **Explore** section for deep-dive guides matching your inquiry.`;
      followUps = [
        'Explain this in simpler terms',
        'Give me the key points in bullet format',
        'Compare the pros and cons'
      ];
    }

    return {
      id: 'ai-msg-' + Date.now(),
      sender: 'assistant',
      timestamp: new Date().toISOString(),
      content: responseContent,
      suggestedFollowUps: followUps,
      referenceResourceIds: contextResource ? [contextResource.id] : undefined,
    };
  }
};

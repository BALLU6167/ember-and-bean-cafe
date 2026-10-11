export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is INFURIZZ and how does it work?',
    answer: 'INFURIZZ is a centralized digital information discovery platform. Instead of searching across hundreds of different blogs, forums, university repositories, and video sites, INFURIZZ aggregates high-signal, verified knowledge into structured cards with key takeaways, verified sources, and AI-powered synthesis.',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'How does INFURIZZ AI help me understand faster?',
    answer: 'INFURIZZ AI can break down dense academic papers, architectural blueprints, or scholarship requirements into plain English, highlight critical action items, compare alternative choices side-by-side, and answer questions grounded directly in the source material.',
    category: 'AI Assistant',
  },
  {
    id: 'faq-3',
    question: 'Are the resources on INFURIZZ verified?',
    answer: 'Yes. Every resource in our catalogue is vetted for source credibility, domain authenticity, freshness, and absence of clickbait or sponsored misinformation.',
    category: 'Quality',
  },
  {
    id: 'faq-4',
    question: 'Can I save resources for offline reading or export them?',
    answer: 'Yes! You can bookmark any resource to your personal "Saved" list with one click. It is saved in your browser and can be exported as a clean Markdown or JSON file anytime.',
    category: 'Features',
  },
  {
    id: 'faq-5',
    question: 'How will INFURIZZ integrate with real backend and LLM APIs?',
    answer: 'INFURIZZ is architected with a decoupled service layer (resourceService, searchService, aiService, recommendationService). Connecting a live production backend, PostgreSQL database, or Google Gemini API key requires changing only the service adapter functions without touching UI components.',
    category: 'Architecture',
  },
];

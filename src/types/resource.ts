export type ResourceCategory =
  | 'Education'
  | 'Technology'
  | 'Career'
  | 'Finance'
  | 'Health & Wellness'
  | 'Travel'
  | 'Productivity'
  | 'AI Tools'
  | 'Opportunities'
  | 'General Knowledge';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  category: ResourceCategory;
  source: {
    name: string;
    url: string;
    domain: string;
    verified: boolean;
  };
  tags: string[];
  keyTakeaways: string[];
  readingTimeMinutes: number;
  popularityScore: number; // 0 to 100
  publishedDate: string;
  featured?: boolean;
  actionUrl?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  cost?: 'Free' | 'Freemium' | 'Paid' | 'Grant / Funded';
}

export type SortOption = 'relevance' | 'popular' | 'latest' | 'alphabetical';

export interface ResourceFilterOptions {
  query?: string;
  category?: ResourceCategory | 'All';
  tag?: string;
  sort?: SortOption;
  cost?: string;
}

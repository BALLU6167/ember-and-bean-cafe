import { MOCK_RESOURCES } from '../data/mockResources';
import { Resource, ResourceFilterOptions } from '../types/resource';

export interface SearchResult {
  resources: Resource[];
  total: number;
  query: string;
  appliedFilters: ResourceFilterOptions;
  suggestedTerms?: string[];
}

export const searchService = {
  search(options: ResourceFilterOptions = {}): SearchResult {
    const {
      query = '',
      category = 'All',
      tag,
      sort = 'relevance',
      cost,
    } = options;

    const cleanQuery = query.trim().toLowerCase();
    const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

    let results = MOCK_RESOURCES.map((res) => {
      let score = 0;
      if (cleanQuery.length === 0) {
        return { res, score: 1 };
      }

      const titleLower = res.title.toLowerCase();
      const descLower = res.shortDescription.toLowerCase();
      const contentLower = res.fullContent.toLowerCase();
      const tagsLower = res.tags.map((t) => t.toLowerCase());
      const catLower = res.category.toLowerCase();
      const sourceLower = res.source.name.toLowerCase();

      // Direct exact match bonuses
      if (titleLower === cleanQuery) score += 50;
      if (titleLower.includes(cleanQuery)) score += 30;
      if (tagsLower.includes(cleanQuery)) score += 25;
      if (catLower === cleanQuery) score += 20;
      if (descLower.includes(cleanQuery)) score += 15;
      if (sourceLower.includes(cleanQuery)) score += 10;
      if (contentLower.includes(cleanQuery)) score += 8;

      // Token-level matching
      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 12;
        if (tagsLower.some((t) => t.includes(token))) score += 10;
        if (catLower.includes(token)) score += 8;
        if (descLower.includes(token)) score += 6;
        if (contentLower.includes(token)) score += 2;
      }

      return { res, score };
    });

    // Filter by match score if query was present
    if (cleanQuery.length > 0) {
      results = results.filter((item) => item.score > 0);
    }

    // Extract resources
    let filtered = results.map((item) => item.res);

    // Filter by category
    if (category && category !== 'All') {
      filtered = filtered.filter((r) => r.category === category);
    }

    // Filter by tag
    if (tag && tag !== 'All') {
      const tagLower = tag.toLowerCase().replace('#', '');
      filtered = filtered.filter((r) =>
        r.tags.some((t) => t.toLowerCase() === tagLower)
      );
    }

    // Filter by cost
    if (cost && cost !== 'All') {
      filtered = filtered.filter((r) => r.cost === cost);
    }

    // Sort results
    if (sort === 'relevance' && cleanQuery.length > 0) {
      filtered.sort((a, b) => {
        const scoreA = results.find((r) => r.res.id === a.id)?.score || 0;
        const scoreB = results.find((r) => r.res.id === b.id)?.score || 0;
        return scoreB - scoreA;
      });
    } else if (sort === 'popular') {
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);
    } else if (sort === 'latest') {
      filtered.sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      );
    } else if (sort === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default to popularity
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);
    }

    // Suggestions if empty
    let suggestedTerms: string[] | undefined = undefined;
    if (filtered.length === 0) {
      suggestedTerms = [
        'Java',
        'Scholarships',
        'AI Tools',
        'WebDev',
        'Career Paths',
        'Productivity',
        'Remote Work',
      ];
    }

    return {
      resources: filtered,
      total: filtered.length,
      query,
      appliedFilters: options,
      suggestedTerms,
    };
  },

  getAllUniqueTags(): string[] {
    const set = new Set<string>();
    MOCK_RESOURCES.forEach((r) => r.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }
};

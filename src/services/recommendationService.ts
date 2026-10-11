import { MOCK_RESOURCES } from '../data/mockResources';
import { Resource } from '../types/resource';

export const recommendationService = {
  getRelated(resourceId: string, limit = 3): Resource[] {
    const target = MOCK_RESOURCES.find((r) => r.id === resourceId);
    if (!target) return MOCK_RESOURCES.slice(0, limit);

    const candidates = MOCK_RESOURCES.filter((r) => r.id !== resourceId);

    const scored = candidates.map((cand) => {
      let score = 0;
      if (cand.category === target.category) score += 4;
      const sharedTags = cand.tags.filter((t) => target.tags.includes(t));
      score += sharedTags.length * 2;
      return { cand, score };
    });

    scored.sort((a, b) => b.score - a.score || b.cand.popularityScore - a.cand.popularityScore);

    return scored.slice(0, limit).map((s) => s.cand);
  },

  getPersonalized(savedIds: string[], viewedIds: string[], limit = 4): Resource[] {
    const interactedIds = new Set([...savedIds, ...viewedIds]);
    const interactedResources = MOCK_RESOURCES.filter((r) => interactedIds.has(r.id));

    // If no interactions yet, return top trending resources
    if (interactedResources.length === 0) {
      return [...MOCK_RESOURCES]
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, limit);
    }

    // Collect preferred categories and tags
    const categoryCounts: Record<string, number> = {};
    const tagCounts: Record<string, number> = {};

    interactedResources.forEach((res) => {
      categoryCounts[res.category] = (categoryCounts[res.category] || 0) + 2;
      res.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Score unviewed resources
    const unviewed = MOCK_RESOURCES.filter((r) => !savedIds.includes(r.id));

    const scored = unviewed.map((cand) => {
      let score = 0;
      if (categoryCounts[cand.category]) {
        score += categoryCounts[cand.category];
      }
      cand.tags.forEach((t) => {
        if (tagCounts[t]) score += tagCounts[t];
      });
      // Factor in popularity slightly
      score += cand.popularityScore * 0.05;
      return { cand, score };
    });

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((s) => s.cand);
  }
};

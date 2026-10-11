import { MOCK_RESOURCES } from '../data/mockResources';
import { Resource, ResourceCategory } from '../types/resource';

export const resourceService = {
  getAll(): Resource[] {
    return [...MOCK_RESOURCES];
  },

  getById(id: string): Resource | undefined {
    return MOCK_RESOURCES.find((res) => res.id === id);
  },

  getBySlug(slug: string): Resource | undefined {
    return MOCK_RESOURCES.find((res) => res.slug === slug);
  },

  getByCategory(category: ResourceCategory | 'All'): Resource[] {
    if (category === 'All') return [...MOCK_RESOURCES];
    return MOCK_RESOURCES.filter((res) => res.category === category);
  },

  getFeatured(limit = 6): Resource[] {
    return MOCK_RESOURCES.filter((res) => res.featured).slice(0, limit);
  },

  getTrending(limit = 4): Resource[] {
    return [...MOCK_RESOURCES]
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit);
  },

  getCategoryCount(category: ResourceCategory): number {
    return MOCK_RESOURCES.filter((res) => res.category === category).length;
  }
};

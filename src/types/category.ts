import { ResourceCategory } from './resource';

export interface CategoryMeta {
  id: ResourceCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  accentBg: string;
  popularTags: string[];
  resourceCount: number;
}

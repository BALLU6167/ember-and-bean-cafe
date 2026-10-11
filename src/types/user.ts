export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  savedResourceIds: string[];
  recentlyViewedIds: string[];
  searchHistory: string[];
  joinedDate: string;
}

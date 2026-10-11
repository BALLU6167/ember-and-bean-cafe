import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'infurizz_recently_viewed';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    return storage.get<string[]>(STORAGE_KEY, ['res-tech-02', 'res-ai-01', 'res-car-01']);
  });

  useEffect(() => {
    storage.set(STORAGE_KEY, recentlyViewed);
  }, [recentlyViewed]);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 10);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, []);

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed,
  };
}

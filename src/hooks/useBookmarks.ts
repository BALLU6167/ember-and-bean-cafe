import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'infurizz_saved_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    return storage.get<string[]>(STORAGE_KEY, ['res-tech-01', 'res-edu-01']);
  });

  useEffect(() => {
    storage.set(STORAGE_KEY, bookmarks);
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks]
  );

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [id, ...prev];
      }
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    clearBookmarks,
    count: bookmarks.length,
  };
}

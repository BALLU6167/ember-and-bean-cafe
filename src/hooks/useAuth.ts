import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types/user';
import { storage } from '../utils/storage';

const AUTH_KEY = 'infurizz_auth_user';

const DEMO_USER: UserProfile = {
  id: 'usr-demo-01',
  name: 'Alex Rivera',
  email: 'alex@infurizz.io',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Product Engineer & Researcher',
  savedResourceIds: ['res-tech-01', 'res-edu-01'],
  recentlyViewedIds: ['res-tech-02', 'res-ai-01'],
  searchHistory: ['Java', 'Scholarships', 'AI Tools'],
  joinedDate: '2026-03-12',
};

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    return storage.get<UserProfile | null>(AUTH_KEY, DEMO_USER);
  });

  useEffect(() => {
    if (user) {
      storage.set(AUTH_KEY, user);
    } else {
      storage.remove(AUTH_KEY);
    }
  }, [user]);

  const login = useCallback((email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || (email.split('@')[0] ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) : 'Explorer'),
      email,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      role: 'Explorer',
      savedResourceIds: [],
      recentlyViewedIds: [],
      searchHistory: [],
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
}

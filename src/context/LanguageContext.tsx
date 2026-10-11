import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LangMode, Translations, translations } from '../utils/translations';

interface LanguageContextType {
  lang: LangMode;
  setLang: (lang: LangMode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LangMode>(() => {
    const saved = localStorage.getItem('ember_bean_lang');
    if (saved === 'hi' || saved === 'te' || saved === 'en') {
      return saved;
    }
    return 'en';
  });

  const applyGoogleTranslate = (targetLang: LangMode) => {
    try {
      const host = window.location.hostname;
      // Set google translate cookie for both root and domain
      document.cookie = `googtrans=/en/${targetLang}; path=/;`;
      if (host && host !== 'localhost') {
        document.cookie = `googtrans=/en/${targetLang}; path=/; domain=.${host};`;
      }

      document.documentElement.lang = targetLang;

      // Trigger google translate dropdown if present
      const triggerDropdown = () => {
        const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (combo) {
          if (combo.value !== targetLang) {
            combo.value = targetLang;
            combo.dispatchEvent(new Event('change'));
          }
          return true;
        }
        return false;
      };

      if (!triggerDropdown()) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (triggerDropdown() || attempts > 20) {
            clearInterval(interval);
          }
        }, 150);
      }
    } catch (e) {
      console.warn('Google translate synchronization notice:', e);
    }
  };

  const setLang = (newLang: LangMode) => {
    setLangState(newLang);
    localStorage.setItem('ember_bean_lang', newLang);
    applyGoogleTranslate(newLang);
  };

  useEffect(() => {
    applyGoogleTranslate(lang);
  }, [lang]);

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { LANGUAGES, DEFAULT_LANGUAGE } from "./languages";
import { TRANSLATIONS } from "./translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "dyslexia_quest_lang";

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // LocalStorage access may fail in restricted environments
    }
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = useCallback((langCode) => {
    if (LANGUAGES.some((l) => l.code === langCode)) {
      setCurrentLanguage(langCode);
      try {
        localStorage.setItem(STORAGE_KEY, langCode);
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  // Update HTML lang attribute on change
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Translation helper function
  const t = useCallback(
    (key, fallback = "") => {
      const activeDict = TRANSLATIONS[currentLanguage];
      if (activeDict && activeDict[key] !== undefined) {
        return activeDict[key];
      }
      const fallbackDict = TRANSLATIONS[DEFAULT_LANGUAGE];
      if (fallbackDict && fallbackDict[key] !== undefined) {
        return fallbackDict[key];
      }
      return fallback || key;
    },
    [currentLanguage]
  );

  const activeLanguageMeta = useMemo(() => {
    return (
      LANGUAGES.find((l) => l.code === currentLanguage) ||
      LANGUAGES.find((l) => l.code === DEFAULT_LANGUAGE)
    );
  }, [currentLanguage]);

  const value = useMemo(
    () => ({
      currentLanguage,
      setLanguage,
      t,
      languages: LANGUAGES,
      activeLanguageMeta
    }),
    [currentLanguage, setLanguage, t, activeLanguageMeta]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return safe fallback if used outside of Provider
    return {
      currentLanguage: DEFAULT_LANGUAGE,
      setLanguage: () => {},
      t: (key, fallback) => TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || fallback || key,
      languages: LANGUAGES,
      activeLanguageMeta: LANGUAGES[0]
    };
  }
  return context;
}

export const useTranslation = useLanguage;
export default LanguageContext;

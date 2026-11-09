'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getLabel, type Locale } from '@/lib/i18n';

type LanguageContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('buildspace-locale');
    if (saved === 'en' || saved === 'hi') setLocaleState(saved);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem('buildspace-locale', next);
    document.documentElement.lang = next === 'hi' ? 'hi' : 'en';
  };

  const value = useMemo(() => ({ locale, setLocale, t: (key: string) => getLabel(locale, key) }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

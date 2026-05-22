'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Lang = 'en' | 'ko';

const Ctx = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'en',
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('eel-lang') as Lang | null;
    if (saved === 'ko') setLang('ko');
  }, []);

  const toggle = () =>
    setLang((prev) => {
      const next = prev === 'en' ? 'ko' : 'en';
      localStorage.setItem('eel-lang', next);
      return next;
    });

  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);

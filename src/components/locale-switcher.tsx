'use client';

import { locales } from '@/lib/i18n';
import { useLanguage } from './language-provider';

export function LocaleSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div><div className="text-xs uppercase tracking-[0.2em] text-brass">{t('language')}</div><div className="mt-1 text-sm text-slate-300">English / हिन्दी</div></div>
        <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
          {locales.map((option) => <button key={option} type="button" onClick={() => setLocale(option)} aria-pressed={locale === option} className={`rounded-full px-3 py-1.5 text-sm transition ${locale === option ? 'bg-brass text-slate-950' : 'text-slate-200'}`}>{option === 'en' ? 'EN' : 'HI'}</button>)}
        </div>
      </div>
    </div>
  );
}

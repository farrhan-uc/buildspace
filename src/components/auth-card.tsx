'use client';

import { useLanguage } from './language-provider';

export function AuthCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  const { t } = useLanguage();
  const titleMap: Record<string, string> = { 'Welcome back': 'login', 'Create your account': 'createAccount', 'Reset your password': 'resetPassword' };
  const subtitleMap: Record<string, string> = { 'Sign in to continue your estimate.': 'loginSubtitle' };
  return (
    <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-ink-800/80 p-7 shadow-soft backdrop-blur-xl sm:p-8">
      <div className="mb-7 text-center">
        <a href="/" aria-label="BuildSpace home" className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brass-light to-brass-dark font-serif text-xl font-semibold text-ink shadow-glow">B</a>
        <h1 className="text-3xl font-semibold text-paper">{titleMap[title] ? t(titleMap[title]) : title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-300">{subtitleMap[subtitle] ? t(subtitleMap[subtitle]) : subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

'use client';

export function AuthCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-ink-800/80 p-7 shadow-soft backdrop-blur-xl sm:p-8">
      <div className="mb-7 text-center">
        <a href="/" aria-label="BuildSpace home" className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brass-light to-brass-dark font-serif text-xl font-semibold text-ink shadow-glow">B</a>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-300">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

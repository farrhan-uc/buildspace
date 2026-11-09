'use client';

export function AuthCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brass/15 text-lg font-semibold text-brass">B</div>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-300">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

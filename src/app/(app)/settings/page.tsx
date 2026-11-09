import { LocaleSwitcher } from '@/components/locale-switcher';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-4xl font-semibold text-white">Settings</h1>
      <div className="mt-8 space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-brass">Profile</div>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-200">
              Name
              <input aria-label="Name" defaultValue="Demo User" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white" />
            </label>
            <label className="block text-sm text-slate-200">
              Default region
              <input aria-label="Default region" defaultValue="Kota, Rajasthan" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white" />
            </label>
          </div>
        </div>

        <LocaleSwitcher />

        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-brass">Rate preferences</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-300">
            This build ships with mock default cost inputs and a clear point for live Supabase-backed rate overrides.
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-brass">Accessibility and UX</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
              High contrast surfaces and readable tap targets are preserved across the app shell.
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
              Forms use accessible labels and the app shell exposes quick navigation to key project pages.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

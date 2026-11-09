'use client';

import { useEffect, useState } from 'react';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Kota, Rajasthan');
  const [saved, setSaved] = useState(false);
  useEffect(() => { void (async () => { const { data } = await supabase.auth.getUser(); if (!data.user) return; const { data: profile } = await supabase.from('profiles').select('name, city').eq('id', data.user.id).maybeSingle(); setName(profile?.name ?? data.user.user_metadata?.name ?? ''); setCity(profile?.city ?? 'Kota, Rajasthan'); })(); }, []);
  const saveProfile = async () => { const { data: { user } } = await supabase.auth.getUser(); if (!user) return; await supabase.from('profiles').upsert({ id: user.id, name: name.trim().slice(0, 120), city: city.trim().slice(0, 120) }); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-4xl font-semibold text-white">Settings</h1>
      <div className="mt-8 space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-brass">Profile</div>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-200">
              Name
              <input aria-label="Name" value={name}
              onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white" />
            </label>
            <label className="block text-sm text-slate-200">
              Default region
              <input aria-label="Default region" value={city}
              onChange={(event) => setCity(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white" />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={saveProfile} className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-slate-950">Save profile</button>
          {saved ? <span role="status" className="text-sm text-emerald-300">Saved</span> : null}
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

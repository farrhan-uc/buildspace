'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthCard } from '@/components/auth-card';
import { authErrorMessage, supabase, type AuthRole } from '@/lib/supabase';

const roles: AuthRole[] = ['Homeowner', 'Contractor', 'Builder', 'Engineer', 'Supplier'];
export default function SignupPage() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [role, setRole] = useState<AuthRole>('Homeowner');
  const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null); const [sent, setSent] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setError(null);
    const { data, error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`, data: { name: name.trim(), role } } });
    setLoading(false);
    if (signUpError) { setError(authErrorMessage(signUpError.message, 'signup')); return; }
    if (data.session) window.location.href = '/dashboard'; else setSent(true);
  };
  if (sent) return <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#13233d_0%,#0b1220_35%,#090f18_100%)] px-4 py-12"><AuthCard title="Check your email" subtitle="We sent a confirmation link. Confirm your email, then sign in."><Link href="/login" className="block w-full rounded-xl bg-brass px-4 py-3 text-center font-medium text-slate-950">Back to sign in</Link></AuthCard></main>;
  return <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#13233d_0%,#0b1220_35%,#090f18_100%)] px-4 py-12"><AuthCard title="Create your account" subtitle="Save estimates and collaborate with confidence."><form onSubmit={handleSubmit} className="space-y-4"><label className="block text-sm text-slate-200">Name<input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass" placeholder="Your name" /></label><label className="block text-sm text-slate-200">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass" placeholder="name@example.com" /></label><label className="block text-sm text-slate-200">I am a<select value={role} onChange={(e) => setRole(e.target.value as AuthRole)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass">{roles.map((item) => <option key={item}>{item}</option>)}</select></label><label className="block text-sm text-slate-200">Password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass" placeholder="At least 8 characters" /></label>{error ? <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}<button disabled={loading} className="w-full rounded-xl bg-brass px-4 py-3 font-medium text-slate-950 disabled:opacity-60">{loading ? 'Creating account…' : 'Create account'}</button></form><p className="mt-5 text-center text-sm text-slate-300">Already registered? <Link href="/login" className="text-brass hover:underline">Sign in</Link></p></AuthCard></main>;
}

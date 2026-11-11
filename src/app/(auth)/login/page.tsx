'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthCard } from '@/components/auth-card';
import { authErrorMessage, supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (signInError) { setError(authErrorMessage(signInError.message)); return; }
    router.replace('/dashboard'); router.refresh();
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fffaf1_0%,#f7f1e6_55%,#e9deca_100%)] px-4 py-12">
      <AuthCard title="Welcome back" subtitle="Sign in to continue your estimate.">
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block text-sm text-slate-200">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none focus:border-brass" placeholder="name@example.com" /></label>
          <label className="block text-sm text-slate-200">Password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none focus:border-brass" placeholder="Your password" /></label>
          {error ? <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-brass px-4 py-3 font-medium text-slate-950 disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <div className="mt-5 flex items-center justify-between text-sm text-slate-300"><Link href="/forgot-password" className="hover:text-paper">Forgot password?</Link></div>
        <div className="mt-5 border-t border-white/10 pt-4 text-center text-sm text-slate-300">New here? <Link href="/signup" className="font-medium text-brass hover:underline">Create account</Link></div>
      </AuthCard>
    </main>
  );
}

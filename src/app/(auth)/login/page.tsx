'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthCard } from '@/components/auth-card';
import { mockAuth } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@buildspace.app');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await mockAuth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError(signInError.message || 'Unable to sign in.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#13233d_0%,#0b1220_35%,#090f18_100%)] px-4 py-12">
      <AuthCard title="Welcome back" subtitle="Sign in to continue your estimate.">
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block text-sm text-slate-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-brass"
              placeholder="name@example.com"
            />
          </label>
          <label className="block text-sm text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brass"
              placeholder="••••••••"
            />
          </label>

          {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-brass px-4 py-3 font-medium text-slate-950 disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
          <button type="button" onClick={async () => { await mockAuth.signInWithOAuth('google'); router.push('/dashboard'); }} className="text-brass underline-offset-4 hover:underline">Google sign in</button>
          <Link href="/forgot-password" className="text-slate-300 hover:text-white">Forgot password?</Link>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4 text-center text-sm text-slate-300">
          New here?{' '}
          <Link href="/signup" className="font-medium text-brass hover:underline">
            Create account
          </Link>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-3 text-xs text-slate-300">
          Privacy note: We only use your email to manage project access and estimates. No precise location is stored without consent.
        </div>
      </AuthCard>
    </main>
  );
}

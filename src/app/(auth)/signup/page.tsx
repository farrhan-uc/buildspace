'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthCard } from '@/components/auth-card';
import { mockAuth } from '@/lib/supabase';

const roles = ['Homeowner', 'Contractor', 'Builder', 'Engineer', 'Supplier'] as const;

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@buildspace.app');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<(typeof roles)[number]>('Homeowner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signUpError } = await mockAuth.signUpWithPassword({
      email,
      password,
      options: { data: { full_name: name, role } },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message || 'Could not create account.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#13233d_0%,#0b1220_35%,#090f18_100%)] px-4 py-12">
      <AuthCard title="Create account" subtitle="Set up your free BuildSpace profile.">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm text-slate-200">
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass"
            />
          </label>

          <label className="block text-sm text-slate-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass"
            />
          </label>

          <label className="block text-sm text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass"
            />
          </label>

          <div className="text-sm text-slate-200">
            <div className="mb-2">I am a:</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {roles.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`rounded-xl border px-3 py-2 text-left ${role === item ? 'border-brass bg-brass/10 text-white' : 'border-white/10 bg-slate-950/40 text-slate-300'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div> : null}

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-brass px-4 py-3 font-medium text-slate-950 disabled:opacity-60">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-slate-300">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-brass hover:underline">Log in</Link>
        </div>
      </AuthCard>
    </main>
  );
}

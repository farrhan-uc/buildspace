'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthCard } from '@/components/auth-card';
import { supabase } from '@/lib/supabase';
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(''); const [sent, setSent] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setLoading(true); setError(null); const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` }); setLoading(false); if (resetError) setError('Unable to send reset email. Please try again.'); else setSent(true); };
  return <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fffaf1_0%,#f7f1e6_55%,#e9deca_100%)] px-4 py-12"><AuthCard title="Reset your password" subtitle={sent ? 'Check your inbox for the reset link.' : 'We will email you a secure reset link.'}>{sent ? <Link href="/login" className="block w-full rounded-xl bg-brass px-4 py-3 text-center font-medium text-slate-950">Back to sign in</Link> : <form onSubmit={submit} className="space-y-4"><label className="block text-sm text-slate-200">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none focus:border-brass" placeholder="name@example.com" /></label>{error ? <div role="alert" className="text-sm text-red-200">{error}</div> : null}<button disabled={loading} className="w-full rounded-xl bg-brass px-4 py-3 font-medium text-slate-950 disabled:opacity-60">{loading ? 'Sending…' : 'Send reset link'}</button><Link href="/login" className="block text-center text-sm text-slate-300 hover:text-paper">Back to sign in</Link></form>}</AuthCard></main>;
}

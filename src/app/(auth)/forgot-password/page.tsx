import Link from 'next/link';
import { AuthCard } from '@/components/auth-card';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#13233d_0%,#0b1220_35%,#090f18_100%)] px-4 py-12">
      <AuthCard title="Reset password" subtitle="We’ll send a reset link to your inbox.">
        <form className="space-y-4">
          <label className="block text-sm text-slate-200">
            Email
            <input
              type="email"
              placeholder="name@example.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-white outline-none focus:border-brass"
            />
          </label>
          <button type="submit" className="w-full rounded-xl bg-brass px-4 py-3 font-medium text-slate-950">
            Send reset link
          </button>
        </form>
        <div className="mt-5 text-center text-sm text-slate-300">
          <Link href="/login" className="font-medium text-brass hover:underline">Back to login</Link>
        </div>
      </AuthCard>
    </main>
  );
}

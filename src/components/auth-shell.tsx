'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { currentUser, mockAuth } from '@/lib/supabase';

const publicRoutes = ['/login', '/signup', '/forgot-password', '/'];

export function AuthShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith('/'));
    if (isPublic && pathname !== '/dashboard') {
      setReady(true);
      return;
    }

    const user = currentUser();
    if (!user) {
      router.replace('/login');
      return;
    }

    setReady(true);
  }, [pathname, router]);

  useEffect(() => {
    if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
      const user = currentUser();
      if (user) {
        router.replace('/dashboard');
      }
    }
  }, [pathname, router]);

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">Checking access…</div>;
  }

  if (pathname === '/' || pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <a href="#app-main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brass focus:px-4 focus:py-2 focus:text-slate-950">Skip to content</a>
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="font-semibold tracking-[0.24em] text-brass uppercase">BuildSpace</Link>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/visualizer">Visualizer</Link>
            <Link href="/suppliers">Suppliers</Link>
            <Link href="/reports">Reports</Link>
            <Link href="/settings">Settings</Link>
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1.5"
              onClick={async () => {
                await mockAuth.signOut();
                router.push('/login');
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main id="app-main">{children}</main>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, FileBarChart, LayoutDashboard, LogOut, Settings, Store } from 'lucide-react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { Logo } from '@/components/landing/logo';
import { useLanguage } from '@/components/language-provider';
const appLinks = [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }, { href: '/visualizer', label: 'Visualizer', icon: Box }, { href: '/suppliers', label: 'Suppliers', icon: Store }, { href: '/reports', label: 'Reports', icon: FileBarChart }, { href: '/settings', label: 'Settings', icon: Settings }] as const;
const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/auth/callback'];
export function AuthShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);   const pathname = usePathname(); const router = useRouter();
  const { t } = useLanguage();
  useEffect(() => { let active = true; getCurrentUser().then((user) => { if (!active) return; const isPublic = publicRoutes.includes(pathname); if (!user && !isPublic) router.replace('/login'); else if (user && ['/login', '/signup'].includes(pathname)) router.replace('/dashboard'); else setReady(true); }); return () => { active = false; }; }, [pathname, router]);
  if (!ready) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">Checking access…</div>;
  if (publicRoutes.includes(pathname)) return <>{children}</>;
  return <div className="min-h-screen bg-ink text-slate-100"><a href="#app-main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brass focus:px-4 focus:py-2 focus:text-slate-950">Skip to content</a><header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"><Link href="/dashboard" aria-label="BuildSpace dashboard" className="shrink-0"><Logo /></Link><nav aria-label="App" className="-mx-1 flex min-w-0 items-center gap-1 overflow-x-auto px-1 text-sm">{appLinks.map(({ href, label, icon: Icon }) => { const active = pathname === href || pathname.startsWith(`${href}/`); return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 ${active ? 'bg-brass/15 text-brass-light' : 'text-muted hover:bg-white/5 hover:text-paper'}`}><Icon className="h-4 w-4" aria-hidden="true" /><span className="hidden lg:inline">{t(label.toLowerCase())}</span><span className="sr-only lg:hidden">{label}</span></Link>; })}<button type="button" className="ml-2 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-muted" onClick={async () => { await supabase.auth.signOut(); router.replace('/login'); router.refresh(); }}><LogOut className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Sign out</span><span className="sr-only sm:hidden">Sign out</span></button></nav></div></header><main id="app-main">{children}</main></div>;
}

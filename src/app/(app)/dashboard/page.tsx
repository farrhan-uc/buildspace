import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: projects } = user
    ? await supabase.from('projects').select('id, name, inputs, total_cost, updated_at').eq('user_id', user.id).order('updated_at', { ascending: false }).limit(6)
    : { data: [] };
  const savedProjects = projects ?? [];
  const totalCost = savedProjects.reduce((sum, project) => sum + Number(project.total_cost ?? 0), 0);
  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Builder';
  const formatMoney = (value: number) => value ? `₹${(value / 100000).toFixed(1)}L` : '—';

  return <div className="mx-auto max-w-7xl px-6 py-10">
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><div className="text-xs uppercase tracking-[0.3em] text-brass">Dashboard</div><h1 className="mt-3 text-4xl font-semibold text-paper">Welcome back, {displayName}</h1></div><Link href="/projects/new" className="rounded-full bg-brass px-5 py-3 font-medium text-slate-950 transition hover:brightness-110">+ New project</Link></div>
    <div className="mb-8 rounded-[28px] border border-brass/25 bg-brass/10 p-6"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><div className="text-xs uppercase tracking-[0.2em] text-brass">Your workspace</div><div className="mt-2 text-3xl font-semibold text-paper">{savedProjects.length} saved {savedProjects.length === 1 ? 'estimate' : 'estimates'}</div></div><Link href="/projects/new" className="rounded-full border border-brass/30 bg-slate-950/40 px-5 py-3 text-sm font-medium text-paper transition hover:border-brass/60">Start a fresh estimate</Link></div></div>
    <div className="grid gap-4 md:grid-cols-3">{[['Saved projects', String(savedProjects.length)], ['Projected total', formatMoney(totalCost)], ['Supplier matches', '—']].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-soft"><div className="text-sm text-slate-400">{label}</div><div className="mt-3 text-3xl font-semibold text-paper">{value}</div></div>)}</div>
    <div className="mt-10"><div className="mb-4 flex items-center justify-between"><div className="text-lg font-medium text-paper">Recent projects</div><Link href="/projects/new" className="text-sm text-brass">New project</Link></div>{savedProjects.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{savedProjects.map((project) => <div key={project.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft transition hover:border-brass/30"><div className="text-xl font-semibold text-paper">{project.name}</div><div className="mt-2 text-sm text-slate-400">{Number((project.inputs as { area?: number } | null)?.area ?? 0).toLocaleString()} sq ft</div><div className="mt-5 text-3xl font-semibold text-brass">{formatMoney(Number(project.total_cost ?? 0))}</div><div className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">Last edited · {new Date(project.updated_at).toLocaleDateString()}</div></div>)}</div> : <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-400">No estimates yet. Create your first project to see it here.</div>}</div>
  </div>;
}

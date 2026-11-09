import Link from 'next/link';
import { currentUser } from '@/lib/supabase';

const projects = [
  { name: 'Kota Family House', area: '1,200 sq ft', total: '₹14.8L', updated: '2 days ago', health: 'on track' },
  { name: 'Villa Extension', area: '2,400 sq ft', total: '₹28.4L', updated: '1 week ago', health: 'reviewing' },
  { name: 'Annexe Studio', area: '680 sq ft', total: '₹8.2L', updated: '3 weeks ago', health: 'saved' },
];

export default function DashboardPage() {
  const user = currentUser();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-brass">Dashboard</div>
          <h1 className="mt-3 text-4xl font-semibold text-white">Welcome back, {user?.name || 'Builder'}</h1>
        </div>
        <Link href="/projects/new" className="rounded-full bg-brass px-5 py-3 font-medium text-slate-950 transition hover:brightness-110">
          + New project
        </Link>
      </div>

      <div className="mb-8 rounded-[28px] border border-brass/25 bg-brass/10 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brass">This week</div>
            <div className="mt-2 text-3xl font-semibold text-white">3 active estimates, 2 supplier shortlists</div>
          </div>
          <Link href="/projects/new" className="rounded-full border border-brass/30 bg-slate-950/40 px-5 py-3 text-sm font-medium text-white transition hover:border-brass/60">
            Start a fresh estimate
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Saved projects', '3'],
          ['Avg. cost / sq ft', '₹1,840'],
          ['Supplier matches', '24'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-soft">
            <div className="text-sm text-slate-400">{label}</div>
            <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-lg font-medium text-white">Recent projects</div>
            <Link href="/projects/new" className="text-sm text-brass">View all</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div key={project.name} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft transition hover:border-brass/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xl font-semibold text-white">{project.name}</div>
                  <span className="rounded-full border border-brass/20 bg-brass/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-brass">{project.health}</span>
                </div>
                <div className="mt-2 text-sm text-slate-400">{project.area}</div>
                <div className="mt-5 text-3xl font-semibold text-brass">{project.total}</div>
                <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                  <span>Last edited</span>
                  <span>{project.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Next actions</div>
            <div className="mt-4 space-y-3">
              {[
                'Complete RCC estimate for family home',
                'Review supplier shortlist and contact rates',
                'Share estimate with owner before Friday',
              ].map((task) => (
                <div key={task} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-200">
                  {task}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Performance</div>
            <div className="mt-4 text-4xl font-semibold text-white">₹8.4L</div>
            <div className="mt-2 text-sm text-slate-300">Projected cost this quarter</div>
            <div className="mt-5 h-2.5 rounded-full bg-slate-800">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-brass to-amber-300" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

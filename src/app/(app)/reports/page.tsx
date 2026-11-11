'use client';

import { useMemo } from 'react';
import { useProjectStore } from '@/lib/project-store';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const downloadCsv = (filename: string, rows: Record<string, string | number>[]) => {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((key) => `"${String(row[key]).replace(/\"/g, '""')}"`)
        .join(','),
    ),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export default function ReportsPage() {
  const { estimate, project } = useProjectStore();

  const topStages = useMemo(
    () => [...estimate.stages].sort((a, b) => b.subtotal - a.subtotal).slice(0, 5),
    [estimate.stages],
  );

  const exportRows = useMemo(
    () =>
      estimate.stages.map((stage) => ({
        stage: stage.name,
        subtotal: stage.subtotal,
        percent: stage.percentOfProject,
        range_min: stage.range.min,
        range_expected: stage.range.expected,
        range_max: stage.range.max,
      })),
    [estimate.stages],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-brass">Reports</div>
          <h1 className="mt-3 text-4xl font-semibold text-paper">Estimate summary and exports</h1>
        </div>

        <button
          type="button"
          onClick={() => downloadCsv('buildspace-estimate.csv', exportRows)}
          className="rounded-full bg-brass px-5 py-3 font-medium text-slate-950"
        >
          Export CSV
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Project</div>
                <div className="mt-2 text-3xl font-semibold text-paper">{project.projectName}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Total</div>
                <div className="text-3xl font-semibold text-brass">{formatCurrency(estimate.projectTotal)}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ['Built-up area', `${project.builtUpAreaSqFt.toLocaleString()} sq ft`],
                ['Per sq ft', formatCurrency(estimate.perSqFt)],
                ['Projection', `${project.region ?? project.city} / ${project.city}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
                  <div className="mt-2 text-lg font-medium text-paper">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
            <div className="mb-5 text-xl font-semibold text-paper">Cost drivers</div>
            <div className="space-y-4">
              {topStages.map((stage) => (
                <div key={stage.stageKey} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-base font-medium text-paper">{stage.name}</div>
                    <div className="text-base font-semibold text-brass">{formatCurrency(stage.subtotal)}</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brass to-amber-300"
                      style={{ width: `${Math.min(stage.percentOfProject, 100)}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-400">Range: {formatCurrency(stage.range.min)} – {formatCurrency(stage.range.max)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Modifiers</div>
            <div className="mt-5 space-y-3">
              {Object.entries(estimate.modifiers).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  <span className="capitalize text-slate-300">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium text-paper">{typeof value === 'string' ? value : `${value}%`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Export package</div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="font-medium text-paper">CSV summary</div>
                <div className="mt-1">Stage totals, ranges, and cost contribution.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="font-medium text-paper">PDF-ready report</div>
                <div className="mt-1">Prepared for a contractor or owner handoff view.</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

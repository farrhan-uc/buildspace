import { HouseVisualizer } from '@/components/house-visualizer';

export default function VisualizerPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-brass">Stage visualizer</div>
        <h1 className="mt-3 text-4xl font-semibold text-paper">3D project preview</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <HouseVisualizer />

        <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Current build</div>
          <div className="text-3xl font-semibold text-paper">G+0 Family Home</div>
          <div className="text-slate-300">
            A premium 1,000 sq ft reference model for Kota with staged understructure, framing, finishes, and supplier context.
          </div>

          <div className="space-y-3 pt-3">
            {[
              ['Site prep', 'Excavation, layout and soil checks'],
              ['Structure', 'RCC frame and slab sequencing'],
              ['Finishing', 'Plaster, paint and fixtures'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="text-sm font-medium text-paper">{title}</div>
                <div className="mt-1 text-sm text-slate-300">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

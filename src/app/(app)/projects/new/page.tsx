'use client';

import { useState } from 'react';
import { useProjectStore } from '@/lib/project-store';
import { supabase } from '@/lib/supabase';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const buildingTypeLabels = {
  residential_house: 'Residential house',
  duplex: 'Duplex',
  villa: 'Villa',
  commercial_shop_cum_house: 'Commercial shop-cum-house',
};

const structureTypeLabels = {
  rcc: 'RCC',
  load_bearing: 'Load bearing',
};

const materialDefaults: Record<string, number> = {
  cement_opc: 460,
  steel_tmt: 92,
  sand_river: 82,
  aggregate_20mm: 62,
  brick_red: 10,
  tile_ceramic: 55,
  paint_interior: 210,
};

const materialOverrides = [
  { key: 'cement_opc', label: 'Cement OPC' },
  { key: 'steel_tmt', label: 'Steel TMT' },
  { key: 'sand_river', label: 'River sand' },
  { key: 'aggregate_20mm', label: '20 mm aggregate' },
  { key: 'brick_red', label: 'Brick / block' },
  { key: 'tile_ceramic', label: 'Ceramic tile' },
  { key: 'paint_interior', label: 'Interior paint' },
];

export default function NewProjectPage() {
  const { project, modifiers, overrides, estimate, setField, setModifier, setOverride, resetDefault } = useProjectStore();
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const saveProject = async () => {
    if (!project.projectName.trim() || project.builtUpAreaSqFt <= 0) { setSaveMessage('Add a project name and built-up area greater than zero.'); return; }
    setSaving(true); setSaveMessage(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaveMessage('Your session expired. Please sign in again.'); setSaving(false); return; }
    const { error } = await supabase.from('projects').upsert({ user_id: user.id, name: project.projectName.trim().slice(0, 120), inputs: project, modifiers: modifiers, total_cost: estimate.projectTotal, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    setSaving(false); setSaveMessage(error ? 'Could not save this estimate. Please try again.' : 'Estimate saved to your workspace.');
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-brass">New project</div>
          <h1 className="mt-3 text-4xl font-semibold text-paper">Project wizard</h1>
        </div>
        <div className="flex items-center gap-3">
          {saveMessage ? <span role="status" className="text-sm text-slate-300">{saveMessage}</span> : null}
          <button type="button" onClick={saveProject} disabled={saving} className="rounded-full bg-brass px-4 py-2 text-sm font-medium text-slate-950 disabled:opacity-60">{saving ? 'Saving…' : 'Save estimate'}</button>
          <button
          type="button"
          onClick={resetDefault}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-brass/40 hover:text-paper"
        >
          Reset to sample
        </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-soft">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm text-slate-200 md:col-span-2">
              Project name
              <input
                value={project.projectName}
                onChange={(event) => setField('projectName', event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              City
              <input
                value={project.city}
                onChange={(event) => setField('city', event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Region
              <input
                value={project.region ?? 'Kota'}
                onChange={(event) => setField('region', event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Building type
              <select
                value={project.buildingType}
                onChange={(event) => setField('buildingType', event.target.value as typeof project.buildingType)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              >
                {Object.entries(buildingTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-200">
              Structure type
              <select
                value={project.structureType}
                onChange={(event) => setField('structureType', event.target.value as typeof project.structureType)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              >
                {Object.entries(structureTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-200">
              Plot area (sq ft)
              <input
                type="number"
                min={0}
                value={project.plotAreaSqFt}
                onChange={(event) => setField('plotAreaSqFt', Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Built-up area (sq ft)
              <input
                type="number"
                min={0}
                value={project.builtUpAreaSqFt}
                onChange={(event) => setField('builtUpAreaSqFt', Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Floors
              <input
                type="number"
                min={1}
                value={project.floors}
                onChange={(event) => setField('floors', Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Floor height (ft)
              <input
                type="number"
                min={0}
                value={project.floorHeight}
                onChange={(event) => setField('floorHeight', Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Bedrooms
              <input
                type="number"
                min={0}
                value={project.bedroomCount}
                onChange={(event) => setField('bedroomCount', Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Bathrooms
              <input
                type="number"
                min={0}
                value={project.bathroomCount}
                onChange={(event) => setField('bathroomCount', Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Kitchen count
              <input
                type="number"
                min={0}
                value={project.kitchenCount}
                onChange={(event) => setField('kitchenCount', Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Quality tier
              <select
                value={project.qualityTier}
                onChange={(event) => setField('qualityTier', event.target.value as typeof project.qualityTier)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              >
                <option value="Economy">Economy</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Luxury</option>
              </select>
            </label>

            <label className="block text-sm text-slate-200 md:col-span-2">
              Labour model
              <select
                value={project.labourModel}
                onChange={(event) => setField('labourModel', event.target.value as typeof project.labourModel)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
              >
                <option value="labour_only">Labour only</option>
                <option value="material_labour">Material + labour</option>
                <option value="owner_material">Owner supplied materials</option>
              </select>
            </label>
          </div>
        </div>

        <aside className="rounded-[28px] border border-brass/20 bg-brass/10 p-6 shadow-soft">
          <div className="text-xs uppercase tracking-[0.24em] text-brass">Live estimate</div>
          <div className="mt-4 text-4xl font-semibold text-paper">{formatCurrency(estimate.projectTotal)}</div>
          <div className="mt-2 text-sm text-slate-200">Cost per sq ft: {formatCurrency(estimate.perSqFt)}</div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>Project range</span>
              <span>{formatCurrency(estimate.totalBeforeModifiers)}</span>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-slate-900/80">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-brass to-amber-300" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Cost drivers</div>
            {estimate.stages.slice(0, 4).map((stage) => (
              <div key={stage.stageKey} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
                <span className="text-sm text-slate-200">{stage.name}</span>
                <span className="text-sm font-medium text-brass">{formatCurrency(stage.subtotal)}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <section className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-paper">Stage estimate</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{estimate.stages.length} stages</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {estimate.stages.map((stage) => (
              <div key={stage.stageKey} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-paper">{stage.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{stage.percentOfProject}%</div>
                  </div>
                  <div className="text-right text-base font-semibold text-brass">{formatCurrency(stage.subtotal)}</div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-brass to-amber-300" style={{ width: `${Math.min(stage.percentOfProject, 100)}%` }} />
                </div>
                <div className="mt-3 text-xs text-slate-400">Range: {formatCurrency(stage.range.min)} – {formatCurrency(stage.range.max)}</div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold text-paper">BOM snapshot</h2>
          <div className="mt-5 grid gap-3">
            {Object.entries(estimate.bom).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-sm text-slate-300">
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (letter) => letter.toUpperCase())}
                </span>
                <span className="font-medium text-paper">{value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-paper">Editable rate overrides</h2>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{modifiers.rateVolatility}</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {materialOverrides.map(({ key, label }) => (
            <label key={key} className="block rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
              {label}
              <input
                type="number"
                min={0}
                value={overrides[key] ?? materialDefaults[key] ?? 0}
                onChange={(event) => setOverride(key, Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-paper outline-none transition focus:border-brass/60"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="block text-sm text-slate-200">
            GST %
            <input
              type="number"
              value={modifiers.gstPercent}
              onChange={(event) => setModifier('gstPercent', Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
            />
          </label>
          <label className="block text-sm text-slate-200">
            Contractor profit %
            <input
              type="number"
              value={modifiers.contractorProfitPercent}
              onChange={(event) => setModifier('contractorProfitPercent', Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
            />
          </label>
          <label className="block text-sm text-slate-200">
            Contingency %
            <input
              type="number"
              value={modifiers.contingencyPercent}
              onChange={(event) => setModifier('contingencyPercent', Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-paper outline-none transition focus:border-brass/60"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

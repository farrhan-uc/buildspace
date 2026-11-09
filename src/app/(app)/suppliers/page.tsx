'use client';

import { useEffect, useMemo, useState } from 'react';
import { supplierCategories, type Supplier } from '@/lib/suppliers';

export default function SupplierPage() {
  const [category, setCategory] = useState('all');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [location, setLocation] = useState({ lat: 25.1828, lng: 75.8525 });
  const [latency, setLatency] = useState('Mock-safe fallback');
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`/api/suppliers?category=${category}`);
        const payload = await response.json();
        setSuppliers(payload.suppliers ?? []);
        setLatency(payload.source === 'mock-safe-fallback' ? 'Live lookup unavailable — using mock-safe fallback' : 'Live lookup connected');
      } catch {
        setSuppliers([]);
        setLatency('Service unavailable — showing fallback shortlist');
      }
    };

    fetchSuppliers();
  }, [category]);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => setLocation({ lat: 25.1828, lng: 75.8525 }),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, []);

  const activeSuppliers = useMemo(() => suppliers.length > 0 ? suppliers : [], [suppliers]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-brass">Supplier discovery</div>
          <h1 className="mt-3 text-4xl font-semibold text-white">Nearby material partners</h1>
        </div>
        <button
          type="button"
          onClick={() => {
            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                  setLatency('Using your current GPS location');
                },
                () => setLatency('Location blocked — using Kota fallback'),
              );
            }
          }}
          className="rounded-full bg-brass px-5 py-3 font-medium text-slate-950"
        >
          Use my location
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {supplierCategories.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              category === key ? 'bg-brass text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200 hover:border-brass/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.5fr]">
        <aside className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Current city</div>
              <div className="mt-1 text-xl font-semibold text-white">Kota</div>
            </div>
            <div className="rounded-full border border-brass/30 bg-brass/10 px-2 py-1 text-xs text-brass">{latency}</div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-3">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.2),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(15,23,42,0.85))]">
              {activeSuppliers.map((supplier, index) => {
                const x = ((supplier.coordinates.lng - 75.8) * 1800) + 120;
                const y = ((25.2 - supplier.coordinates.lat) * 1800) + 80 + index * 8;

                return (
                  <div
                    key={supplier.id}
                    className="absolute flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-brass text-[8px] font-bold text-slate-950 shadow-lg"
                    style={{ left: `${Math.max(8, Math.min(92, x))}%`, top: `${Math.max(8, Math.min(92, y))}%` }}
                    title={supplier.name}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <div className="font-medium text-white">Nearby search context</div>
            <div className="mt-2">Radius: 15 km • Match score: strong for core materials • Live map fallback ready</div>
          </div>
        </aside>

        <section className="space-y-4">
          {activeSuppliers.length > 0 ? (
            activeSuppliers.map((supplier) => (
              <article key={supplier.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-soft">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-white">{supplier.name}</h2>
                      {supplier.verified && <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">Verified</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                      <span>{supplier.category}</span>
                      <span>•</span>
                      <span>{supplier.distanceKm} km away</span>
                      <span>•</span>
                      <span>{supplier.etaMinutes} min</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-slate-300">Rating</div>
                    <div className="text-lg font-semibold text-brass">{supplier.rating.toFixed(1)} / 5</div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Price band</div>
                    <div className="mt-2 text-sm text-white">{supplier.priceBand}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Contact</div>
                    <div className="mt-2 text-sm text-white">{supplier.phone}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Address</div>
                    <div className="mt-2 text-sm text-white">{supplier.address}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {supplier.serviceTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{tag}</span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${supplier.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${supplier.phone.replace(/\s+/g, '')}`}
                    className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100"
                  >
                    Call supplier
                  </a>
                  <button
                    type="button"
                    onClick={() => setSaved((current) => ({ ...current, [supplier.id]: !current[supplier.id] }))}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      saved[supplier.id] ? 'bg-brass text-slate-950' : 'border border-white/10 bg-white/5 text-slate-200'
                    }`}
                  >
                    {saved[supplier.id] ? 'Saved' : 'Save supplier'}
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
              No nearby suppliers available for this filter. Try another category or pick the Kota fallback set.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

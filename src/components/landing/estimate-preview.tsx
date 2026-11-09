import Image from 'next/image';
import { TrendingDown } from 'lucide-react';

const breakdown = [
  { label: 'Structure & slab', amount: '₹4,45,000', pct: 30 },
  { label: 'Masonry & plaster', amount: '₹2,37,000', pct: 16 },
  { label: 'Finishing & tiling', amount: '₹2,22,000', pct: 15 },
];

export function EstimatePreview() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-soft">
        <Image
          src="/images/hero-house.png"
          alt="Modern two-storey family home in Rajasthan at dusk"
          width={1024}
          height={1024}
          priority
          className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/10 bg-ink-800/85 p-5 backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Kota family home · G+1</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-paper">₹14,82,450</p>
            <p className="mt-0.5 text-xs text-muted">1,200 sq ft · ₹1,235 / sq ft</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
            <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
            8% under budget
          </span>
        </div>

        <ul className="mt-5 space-y-3">
          {breakdown.map((item) => (
            <li key={item.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">{item.label}</span>
                <span className="font-mono text-paper">{item.amount}</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brass-dark to-brass-light"
                  style={{ width: `${item.pct * 3}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

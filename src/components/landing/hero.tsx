import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { EstimatePreview } from './estimate-preview';
import { stats } from './content';

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-xs font-medium text-brass-light">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Free for every builder
          </span>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] text-paper sm:text-6xl lg:text-7xl">
            Build with certainty,{' '}
            <span className="italic text-brass">not guesswork.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            The house-cost estimator for Indian homeowners, builders and contractors. Every stage from excavation to
            finishing — with local rates and nearby suppliers built in.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition hover:bg-brass-light"
            >
              Create free estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a
              href="#workflow"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-white/30 hover:bg-white/5"
            >
              See how it works
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs leading-snug text-muted">{stat.label}</dt>
                <dd className="mt-1 font-serif text-2xl font-semibold text-paper">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <EstimatePreview />
      </div>
    </section>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './logo';

export function ClosingCta() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-brass/25 bg-gradient-to-br from-ink-700 to-ink-800 px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-blueprint bg-[size:32px_32px]" aria-hidden="true" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-paper sm:text-5xl">
            Know the real cost <span className="italic text-brass">before</span> the first brick.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">Create your first stage-wise estimate in minutes. Free, forever.</p>
          <Link
            href="/signup"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink shadow-glow transition hover:bg-brass-light"
          >
            Start your estimate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <Logo />
        <p>{`© ${new Date().getFullYear()} BuildSpace · Made for builders in Rajasthan`}</p>
      </div>
    </footer>
  );
}

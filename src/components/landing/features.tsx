import { highlights } from './content';
import { SectionHeading } from './section-heading';

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why builders choose it" title="Premium clarity, without the spreadsheet." />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {highlights.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800 p-7 transition duration-300 ease-brand hover:-translate-y-1 hover:border-brass/30"
            >
              <div className="pointer-events-none absolute inset-0 bg-blueprint bg-[size:28px_28px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brass/25 bg-brass/10 text-brass">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-paper">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

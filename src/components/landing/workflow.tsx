import { steps } from './content';
import { SectionHeading } from './section-heading';

export function Workflow() {
  return (
    <section id="workflow" className="scroll-mt-20 border-t border-white/5 bg-ink-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="How it works" title="From plot size to priced plan in three steps." />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-ink-950 p-8">
              <span className="font-serif text-5xl font-semibold italic text-brass/80">0{index + 1}</span>
              <h3 className="mt-6 text-xl font-semibold text-paper">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

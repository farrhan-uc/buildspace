import { Plus } from 'lucide-react';
import { faqs } from './content';
import { SectionHeading } from './section-heading';

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Everything you need to know." />

        <div className="mt-12 divide-y divide-white/10 rounded-3xl border border-white/10 bg-ink-800/60">
          {faqs.map((faq) => (
            <details key={faq.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-paper">
                {faq.q}
                <Plus className="h-4 w-4 shrink-0 text-brass transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { stages } from './content';
import { SectionHeading } from './section-heading';

export function Stages() {
  return (
    <section id="stages" className="scroll-mt-20 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Footing to finishing"
          title="Thirteen stages. Every rupee accounted for."
          description="BuildSpace breaks your house into the same stages your contractor works in, so budgets line up with how the site actually moves."
        />

        <ol className="grid gap-2 sm:grid-cols-2">
          {stages.map((stage, index) => (
            <li
              key={stage.name}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/60 px-4 py-3"
            >
              <span className="font-mono text-xs text-brass">{String(index + 1).padStart(2, '0')}</span>
              <span className="flex-1 text-sm text-paper">{stage.name}</span>
              <span className="font-mono text-xs text-muted">{stage.share}%</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
